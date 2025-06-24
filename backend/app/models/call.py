from sqlalchemy import Column, String, DateTime, Boolean, Text, ForeignKey, Integer, Float, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class CallType(str, enum.Enum):
    VOICE = "voice"
    VIDEO = "video"

class CallStatus(str, enum.Enum):
    INCOMING = "incoming"
    ONGOING = "ongoing"
    ENDED = "ended"
    MISSED = "missed"
    DECLINED = "declined"
    BUSY = "busy"
    FAILED = "failed"

class Call(Base):
    __tablename__ = "calls"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    
    # Call participants
    caller_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    receiver_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    chat_id = Column(String(255), ForeignKey("chats.id"), nullable=True)
    
    # Call details
    call_type = Column(Enum(CallType), nullable=False)
    status = Column(Enum(CallStatus), default=CallStatus.INCOMING)
    
    # Call timing
    start_time = Column(DateTime(timezone=True), nullable=True)
    end_time = Column(DateTime(timezone=True), nullable=True)
    duration = Column(Integer, nullable=True)  # Duration in seconds
    
    # Call quality and technical info
    connection_quality = Column(String(20), nullable=True)  # "excellent", "good", "poor"
    network_type = Column(String(20), nullable=True)  # "wifi", "cellular", "ethernet"
    device_info = Column(Text, nullable=True)  # Device and browser info
    
    # Call settings
    is_recorded = Column(Boolean, default=False)
    recording_url = Column(String(500), nullable=True)
    is_scheduled = Column(Boolean, default=False)
    scheduled_time = Column(DateTime(timezone=True), nullable=True)
    
    # Call notes and feedback
    notes = Column(Text, nullable=True)
    rating = Column(Integer, nullable=True)  # 1-5 stars
    feedback = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    caller = relationship("User", foreign_keys=[caller_id])
    receiver = relationship("User", foreign_keys=[receiver_id])
    chat = relationship("Chat")
    
    def __repr__(self):
        return f"<Call(id={self.id}, caller={self.caller_id}, receiver={self.receiver_id}, type={self.call_type})>"
    
    @property
    def is_active(self):
        return self.status == CallStatus.ONGOING
    
    @property
    def is_completed(self):
        return self.status in [CallStatus.ENDED, CallStatus.MISSED, CallStatus.DECLINED]
    
    @property
    def duration_formatted(self):
        if not self.duration:
            return "Unknown"
        minutes = self.duration // 60
        seconds = self.duration % 60
        return f"{minutes}:{seconds:02d}"
    
    @property
    def cost_estimate(self):
        """Estimate call cost based on duration and type"""
        if not self.duration or not self.start_time:
            return 0.0
        
        # Base rates (could be configurable)
        voice_rate_per_minute = 0.10  # $0.10 per minute
        video_rate_per_minute = 0.25  # $0.25 per minute
        
        minutes = self.duration / 60
        rate = video_rate_per_minute if self.call_type == CallType.VIDEO else voice_rate_per_minute
        
        return round(minutes * rate, 2) 