import uuid

from pydantic import BaseModel, Schema

class Player(BaseModel):
    id: uuid.UUID = None
    first_name: str = Schema(None, alias='firstName')
    last_name: str = Schema(None, alias='lastName')
    score: int = Schema(
        None,
        ge=0,
        le=100
    )