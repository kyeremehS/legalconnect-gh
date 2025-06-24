from sqlalchemy import Column, String, DateTime, Boolean, Text, ForeignKey, Integer, Float, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class CaseStatus(str, enum.Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    PENDING_CLIENT = "pending_client"
    PENDING_COURT = "pending_court"
    SETTLED = "settled"
    CLOSED = "closed"
    ARCHIVED = "archived"

class CasePriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class CaseType(str, enum.Enum):
    CORPORATE = "corporate"
    CRIMINAL = "criminal"
    FAMILY = "family"
    REAL_ESTATE = "real_estate"
    INTELLECTUAL_PROPERTY = "intellectual_property"
    TAX = "tax"
    LABOR = "labor"
    IMMIGRATION = "immigration"
    PERSONAL_INJURY = "personal_injury"
    BANKRUPTCY = "bankruptcy"
    ENVIRONMENTAL = "environmental"
    HEALTHCARE = "healthcare"
    OTHER = "other"

class Case(Base):
    __tablename__ = "cases"
    
    # Primary key
    id = Column(String(255), primary_key=True, index=True)
    
    # Case participants
    lawyer_id = Column(String(255), ForeignKey("lawyers.id"), nullable=False)
    client_id = Column(String(255), ForeignKey("clients.id"), nullable=False)
    
    # Case details
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    case_type = Column(Enum(CaseType), nullable=False)
    case_number = Column(String(100), unique=True, nullable=True)  # Court case number
    
    # Status and priority
    status = Column(Enum(CaseStatus), default=CaseStatus.OPEN)
    priority = Column(Enum(CasePriority), default=CasePriority.MEDIUM)
    
    # Case information
    court_name = Column(String(200), nullable=True)
    court_location = Column(String(200), nullable=True)
    opposing_party = Column(String(200), nullable=True)
    opposing_counsel = Column(String(200), nullable=True)
    
    # Important dates
    filing_date = Column(DateTime(timezone=True), nullable=True)
    hearing_date = Column(DateTime(timezone=True), nullable=True)
    deadline_date = Column(DateTime(timezone=True), nullable=True)
    settlement_date = Column(DateTime(timezone=True), nullable=True)
    closing_date = Column(DateTime(timezone=True), nullable=True)
    
    # Financial information
    estimated_cost = Column(Float, nullable=True)
    actual_cost = Column(Float, nullable=True)
    retainer_amount = Column(Float, nullable=True)
    hourly_rate = Column(Float, nullable=True)
    total_hours = Column(Float, default=0.0)
    
    # Case documents and notes
    documents = Column(JSON, default=list)  # List of document URLs
    notes = Column(Text, nullable=True)
    internal_notes = Column(Text, nullable=True)  # Private notes for lawyer only
    
    # Case outcome
    outcome = Column(String(100), nullable=True)  # "won", "lost", "settled", "dismissed"
    settlement_amount = Column(Float, nullable=True)
    court_decision = Column(Text, nullable=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    lawyer = relationship("Lawyer", back_populates="cases")
    client = relationship("Client", back_populates="cases")
    appointments = relationship("Appointment", back_populates="case")
    
    def __repr__(self):
        return f"<Case(id={self.id}, title={self.title}, lawyer={self.lawyer_id}, client={self.client_id})>"
    
    @property
    def is_active(self):
        return self.status in [CaseStatus.OPEN, CaseStatus.IN_PROGRESS, CaseStatus.PENDING_CLIENT, CaseStatus.PENDING_COURT]
    
    @property
    def is_urgent(self):
        return self.priority == CasePriority.URGENT
    
    @property
    def days_until_deadline(self):
        if not self.deadline_date:
            return None
        from datetime import datetime
        delta = self.deadline_date - datetime.now()
        return delta.days
    
    @property
    def is_overdue(self):
        days = self.days_until_deadline
        return days is not None and days < 0
    
    @property
    def total_cost(self):
        """Calculate total cost including actual cost and hourly charges"""
        total = self.actual_cost or 0.0
        if self.hourly_rate and self.total_hours:
            total += self.hourly_rate * self.total_hours
        return total 