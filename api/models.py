import uuid

from pydantic import BaseModel, Schema

class Player(BaseModel):
    id: uuid.UUID = None
    first_name: str
    last_name: str
    score: int = Schema(
        None,
        ge=0,
        le=100
    )