from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.models import Profile
from app.schemas.schemas import ProfileCreate, ProfileUpdate


def create_profile(db: Session, profile_data: ProfileCreate, user_id: int):
    # Check if a profile already exists for this user
    existing_profile = db.query(Profile).filter(Profile.user_id == user_id).first()

    if existing_profile:
        raise HTTPException(
            status_code=400,
            detail="A profile for this user already exists."
        )

    # Check if the username is already taken
    db_user = db.query(Profile).filter(Profile.username == profile_data.username).first()
    if db_user:
        raise HTTPException(
            status_code=400,
            detail="This username already exists; please choose a different username."
        )



    db_nationality_code = db.query(Profile).filter(Profile.national_code == profile_data.national_code).first()
    if db_nationality_code:
        raise HTTPException(
            status_code=400,
            detail="This nationality code already exists; please choose your national code."
        )
    
    
    db_phoone_number = db.query(Profile).filter(Profile.national_code == profile_data.national_code).first()
    if db_phoone_number:
        raise HTTPException(
            status_code=400,
            detail="This phone number already exists; please choose a different phone number."
        )

    # Create the new profile
    new_profile = Profile(
        first_name=profile_data.first_name,
        last_name=profile_data.last_name,
        gender=profile_data.gender,
        national_code=profile_data.national_code,
        phone_number=profile_data.phone_number,
        username=profile_data.username,
        user_id=user_id
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile



def get_profile(db: Session, user_id: int):
    return db.query(Profile).filter(Profile.user_id == user_id).first()


def update_profile(db: Session, profile_id: int, profile_data: ProfileUpdate):
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if profile:
        profile.first_name = profile_data.first_name
        profile.last_name = profile_data.last_name
        profile.gender = profile_data.gender
        profile.national_code = profile_data.national_code
        profile.phone_number = profile_data.phone_number
        profile.username = profile_data.username
        db.commit()
        db.refresh(profile)
    return profile


def delete_profile(db: Session, profile_id: int):
    profile = db.query(Profile).filter(Profile.id == profile_id).first()
    if profile:
        db.delete(profile)
        db.commit()
    return profile
