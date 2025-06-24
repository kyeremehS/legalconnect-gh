from sqlalchemy import Column, String, DateTime, Boolean, Text, ForeignKey, Integer, Float, Enum,JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class AppointmentType(str, enum.Enum):
    CONSULTATION = "consultation"
    CASE_REVIEW = "case_review"
    COURT_HEARING = "court_hearing"
    DOCUMENT_REVIEW = "document_review",
    SETTLEMENT_MEETING = "settlement_meeting"
    CLIENT_MEETING = "client_meeting"
    OTHER = "other"

class AppointmentStatus(str, enum.Enum):
    SCHEDULED = "scheduled"
    CONFIRMED = "confirmed"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    CANCELLED = "cancelled"
    NO_SHOW = "no_show"
    RESCHEDULED = "rescheduled"

class AppointmentMode(str, enum.Enum):
    IN_PERSON = "in_person"
    VIDEO_CALL = "video_call"
    VOICE_CALL = "voice_call"
    PHONE_CALL = "phone_call"

class Appointment(Base):
    __tablename__ = "appointments"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    
    # Participants
    user_id = Column(String(255), ForeignKey("users.id"), nullable=False)
    lawyer_id = Column(String(255), ForeignKey("lawyers.id"), nullable=False)
    case_id = Column(String(255), ForeignKey("cases.id"), nullable=True)
    
    # Appointment details
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    appointment_type = Column(Enum(AppointmentType), nullable=False)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED)
    mode = Column(Enum(AppointmentMode), nullable=False)
    
    # Scheduling
    scheduled_at = Column(DateTime(timezone=True), nullable=False)
    duration = Column(Integer, default=60)  # Duration in minutes
    timezone = Column(String(50), default="UTC")
    
    # Location/Meeting details
    location = Column(String(500), nullable=True)  # Physical location or meeting link
    meeting_link = Column(String(500), nullable=True)  # For video/voice calls
    meeting_id = Column(String(255), nullable=True)  # For video call platforms
    
    # Reminders and notifications
    reminder_sent = Column(Boolean, default=False)
    reminder_sent_at = Column(DateTime(timezone=True), nullable=True)
    confirmation_sent = Column(Boolean, default=False)
    confirmation_sent_at = Column(DateTime(timezone=True), nullable=True)
    
    # Financial
    fee = Column(Float, nullable=True)
    fee_paid = Column(Boolean, default=False)
    payment_method = Column(String(50), nullable=True)
    
    # Notes and feedback
    notes = Column(Text, nullable=True)
    client_notes = Column(Text, nullable=True)  # Notes visible to client
    lawyer_notes = Column(Text, nullable=True)  # Private notes for lawyer
    feedback = Column(Text, nullable=True)
    rating = Column(Integer, nullable=True)  # 1-5 stars
    
    # Cancellation
    cancelled_at = Column(DateTime(timezone=True), nullable=True)
    cancelled_by = Column(String(255), nullable=True)
    cancellation_reason = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="appointments")
    lawyer = relationship("Lawyer")
    case = relationship("Case", back_populates="appointments")
    
    def __repr__(self):
        return f"<Appointment(id={self.id}, title={self.title}, scheduled_at={self.scheduled_at})>"
    
    @property
    def is_upcoming(self):
        from datetime import datetime
        return self.scheduled_at > datetime.now() and self.status in [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED]
    
    @property
    def is_past(self):
        from datetime import datetime
        return self.scheduled_at < datetime.now()
    
    @property
    def is_today(self):
        from datetime import datetime, date
        return self.scheduled_at.date() == date.today()
    
    @property
    def end_time(self):
        from datetime import timedelta
        return self.scheduled_at + timedelta(minutes=self.duration)
    
    @property
    def duration_formatted(self):
        if self.duration < 60:
            return f"{self.duration} minutes"
        hours = self.duration // 60
        minutes = self.duration % 60
        if minutes == 0:
            return f"{hours} hour{'s' if hours > 1 else ''}"
        return f"{hours}h {minutes}m"
    
    @property
    def can_be_cancelled(self):
        from datetime import datetime, timedelta
        # Can cancel up to 24 hours before appointment
        return self.scheduled_at > datetime.now() + timedelta(hours=24) and self.status in [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED]
    
    @property
    def requires_payment(self):
        return self.fee and not self.fee_paid 