"use client";

import React, { useState } from 'react';
import { X, Search, User } from 'lucide-react';
import { createChat } from '../lib/messaging';

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  currentUserName: string;
  onChatCreated: (chatId: string) => void;
}

// Mock data - replace with actual user/lawyer data from your system
const mockLawyers = [
  { id: 'lawyer1', name: 'Jane Doe', specialization: 'Corporate Law', avatar: 'JD' },
  { id: 'lawyer2', name: 'Kwame Mensah', specialization: 'Criminal Law', avatar: 'KM' },
  { id: 'lawyer3', name: 'Sarah Johnson', specialization: 'Family Law', avatar: 'SJ' },
  { id: 'lawyer4', name: 'Michael Chen', specialization: 'Real Estate Law', avatar: 'MC' },
];

const mockUsers = [
  { id: 'user1', name: 'John Smith', avatar: 'JS' },
  { id: 'user2', name: 'Alice Brown', avatar: 'AB' },
  { id: 'user3', name: 'Robert Wilson', avatar: 'RW' },
  { id: 'user4', name: 'Emily Davis', avatar: 'ED' },
];

export default function CreateChatModal({
  isOpen,
  onClose,
  currentUserId,
  currentUserName,
  onChatCreated,
}: CreateChatModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'lawyers' | 'users'>('lawyers');
  const [isCreating, setIsCreating] = useState(false);

  const filteredLawyers = mockLawyers.filter(lawyer =>
    lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lawyer.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    user.id !== currentUserId
  );

  const handleCreateChat = async (participantId: string, participantName: string) => {
    try {
      setIsCreating(true);
      
      const participants = [currentUserId, participantId];
      const participantNames = {
        [currentUserId]: currentUserName,
        [participantId]: participantName,
      };

      const chatId = await createChat(participants, participantNames);
      onChatCreated(chatId);
      onClose();
    } catch (error) {
      console.error('Error creating chat:', error);
      alert('Failed to create chat. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#1A237E]">
            Start New Conversation
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search and Type Selection */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative mb-4">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F9A825]"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedType('lawyers')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                selectedType === 'lawyers'
                  ? 'bg-[#F9A825] text-[#1A237E]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Lawyers
            </button>
            <button
              onClick={() => setSelectedType('users')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                selectedType === 'users'
                  ? 'bg-[#F9A825] text-[#1A237E]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Users
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {selectedType === 'lawyers' ? (
            <div className="p-4 space-y-3">
              {filteredLawyers.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No lawyers found</p>
                </div>
              ) : (
                filteredLawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleCreateChat(lawyer.id, lawyer.name)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F9A825] flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {lawyer.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#1A237E]">{lawyer.name}</h3>
                      <p className="text-sm text-gray-600">{lawyer.specialization}</p>
                    </div>
                    <button
                      className="px-3 py-1 bg-[#F9A825] text-[#1A237E] rounded-full text-sm font-medium hover:bg-[#F9A825]/90 transition-colors"
                      disabled={isCreating}
                    >
                      {isCreating ? 'Creating...' : 'Start Chat'}
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredUsers.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No users found</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    onClick={() => handleCreateChat(user.id, user.name)}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1A237E] flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#1A237E]">{user.name}</h3>
                      <p className="text-sm text-gray-600">User</p>
                    </div>
                    <button
                      className="px-3 py-1 bg-[#F9A825] text-[#1A237E] rounded-full text-sm font-medium hover:bg-[#F9A825]/90 transition-colors"
                      disabled={isCreating}
                    >
                      {isCreating ? 'Creating...' : 'Start Chat'}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 