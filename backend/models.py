from sqlalchemy import (Column, Integer, String, DateTime, ForeignKey, JSON)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Organization(Base):
    __tablename__ = "organizations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    users = relationship("User", back_populates="organization")
    reports = relationship("Report", back_populates="organization")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True) 
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    organization = relationship("Organization", back_populates="users")
    reports = relationship("Report", back_populates="user")

class Report(Base):
    __tablename__ = "reports"
    id = Column(Integer, primary_key=True, index=True)
    status = Column(String, index=True, default="PENDING")
    number_factored = Column(String)
    factors_json = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    user = relationship("User", back_populates="reports")
    organization = relationship("Organization", back_populates="reports")