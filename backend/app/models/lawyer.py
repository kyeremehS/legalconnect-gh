from sqlalchemy import Column, String, DateTime, Boolean, Text, Integer, Float, ForeignKey, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class LawyerSpecialization(str, enum.Enum):
    CORPORATE_LAW = "corporate_law"
    CRIMINAL_LAW = "criminal_law"
    FAMILY_LAW = "family_law"
    REAL_ESTATE_LAW = "real_estate_law"
    INTELLECTUAL_PROPERTY = "intellectual_property"
    TAX_LAW = "tax_law"
    LABOR_LAW = "labor_law"
    IMMIGRATION_LAW = "immigration_law"
    PERSONAL_INJURY = "personal_injury"
    BANKRUPTCY_LAW = "bankruptcy_law"
    ENVIRONMENTAL_LAW = "environmental_law"
    HEALTHCARE_LAW = "healthcare_law"
    OTHER = "other"

class LawyerVerificationStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"
    SUSPENDED = "suspended"

class Lawyer(Base):
    __tablename__ = "lawyers"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    user_id = Column(String(255), ForeignKey("users.id"), unique=True, nullable=False)
    
    # Professional info
    bar_number = Column(String(100), unique=True, nullable=True)
    bar_association = Column(String(200), nullable=True)
    law_school = Column(String(200), nullable=True)
    graduation_year = Column(Integer, nullable=True)
    years_of_experience = Column(Integer, default=0)
    
    # Specializations
    specializations = Column(JSON, default=list)  # List of LawyerSpecialization
    practice_areas = Column(Text, nullable=True)
    
    # Professional details
    firm_name = Column(String(200), nullable=True)
    firm_address = Column(Text, nullable=True)
    website = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    
    # Verification
    verification_status = Column(Enum(LawyerVerificationStatus), default=LawyerVerificationStatus.PENDING)
    verification_documents = Column(JSON, default=list)  # List of document URLs
    verified_at = Column(DateTime(timezone=True), nullable=True)
    verified_by = Column(String(255), nullable=True)
    
    # Professional credentials
    licenses = Column(JSON, default=list)  # List of license info
    certifications = Column(JSON, default=list)  # List of certifications
    awards = Column(JSON, default=list)  # List of awards
    
    # Availability and pricing
    hourly_rate = Column(Float, nullable=True)
    consultation_fee = Column(Float, nullable=True)
    availability_schedule = Column(JSON, default=dict)  # Weekly schedule
    timezone = Column(String(50), default="UTC")
    
    # Platform settings
    accepts_new_clients = Column(Boolean, default=True)
    accepts_video_calls = Column(Boolean, default=True)
    accepts_voice_calls = Column(Boolean, default=True)
    accepts_in_person = Column(Boolean, default=True)
    
    # Statistics
    total_cases = Column(Integer, default=0)
    successful_cases = Column(Integer, default=0)
    client_rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="lawyer_profile")
    cases = relationship("Case", back_populates="lawyer")
    
    def __repr__(self):
        return f"<Lawyer(id={self.id}, user_id={self.user_id}, firm={self.firm_name})>"
    
    @property
    def is_verified(self):
        return self.verification_status == LawyerVerificationStatus.VERIFIED
    
    @property
    def success_rate(self):
        if self.total_cases == 0:
            return 0.0
        return (self.successful_cases / self.total_cases) * 100
    
    @property
    def display_name(self):
        return self.firm_name or f"{self.user.first_name} {self.user.last_name}" 