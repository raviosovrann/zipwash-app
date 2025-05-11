from typing import Optional
from pydantic import BaseModel, EmailStr

class VendorBase(BaseModel):
    company_name: str
    company_email: EmailStr
    website: Optional[str] = None
    phone_number: Optional[str] = None

class VendorCreate(VendorBase):
    password: str

class VendorResponse(VendorBase):
    vendor_id: int
    created_at: str

    class Config:
        from_attributes = True