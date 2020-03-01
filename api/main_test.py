import json
import unittest
import uuid

from fastapi.testclient import TestClient
from starlette.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_422_UNPROCESSABLE_ENTITY

from main import app
from models import Player
import db

client = TestClient(app)

class MainTests(unittest.TestCase):
    def setUp(self):
        db._seed_test_data()

    def test_index(self):
        resp = client.get('/')
        self.assertEqual(HTTP_200_OK, resp.status_code)

    def test_get_all_players(self):
        resp = client.get('/players')
        self.assertEqual(HTTP_200_OK, resp.status_code)
        body = resp.json()
        self.assertIsInstance(body, list)
        self.assertTrue(len(body) > 0)

    def test_get_player(self):
        test_player = db._test_data[0]
        resp = client.get(f'/players/{test_player.id}')
        self.assertEqual(HTTP_200_OK, resp.status_code)
        body = resp.json()
        self.assertIsNotNone(body)
        self.assertEqual(str(test_player.id), body['id'])

    def test_get_player_not_exists(self):
        test_id = str(uuid.uuid4())
        resp = client.get(f'/players/{test_id}')
        self.assertEqual(HTTP_404_NOT_FOUND, resp.status_code)

    def test_create_player(self):
        payload = {
            'first_name': 'Gary',
            'last_name': 'Woodland',
            'score': 8
        }
        resp = client.post('/players', data=json.dumps(payload))
        self.assertEqual(HTTP_200_OK, resp.status_code)
        body = resp.json()
        self.assertIsNotNone(body)
        self.assertIsNotNone(body['id'])

    def test_create_player_invalid_score(self):
        payload = {
            'first_name': 'Gary',
            'last_name': 'Woodland',
            'score': -10
        }
        resp = client.post('/players', data=json.dumps(payload))
        self.assertEqual(HTTP_422_UNPROCESSABLE_ENTITY, resp.status_code)

        payload['score'] = 120
        resp = client.post('/players', data=json.dumps(payload))
        self.assertEqual(HTTP_422_UNPROCESSABLE_ENTITY, resp.status_code)

    def test_create_player_missing_name(self):
        payload = {
            'score': 5
        }
        resp = client.post('/players', data=json.dumps(payload))
        self.assertEqual(HTTP_422_UNPROCESSABLE_ENTITY, resp.status_code)

    def test_update_player(self):
        test_player = db._test_data[0]
        payload = {
            'id': str(test_player.id),
            'first_name': test_player.first_name,
            'last_name': test_player.last_name,
            'score': 34
        }
        resp = client.put(f'/players/{test_player.id}', data=json.dumps(payload))
        self.assertEqual(HTTP_200_OK, resp.status_code)

        resp = client.get(f'/players/{test_player.id}')
        updated_player = resp.json()
        self.assertEqual(34, updated_player['score'])


    def test_update_player_invalid_score(self):
        test_player = db._test_data[0]
        payload = {
            'id': str(test_player.id),
            'first_name': test_player.first_name,
            'last_name': test_player.last_name,
            'score': -4
        }
        resp = client.put(f'/players/{test_player.id}', data=json.dumps(payload))
        self.assertEqual(HTTP_422_UNPROCESSABLE_ENTITY, resp.status_code)

    def test_update_player_not_exists(self):
        test_id = str(uuid.uuid4())
        payload = {
            'id': test_id,
            'first_name': 'Russell',
            'last_name': 'Henley',
            'score': 23
        }
        resp = client.put(f'/players/{test_id}', data=json.dumps(payload))
        self.assertEqual(HTTP_404_NOT_FOUND, resp.status_code)

    def test_delete_player(self):
        test_player = db._test_data[0]
        resp = client.delete(f'/players/{test_player.id}')
        self.assertEqual(HTTP_200_OK, resp.status_code)

if __name__ == "__main__":
    unittest.main(verbosity=2)