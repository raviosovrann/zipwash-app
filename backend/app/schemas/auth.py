from typing import Optional, Literal, Union, Dict, Any
from pydantic import BaseModel, EmailStr

# Schema for JWT token response
class Token(BaseModel):
    access_token: str  # The JWT token string
    token_type: str  # Token type (typically "bearer")

# Schema for data stored in JWT token
class TokenData(BaseModel):
    email: Optional[str] = None  # Email stored in the token
    account_type: Optional[str] = None  # "user" or "vendor"

# Schema for login request validation
class LoginRequest(BaseModel):
    email: EmailStr  # Email must be valid format
    password: str  # Password for authentication
    account_type: Literal["user", "vendor"] = "user"

# Schema for unified signup request
class SignupRequest(BaseModel):
    # Common fields
    password: str
    phone_number: Optional[str] = None
    account_type: Literal["user", "vendor"] = "user"
    
    # User-specific fields
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    
    # Vendor-specific fields
    company_name: Optional[str] = None
    company_email: Optional[EmailStr] = None
    website: Optional[str] = None