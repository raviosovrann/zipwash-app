from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer

from app.core.database import get_db
from app.core.security import verify_password, create_access_token, get_password_hash, ACCESS_TOKEN_EXPIRE_MINUTES
from app.models.user import User
from app.schemas.auth import Token, LoginRequest, SignupRequest
from app.schemas.user import UserCreate, UserResponse

from app.models.vendor import Vendor
from app.schemas.vendor import VendorCreate, VendorResponse

from sqlalchemy import func

# Create an API router for authentication endpoints
router = APIRouter()

# The tokenUrl should match your actual endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

@router.post("/login", response_model=Token)
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate user and return JWT token
    """
    # Determine if we're logging in as a user or vendor
    if login_data.account_type == "user":
        # Find the user by email
        user = db.query(User).filter(User.email == login_data.email).first()
        
        # Check if user exists and password is correct
        if not user or not verify_password(login_data.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token with expiration time
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email, "account_type": "user"},
            expires_delta=access_token_expires
        )
    else:
        # Find the vendor by email
        vendor = db.query(Vendor).filter(Vendor.company_email == login_data.email).first()
        
        # Check if vendor exists and password is correct
        if not vendor or not verify_password(login_data.password, vendor.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Create access token with expiration time
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": vendor.company_email, "account_type": "vendor"},
            expires_delta=access_token_expires
        )
    
    # Return token response
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup")
def signup(signup_data: SignupRequest, db: Session = Depends(get_db)):
    """
    Create new account - handles both user and vendor signups
    """
    try:
        # Hash the password for security
        hashed_password = get_password_hash(signup_data.password)
        
        # Check if we're creating a user or vendor account
        if signup_data.account_type == "user":
            # Validate required fields for user signup
            if not signup_data.first_name or not signup_data.last_name or not signup_data.email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Missing required fields for user signup"
                )
            
            # Check if user with this email already exists
            existing_user = db.query(User).filter(
                func.lower(User.email) == func.lower(signup_data.email)
            ).first()
            
            if existing_user:
                print(f"User email already exists: {signup_data.email}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already registered"
                )
            
            # Create new user
            db_user = User(
                first_name=signup_data.first_name,
                last_name=signup_data.last_name,
                email=signup_data.email,
                password=hashed_password,
                phone_number=signup_data.phone_number
            )
            
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            print(f"User created successfully: {db_user.email}")
            
            # Format user response
            return {
                "user_id": db_user.user_id,
                "email": db_user.email,
                "first_name": db_user.first_name,
                "last_name": db_user.last_name,
                "phone_number": db_user.phone_number,
                "created_at": db_user.created_at.isoformat(),
                "account_type": "user"
            }
        else:
            # Vendor signup logic
            # Validate required fields for vendor signup
            if not signup_data.company_name or not signup_data.company_email:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Missing required fields for vendor signup"
                )
            
            # Check if vendor with this email already exists
            existing_vendor = db.query(Vendor).filter(
                func.lower(Vendor.company_email) == func.lower(signup_data.company_email)
            ).first()
            
            if existing_vendor:
                print(f"Vendor email already exists: {signup_data.company_email}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Company email already registered"
                )
            
            # Create new vendor
            db_vendor = Vendor(
                company_name=signup_data.company_name,
                company_email=signup_data.company_email,
                password=hashed_password,
                website=signup_data.website,
                phone_number=signup_data.phone_number
            )
            
            db.add(db_vendor)
            db.commit()
            db.refresh(db_vendor)
            print(f"Vendor created successfully: {db_vendor.company_email}")
            
            # Format vendor response
            return {
                "vendor_id": db_vendor.vendor_id,
                "company_name": db_vendor.company_name,
                "company_email": db_vendor.company_email,
                "website": db_vendor.website,
                "phone_number": db_vendor.phone_number,
                "created_at": db_vendor.created_at.isoformat(),
                "account_type": "vendor"
            }
            
    except HTTPException as he:
        db.rollback()
        raise he
    except Exception as e:
        print(f"Error creating account: {e}")
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating account: {str(e)}"
        )