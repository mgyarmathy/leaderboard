import { get, post, put, del } from 'api';

export function getAllPlayers() {
  return get('/players');
}

export function getPlayer(playerId) {
  return get(`/players/${playerId}`);
}

export function savePlayer(playerId, player) {
  const body = {
    id: playerId,
    firstName: player.firstName,
    lastName: player.lastName,
    score: player.score,
  };
  if (playerId != null) {
    return put(`/players/${playerId}`, body);
  } else {
    return post('/players', player)
  }
}

export function deletePlayer(playerId) {
  return del(`/players/${playerId}`);
}
