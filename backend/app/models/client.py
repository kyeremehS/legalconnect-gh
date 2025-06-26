from sqlalchemy import Column, String, DateTime, Boolean, Text, ForeignKey, JSON, Integer
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Client(Base):
    __tablename__ = "clients"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    user_id = Column(String(255), ForeignKey("users.id"), unique=True, nullable=False)
    
    # Client info
    emergency_contact_name = Column(String(200), nullable=True)
    emergency_contact_phone = Column(String(20), nullable=True)
    emergency_contact_relationship = Column(String(100), nullable=True)
    
    # Legal history
    has_previous_legal_issues = Column(Boolean, default=False)
    previous_legal_issues = Column(Text, nullable=True)
    current_legal_issues = Column(Text, nullable=True)
    
    # Preferences
    preferred_lawyer_specializations = Column(JSON, default=list)
    preferred_consultation_type = Column(JSON, default=list)  # ["video", "voice", "in_person"]
    budget_range = Column(String(50), nullable=True)
    
    # Platform usage
    total_consultations = Column(Integer, default=0)
    total_appointments = Column(Integer, default=0)
    favorite_lawyers = Column(JSON, default=list)  # List of lawyer IDs
    
    # Privacy settings
    share_contact_info = Column(Boolean, default=False)
    allow_marketing_emails = Column(Boolean, default=True)
    allow_sms_notifications = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="client_profile")
    cases = relationship("Case", back_populates="client")
    
    def __repr__(self):
        return f"<Client(id={self.id}, user_id={self.user_id})>"
    
    @property
    def is_active_client(self):
        return self.total_consultations > 0 or self.total_appointments > 0 