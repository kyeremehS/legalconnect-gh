from sqlalchemy import Column, String, DateTime, Boolean, Text, Integer, Float, ForeignKey, JSON,Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class VideoStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    PRIVATE = "private"
    ARCHIVED = "archived"
    FLAGGED = "flagged"

class VideoCategory(str, enum.Enum):
    CORPORATE_LAW = "corporate_law"
    CRIMINAL_LAW = "criminal_law"
    FAMILY_LAW = "family_law"
    REAL_ESTATE = "real_estate"
    INTELLECTUAL_PROPERTY = "intellectual_property"
    TAX_LAW = "tax_law"
    LABOR_LAW = "labor_law"
    IMMIGRATION = "immigration"
    PERSONAL_INJURY = "personal_injury"
    BANKRUPTCY = "bankruptcy"
    ENVIRONMENTAL = "environmental"
    HEALTHCARE = "healthcare"
    GENERAL_LEGAL = "general_legal"
    TIPS_AND_ADVICE = "tips_and_advice"

class Video(Base):
    __tablename__ = "videos"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    creator_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    
    # Video content
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(Enum(VideoCategory), nullable=False)
    tags = Column(JSON, default=list)  # List of tags
    
    # Media files
    video_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500), nullable=True)
    video_duration = Column(Integer, nullable=True)  # Duration in seconds
    video_size = Column(Integer, nullable=True)  # Size in bytes
    video_format = Column(String(20), nullable=True)
    resolution = Column(String(20), nullable=True)  # e.g., "1920x1080"
    
    # Content details
    legal_topic = Column(String(200), nullable=True)
    target_audience = Column(String(100), nullable=True)  # "general", "lawyers", "clients"
    difficulty_level = Column(String(20), default="beginner")  # "beginner", "intermediate", "advanced"
    
    # Engagement metrics
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    shares = Column(Integer, default=0)
    comments_count = Column(Integer, default=0)
    bookmarks = Column(Integer, default=0)
    
    # Status and moderation
    status = Column(Enum(VideoStatus), default=VideoStatus.DRAFT)
    is_featured = Column(Boolean, default=False)
    is_verified = Column(Boolean, default=False)
    moderation_status = Column(String(20), default="pending")  # "pending", "approved", "rejected"
    moderation_notes = Column(Text, nullable=True)
    
    # Privacy and settings
    is_public = Column(Boolean, default=True)
    allow_comments = Column(Boolean, default=True)
    allow_sharing = Column(Boolean, default=True)
    allow_download = Column(Boolean, default=False)
    
    # SEO and discovery
    seo_title = Column(String(200), nullable=True)
    seo_description = Column(Text, nullable=True)
    seo_keywords = Column(JSON, default=list)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    published_at = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    creator = relationship("User", back_populates="videos")
    comments = relationship("VideoComment", back_populates="video", cascade="all, delete-orphan")
    likes_rel = relationship("VideoLike", back_populates="video", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Video(id={self.id}, title={self.title}, creator={self.creator_id})>"
    
    @property
    def engagement_rate(self):
        if self.views == 0:
            return 0.0
        return ((self.likes + self.shares + self.comments_count) / self.views) * 100
    
    @property
    def is_published(self):
        return self.status == VideoStatus.PUBLISHED
    
    @property
    def duration_formatted(self):
        if not self.video_duration:
            return "Unknown"
        minutes = self.video_duration // 60
        seconds = self.video_duration % 60
        return f"{minutes}:{seconds:02d}"

class VideoComment(Base):
    __tablename__ = "video_comments"
    
    id = Column(String(255), primary_key=True, index=True)
    video_id = Column(String(255), ForeignKey("videos.id"), nullable=False)
    user_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    parent_comment_id = Column(String(255), ForeignKey("video_comments.id"), nullable=True)
    
    content = Column(Text, nullable=False)
    likes = Column(Integer, default=0)
    is_edited = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    video = relationship("Video", back_populates="comments")
    user = relationship("User")
    parent_comment = relationship("VideoComment", remote_side=[id])
    replies = relationship("VideoComment", back_populates="parent_comment")

class VideoLike(Base):
    __tablename__ = "video_likes"
    
    id = Column(String(255), primary_key=True, index=True)
    video_id = Column(String(255), ForeignKey("videos.id"), nullable=False)
    user_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    video = relationship("Video", back_populates="likes_rel")
    user = relationship("User")
    
    __table_args__ = (
        # Ensure a user can only like a video once
        # This would be handled at the application level for better control
    ) 