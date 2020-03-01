import typing
import uuid

from models import Player

store = {}

def get_all_players() -> typing.List[Player]:
    return [player for _, player in store.items()]

def get_player(player_id: uuid.UUID) -> Player:
    return store[str(player_id)]

def insert_player(player: Player) -> Player:
    player.id = str(uuid.uuid4())
    store[player.id] = player
    return player

def update_player(player_id: uuid.UUID, player: Player) -> None:
    store[str(player_id)].score = player.score

def delete_player(player_id: uuid.UUID) -> None:
    if str(player_id) in store:
        del store[str(player_id)]

_test_data = [
    Player(
        id='804caed8-02f1-45fb-8413-ac1c2fc97883', 
        first_name='Im',
        last_name='Sung-jae',
        score=14
    ),
    Player(
        id='3e5d5491-2233-432d-9f2c-92cd61b60335', 
        first_name='Mackenzie',
        last_name='Hughes',
        score=17
    ),
    Player(
        id='f038624c-820a-4af6-a223-afca466162d2', 
        first_name='Brendan',
        last_name='Steele',
        score=8
    )
]

def _seed_test_data():
    global store
    for player in _test_data:
        store[str(player.id)] = player
