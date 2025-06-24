from sqlalchemy import Column, String, DateTime, Boolean, Enum, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class UserRole(str, enum.Enum):
    LAWYER = "lawyer"
    CLIENT = "client"
    ADMIN = "admin"

class UserStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    SUSPENDED = "suspended"
    PENDING_VERIFICATION = "pending_verification"

class User(Base):
    __tablename__ = "users"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)  # Clerk user ID
    
    # Basic info
    email = Column(String(255), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=True)
    
    # Role and status
    role = Column(Enum(UserRole), nullable=False)
    status = Column(Enum(UserStatus), default=UserStatus.PENDING_VERIFICATION)
    
    # Profile
    avatar_url = Column(String(500), nullable=True)
    bio = Column(Text, nullable=True)
    date_of_birth = Column(DateTime, nullable=True)
    gender = Column(String(20), nullable=True)
    
    # Location
    country = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    address = Column(Text, nullable=True)
    
    # Verification
    email_verified = Column(Boolean, default=False)
    phone_verified = Column(Boolean, default=False)
    identity_verified = Column(Boolean, default=False)
    
    # Platform settings
    notifications_enabled = Column(Boolean, default=True)
    two_factor_enabled = Column(Boolean, default=False)
    language = Column(String(10), default="en")
    timezone = Column(String(50), default="UTC")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    # Relationships
    lawyer_profile = relationship("Lawyer", back_populates="user", uselist=False)
    client_profile = relationship("Client", back_populates="user", uselist=False)
    
    # Videos (if lawyer)
    videos = relationship("Video", back_populates="creator")
    
    # Cases (if lawyer)
    lawyer_cases = relationship("Case", back_populates="lawyer")
    
    # Appointments
    appointments = relationship("Appointment", back_populates="user")
    
    # Notifications
    notifications = relationship("Notification", back_populates="user")
    
    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, role={self.role})>"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    @property
    def is_lawyer(self):
        return self.role == UserRole.LAWYER
    
    @property
    def is_client(self):
        return self.role == UserRole.CLIENT
    
    @property
    def is_verified(self):
        return self.status == UserStatus.ACTIVE and self.email_verified 