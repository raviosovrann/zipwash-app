from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"  # Table name in the database

    # Primary key column with auto-incrementation
    user_id = Column(Integer, primary_key=True, index=True)
    
    # User's name fields
    first_name = Column(String)
    last_name = Column(String)
    
    # Email column that must be unique and has an index
    email = Column(String, unique=True, index=True)
    
    # Stores the hashed password
    password = Column(String)
    
    # Phone number
    phone_number = Column(String)
    
    # User type (customer/vendor)
    user_type = Column(String)
    
    # Timestamps
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())