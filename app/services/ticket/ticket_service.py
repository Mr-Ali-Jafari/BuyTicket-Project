from sqlalchemy.orm import Session
from app.models import models
from app.schemas import schemas
from fastapi import HTTPException, status
from app.models.models import Ticket


def create_ticket(ticket_data: schemas.ticketbase, db: Session, user_id: int):
    new_ticket = Ticket(message=ticket_data.message, user_id=user_id)
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket