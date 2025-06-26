from sqlalchemy import Column, String, DateTime, Boolean, Text, ForeignKey, JSON, Enum, Integer
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class MessageType(str, enum.Enum):
    TEXT = "text"
    IMAGE = "image"
    FILE = "file"
    VOICE = "voice"
    VIDEO = "video"
    SYSTEM = "system"

class Chat(Base):
    __tablename__ = "chats"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    
    # Participants
    participants = Column(JSON, nullable=False)  # List of user IDs
    participant_names = Column(JSON, nullable=False)  # Dict of user_id: name
    
    # Chat info
    chat_type = Column(String(20), default="direct")  # "direct", "group"
    title = Column(String(200), nullable=True)  # For group chats
    description = Column(Text, nullable=True)  # For group chats
    
    # Last message info
    last_message_id = Column(String(255), nullable=True)
    last_message_content = Column(Text, nullable=True)
    last_message_sender_id = Column(String(255), nullable=True)
    last_message_timestamp = Column(DateTime(timezone=True), nullable=True)
    
    # Unread counts
    unread_counts = Column(JSON, default=dict)  # Dict of user_id: count
    
    # Settings
    is_active = Column(Boolean, default=True)
    is_archived = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Chat(id={self.id}, participants={self.participants})>"

class Message(Base):
    __tablename__ = "messages"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    chat_id = Column(String(255), ForeignKey("chats.id"), nullable=False)
    sender_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    
    # Message content
    content = Column(Text, nullable=False)
    message_type = Column(Enum(MessageType), default=MessageType.TEXT)
    
    # File info (for file/image/voice/video messages)
    file_url = Column(String(500), nullable=True)
    file_name = Column(String(200), nullable=True)
    file_size = Column(Integer, nullable=True)  # Size in bytes
    file_duration = Column(Integer, nullable=True)  # Duration in seconds for audio/video
    
    # Message status
    is_read = Column(Boolean, default=False)
    is_edited = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    edited_at = Column(DateTime(timezone=True), nullable=True)
    
    # Reactions
    reactions = Column(JSON, default=dict)  # Dict of user_id: reaction_type
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    chat = relationship("Chat", back_populates="messages")
    sender = relationship("User")
    
    def __repr__(self):
        return f"<Message(id={self.id}, chat_id={self.chat_id}, sender={self.sender_id})>"
    
    @property
    def is_file_message(self):
        return self.message_type in [MessageType.IMAGE, MessageType.FILE, MessageType.VOICE, MessageType.VIDEO]
    
    @property
    def file_extension(self):
        if not self.file_name:
            return None
        return self.file_name.split('.')[-1] if '.' in self.file_name else None 