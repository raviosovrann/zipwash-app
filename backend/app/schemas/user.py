from typing import Optional
from pydantic import BaseModel, EmailStr

# Base Pydantic model for user data with common attributes
class UserBase(BaseModel):
    email: EmailStr  # Validates that the email is in a correct format
    first_name: str
    last_name: str
    phone_number: Optional[str] = None  # Optional field with default value None
    is_customer: bool = True  # Default to customer account type

# Schema for user creation - extends UserBase and adds password
class UserCreate(UserBase):
    password: str  # Password field for creating a new user

# Schema for returning user data - extends UserBase with DB fields
class UserResponse(UserBase):
    user_id: int
    user_type: str
    created_at: str

    class Config:
        # Enables ORM mode to work with SQLAlchemy models
        from_attributes = True  # New version of orm_mode