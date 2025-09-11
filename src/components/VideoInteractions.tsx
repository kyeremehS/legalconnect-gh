'use client';

import React, { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

interface VideoInteractionsProps {
  lawyerId: string;
  videoId: string;
  className?: string;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
}

interface VideoStats {
  likeCount: number;
  commentCount: number;
  userLiked: boolean;
}

export default function VideoInteractions({ lawyerId, videoId, className = '' }: VideoInteractionsProps) {
  const { user } = useAuth();
  const [stats, setStats] = useState<VideoStats>({ likeCount: 0, commentCount: 0, userLiked: false });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load video stats on component mount
  useEffect(() => {
    loadVideoStats();
  }, [lawyerId, videoId]);

  // Load comments when comments section is opened
  useEffect(() => {
    if (showComments) {
      loadComments();
    }
  }, [showComments, currentPage]);

  const loadVideoStats = async () => {
    try {
      if (!user) return;
      const statsData = await apiClient.getVideoStats(videoId);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading video stats:', error);
      // Set default stats on error
      setStats({ likeCount: 0, commentCount: 0, userLiked: false });
    }
  };

  const loadComments = async () => {
    try {
      setLoading(true);
      if (!user) return;
      
      const response = await apiClient.getVideoComments(videoId, currentPage, 10);
      setComments(response.comments || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Error loading comments:', error);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async () => {
    try {
      if (!user) {
        alert('Please log in to like videos');
        return;
      }

      const response = await apiClient.toggleVideoLike(lawyerId, videoId);
      setStats(prev => ({
        ...prev,
        likeCount: response.likeCount,
        userLiked: response.liked
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to toggle like. Please try again.');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    try {
      if (!user) {
        alert('Please log in to comment');
        return;
      }

      setSubmitting(true);
      const comment = await apiClient.addVideoComment(lawyerId, videoId, newComment.trim());
      
      // Add the new comment to the list
      setComments(prev => [comment, ...prev]);
      setStats(prev => ({ ...prev, commentCount: prev.commentCount + 1 }));
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      if (!user) return;
      
      await apiClient.deleteVideoComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      setStats(prev => ({ ...prev, commentCount: prev.commentCount - 1 }));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className={`text-center p-4 text-gray-500 ${className}`}>
        <p>Please log in to interact with videos</p>
      </div>
    );
  }

  return (
    <div className={`video-interactions ${className}`}>
      {/* Like and Comment Buttons */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleToggleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            stats.userLiked 
              ? 'bg-red-100 text-red-600 border border-red-200' 
              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <svg 
            className="w-5 h-5" 
            fill={stats.userLiked ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
          <span>{stats.likeCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
          <span>{stats.commentCount} Comments</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t pt-4">
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <p className="text-gray-500 mt-2">Loading comments...</p>
              </div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.userName}</span>
                        <span className="text-gray-500 text-sm">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                    {comment.userId === user.id && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
