from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.config.database.database import get_db
from app.schemas.schemas import ProfileCreate, ProfileUpdate, ProfileResponse
from app.services.profile.profile_service import create_profile, get_profile, update_profile, delete_profile
from app.api.login.login import get_current_user  # فرض بر اینکه سیستم احراز هویت دارید

router = APIRouter(
    prefix="/profile",
    tags=['profile']
)


@router.post("/create", response_model=ProfileResponse)
def create_profile_api(profile: ProfileCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    return create_profile(db, profile, user_id=current_user['id'])


@router.get("/{profile_id}", response_model=ProfileResponse)
def get_profile_api(profile_id: int, db: Session = Depends(get_db)):
    profile = get_profile(db, profile_id)
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return profile


@router.put("/{profile_id}/update", response_model=ProfileResponse)
def update_profile_api(profile_id: int, profile: ProfileUpdate, db: Session = Depends(get_db)):
    updated_profile = update_profile(db, profile_id, profile)
    if not updated_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return updated_profile


@router.delete("/{profile_id}/delete")
def delete_profile_api(profile_id: int, db: Session = Depends(get_db)):
    deleted_profile = delete_profile(db, profile_id)
    if not deleted_profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found"
        )
    return {"detail": "Profile deleted successfully"}
