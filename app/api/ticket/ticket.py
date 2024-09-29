from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas import schemas as schemas
from app.config.database.database import get_db
from app.services.ticket.ticket_service import create_ticket
from app.api.login.login import get_current_user

router = APIRouter(
    prefix="/tickets",
    tags=['tickets']
)


@router.post("/create", response_model=schemas.ticketbase)
def add_ticket(ticket: schemas.ticketbase, db: Session = Depends(get_db),current_user: schemas.User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    try:
        return create_ticket(ticket,db,current_user.id)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )