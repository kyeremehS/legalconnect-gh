"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Phone, Video, Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Settings } from 'lucide-react';

interface VideoCallProps {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  callType: 'voice' | 'video';
  onToggleMute: () => Promise<boolean>;
  onToggleVideo: () => Promise<boolean>;
  onEndCall: () => Promise<void>;
  onSwitchCamera?: () => Promise<void>;
  isMuted: boolean;
  isVideoOff: boolean;
  callerName: string;
  receiverName: string;
  isInitiator: boolean;
}

export default function VideoCall({
  localStream,
  remoteStream,
  callType,
  onToggleMute,
  onToggleVideo,
  onEndCall,
  onSwitchCamera,
  isMuted,
  isVideoOff,
  callerName,
  receiverName,
  isInitiator,
}: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
      setIsConnecting(false);
      setConnectionStatus('Connected');
    }
  }, [remoteStream]);

  const handleToggleMute = async () => {
    await onToggleMute();
  };

  const handleToggleVideo = async () => {
    await onToggleVideo();
  };

  const handleEndCall = async () => {
    await onEndCall();
  };

  const handleSwitchCamera = async () => {
    if (onSwitchCamera) {
      await onSwitchCamera();
    }
  };

  const otherPersonName = isInitiator ? receiverName : callerName;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-gray-900 rounded-lg overflow-hidden">
        {/* Video Streams */}
        <div className="relative w-full h-full">
          {/* Remote Video (Main) */}
          {callType === 'video' ? (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              muted={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
              <div className="text-center text-white">
                <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl font-bold">{otherPersonName.charAt(0)}</span>
                </div>
                <h2 className="text-2xl font-semibold mb-2">{otherPersonName}</h2>
                <p className="text-lg opacity-80">Voice Call</p>
              </div>
            </div>
          )}

          {/* Local Video (Picture-in-Picture) */}
          {callType === 'video' && localStream && (
            <div className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted={true}
                className="w-full h-full object-cover"
              />
              {isVideoOff && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {callerName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Connection Status */}
          {isConnecting && (
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                {connectionStatus}
              </div>
            </div>
          )}

          {/* Call Info */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
            <div className="text-center">
              <h3 className="font-semibold">{otherPersonName}</h3>
              <p className="text-sm opacity-80">
                {callType === 'video' ? 'Video Call' : 'Voice Call'}
              </p>
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4 bg-black bg-opacity-50 rounded-full px-6 py-3">
            {/* Mute Button */}
            <button
              onClick={handleToggleMute}
              className={`p-3 rounded-full transition-colors ${
                isMuted
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Video Toggle Button (only for video calls) */}
            {callType === 'video' && (
              <button
                onClick={handleToggleVideo}
                className={`p-3 rounded-full transition-colors ${
                  isVideoOff
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
                title={isVideoOff ? 'Turn on video' : 'Turn off video'}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <VideoIcon className="w-6 h-6" />}
              </button>
            )}

            {/* Switch Camera Button (only for video calls) */}
            {callType === 'video' && onSwitchCamera && (
              <button
                onClick={handleSwitchCamera}
                className="p-3 rounded-full bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-colors"
                title="Switch camera"
              >
                <Settings className="w-6 h-6" />
              </button>
            )}

            {/* End Call Button */}
            <button
              onClick={handleEndCall}
              className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              title="End call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Call Duration (if needed) */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
          {/* You can add call duration here */}
        </div>
      </div>
    </div>
  );
} 