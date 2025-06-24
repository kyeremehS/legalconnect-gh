import { sendSignalingData, listenForSignalingData, SignalingData } from './messaging';

export interface WebRTCCall {
  id: string;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  peerConnection: RTCPeerConnection | null;
  isInitiator: boolean;
  callType: 'voice' | 'video';
  onRemoteStream?: (stream: MediaStream) => void;
  onCallEnded?: () => void;
}

class WebRTCService {
  private calls: Map<string, WebRTCCall> = new Map();
  private signalingUnsubscribers: Map<string, () => void> = new Map();

  private readonly rtcConfiguration: RTCConfiguration = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
    ],
  };

  async startCall(
    callId: string,
    userId: string,
    remoteUserId: string,
    callType: 'voice' | 'video',
    isInitiator: boolean,
    onRemoteStream?: (stream: MediaStream) => void,
    onCallEnded?: () => void
  ): Promise<MediaStream> {
    try {
      // Get user media
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: callType === 'video' ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        } : false,
      };

      const localStream = await navigator.mediaDevices.getUserMedia(constraints);

      // Create peer connection
      const peerConnection = new RTCPeerConnection(this.rtcConfiguration);

      // Add local stream to peer connection
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
      });

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        const remoteStream = event.streams[0];
        const call = this.calls.get(callId);
        if (call) {
          call.remoteStream = remoteStream;
          if (onRemoteStream) {
            onRemoteStream(remoteStream);
          }
        }
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignalingData(userId, remoteUserId, 'ice-candidate', {
            candidate: event.candidate,
            callId,
          });
        }
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        if (peerConnection.connectionState === 'failed' || 
            peerConnection.connectionState === 'disconnected' ||
            peerConnection.connectionState === 'closed') {
          this.endCall(callId);
        }
      };

      // Store call information
      const call: WebRTCCall = {
        id: callId,
        localStream,
        remoteStream: null,
        peerConnection,
        isInitiator,
        callType,
        onRemoteStream,
        onCallEnded,
      };

      this.calls.set(callId, call);

      // Listen for signaling data
      const unsubscribe = listenForSignalingData(userId, (signalingData) => {
        this.handleSignalingData(signalingData, callId);
      });

      this.signalingUnsubscribers.set(callId, unsubscribe);

      // If initiator, create and send offer
      if (isInitiator) {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        await sendSignalingData(userId, remoteUserId, 'offer', {
          offer,
          callId,
        });
      }

      return localStream;
    } catch (error) {
      console.error('Error starting call:', error);
      throw error;
    }
  }

  private async handleSignalingData(signalingData: SignalingData, callId: string): Promise<void> {
    const call = this.calls.get(callId);
    if (!call || !call.peerConnection) return;

    try {
      switch (signalingData.type) {
        case 'offer':
          await call.peerConnection.setRemoteDescription(signalingData.data.offer);
          const answer = await call.peerConnection.createAnswer();
          await call.peerConnection.setLocalDescription(answer);
          
          await sendSignalingData(call.isInitiator ? call.id.split('-')[0] : call.id.split('-')[1], 
                                 signalingData.from, 'answer', {
            answer,
            callId,
          });
          break;

        case 'answer':
          await call.peerConnection.setRemoteDescription(signalingData.data.answer);
          break;

        case 'ice-candidate':
          if (signalingData.data.candidate) {
            await call.peerConnection.addIceCandidate(signalingData.data.candidate);
          }
          break;

        case 'call-end':
          this.endCall(callId);
          break;
      }
    } catch (error) {
      console.error('Error handling signaling data:', error);
    }
  }

  async answerCall(callId: string, userId: string, remoteUserId: string): Promise<MediaStream> {
    const call = this.calls.get(callId);
    if (!call) {
      throw new Error('Call not found');
    }

    try {
      // Get user media if not already obtained
      if (!call.localStream) {
        const constraints: MediaStreamConstraints = {
          audio: true,
          video: call.callType === 'video' ? {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          } : false,
        };

        call.localStream = await navigator.mediaDevices.getUserMedia(constraints);
        
        // Add local stream to peer connection
        call.localStream.getTracks().forEach(track => {
          call.peerConnection?.addTrack(track, call.localStream!);
        });
      }

      return call.localStream;
    } catch (error) {
      console.error('Error answering call:', error);
      throw error;
    }
  }

  async endCall(callId: string): Promise<void> {
    const call = this.calls.get(callId);
    if (!call) return;

    try {
      // Stop all tracks
      if (call.localStream) {
        call.localStream.getTracks().forEach(track => track.stop());
      }

      if (call.remoteStream) {
        call.remoteStream.getTracks().forEach(track => track.stop());
      }

      // Close peer connection
      if (call.peerConnection) {
        call.peerConnection.close();
      }

      // Unsubscribe from signaling
      const unsubscribe = this.signalingUnsubscribers.get(callId);
      if (unsubscribe) {
        unsubscribe();
        this.signalingUnsubscribers.delete(callId);
      }

      // Call onCallEnded callback
      if (call.onCallEnded) {
        call.onCallEnded();
      }

      // Remove call from map
      this.calls.delete(callId);
    } catch (error) {
      console.error('Error ending call:', error);
    }
  }

  async toggleMute(callId: string): Promise<boolean> {
    const call = this.calls.get(callId);
    if (!call || !call.localStream) return false;

    const audioTrack = call.localStream.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      return !audioTrack.enabled; // Return true if muted
    }
    return false;
  }

  async toggleVideo(callId: string): Promise<boolean> {
    const call = this.calls.get(callId);
    if (!call || !call.localStream) return false;

    const videoTrack = call.localStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      return !videoTrack.enabled; // Return true if video disabled
    }
    return false;
  }

  async switchCamera(callId: string): Promise<void> {
    const call = this.calls.get(callId);
    if (!call || !call.localStream) return;

    const videoTrack = call.localStream.getVideoTracks()[0];
    if (!videoTrack) return;

    try {
      // Stop current video track
      videoTrack.stop();

      // Get new video stream with different camera
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      const newVideoTrack = newStream.getVideoTracks()[0];

      // Replace video track in local stream
      const sender = call.peerConnection?.getSenders().find(s => 
        s.track?.kind === 'video'
      );
      
      if (sender) {
        await sender.replaceTrack(newVideoTrack);
      }

      // Update local stream
      const audioTrack = call.localStream.getAudioTracks()[0];
      call.localStream = new MediaStream([newVideoTrack, audioTrack]);
    } catch (error) {
      console.error('Error switching camera:', error);
    }
  }

  getCall(callId: string): WebRTCCall | undefined {
    return this.calls.get(callId);
  }

  getAllCalls(): WebRTCCall[] {
    return Array.from(this.calls.values());
  }

  isInCall(callId: string): boolean {
    return this.calls.has(callId);
  }
}

// Export singleton instance
export const webRTCService = new WebRTCService();
export default webRTCService; 