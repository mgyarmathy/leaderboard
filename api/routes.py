import typing
import uuid

from fastapi import APIRouter, HTTPException
from starlette.status import HTTP_404_NOT_FOUND

import db
from models import Player

router = APIRouter()

@router.get("/players")
def get_players() -> typing.List[Player]:
    return db.get_all_players()

@router.get("/players/{player_id}")
def get_player(player_id: uuid.UUID):
    try:
        return db.get_player(player_id)
    except KeyError:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)


@router.post("/players")
def create_player(player: Player) -> Player:
    return db.insert_player(player)

@router.put("/players/{player_id}")
def update_player(player_id: uuid.UUID, player: Player):
    try:
        db.update_player(player_id, player)
    except KeyError:
        raise HTTPException(status_code=HTTP_404_NOT_FOUND)

@router.delete("/players/{player_id}")
def delete_player(player_id: uuid.UUID):
    db.delete_player(player_id)
