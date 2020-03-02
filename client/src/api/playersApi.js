import { get, post, put, del } from 'api';

export function getAllPlayers() {
  return get('/players').then(players => players.map(mapFromApi));
}

export function getPlayer(playerId) {
  return get(`/players/${playerId}`).then(mapFromApi);
}

export function savePlayer(playerId, player) {
  const body = mapToApi(player);
  if (playerId != null) {
    return put(`/players/${playerId}`, body);
  } else {
    return post('/players', body)
  }
}

export function deletePlayer(playerId) {
  return del(`/players/${playerId}`);
}

// convert from snake to camel case and vice-versa
const mapFromApi = (player) => ({
  id: player.id,
  firstName: player.first_name,
  lastName: player.last_name,
  score: player.score
});

const mapToApi = (player) => ({
  id: player.id,
  first_name: player.firstName,
  last_name: player.lastName,
  score: player.score
});
