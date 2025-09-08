'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface VerticalVideoInteractionsProps {
  lawyerId: string;
  videoUrl: string;
  className?: string;
}

interface VideoStats {
  likeCount: number;
  commentCount: number;
  userLiked: boolean;
}

export default function VerticalVideoInteractions({ 
  lawyerId, 
  videoUrl, 
  className = '' 
}: VerticalVideoInteractionsProps) {
  const { user } = useAuth();
  const [stats, setStats] = useState<VideoStats>({ likeCount: 0, commentCount: 0, userLiked: false });
  const [loading, setLoading] = useState(false);

  // Load video stats on component mount
  useEffect(() => {
    loadVideoStats();
  }, [lawyerId, videoUrl]);

  const loadVideoStats = async () => {
    try {
      if (!user) return;
      const statsData = await apiClient.getVideoStats(lawyerId, videoUrl);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading video stats:', error);
      // Set default stats on error
      setStats({ likeCount: 0, commentCount: 0, userLiked: false });
    }
  };

  const handleToggleLike = async () => {
    try {
      if (!user) {
        alert('Please log in to like videos');
        return;
      }

      setLoading(true);
      const response = await apiClient.toggleVideoLike(lawyerId, videoUrl);
      setStats(prev => ({
        ...prev,
        likeCount: response.likeCount,
        userLiked: response.liked
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
      // You could show a toast notification here instead
    } finally {
      setLoading(false);
    }
  };

  const handleComment = () => {
    // For now, just show an alert - you could implement a modal here
    if (!user) {
      alert('Please log in to comment');
      return;
    }
    alert('Comments feature will open in a modal (to be implemented)');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Legal Video',
        text: 'Check out this legal content',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  if (!user) {
    return (
      <div className={`flex flex-col gap-3 ${className}`}>
        <div className="flex flex-col items-center gap-1 text-white/60">
          <div className="p-2 bg-black/60 backdrop-blur-sm rounded-full">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-xs">0</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/60">
          <div className="p-2 bg-black/60 backdrop-blur-sm rounded-full">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-xs">0</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white/60">
          <div className="p-2 bg-black/60 backdrop-blur-sm rounded-full">
            <Share className="w-5 h-5" />
          </div>
          <span className="text-xs">Share</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Like Button */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={handleToggleLike}
          disabled={loading}
          className={`p-2 bg-black/60 backdrop-blur-sm rounded-full border border-white/20 shadow-lg transition-all hover:scale-110 active:scale-95 ${
            stats.userLiked 
              ? 'text-red-500 border-red-500/50' 
              : 'text-white hover:bg-black/80'
          } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Heart className={`w-5 h-5 ${stats.userLiked ? 'fill-current' : ''}`} />
        </button>
        <span className="text-xs text-white font-medium">
          {formatCount(stats.likeCount)}
        </span>
      </div>

      {/* Comment Button */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={handleComment}
          className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <span className="text-xs text-white font-medium">
          {formatCount(stats.commentCount)}
        </span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center gap-1">
        <button
          onClick={handleShare}
          className="p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-all hover:scale-110 active:scale-95 border border-white/20 shadow-lg"
        >
          <Share className="w-5 h-5" />
        </button>
        <span className="text-xs text-white font-medium">Share</span>
      </div>
    </div>
  );
}
