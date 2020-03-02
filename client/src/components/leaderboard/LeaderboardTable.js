import React from 'react';
import _ from 'lodash';

import { getAllPlayers, savePlayer, deletePlayer } from 'api/playersApi';
import AddPlayerFooterRow from 'components/leaderboard/AddPlayerFooterRow';
import EditablePlayerRow from 'components/leaderboard/EditablePlayerRow';

class LeaderboardTable extends React.Component {
  constructor() {
    super();

    this.state = {
      players: []
    };

    this._refreshPlayers = this._refreshPlayers.bind(this);
    this._savePlayer = this._savePlayer.bind(this);
    this._deletePlayer = this._deletePlayer.bind(this);
  }

  componentDidMount() {
    this._refreshPlayers();
  }

  _refreshPlayers() {
    return getAllPlayers().then(players => {
      this.setState({players});
    });
  }

  _savePlayer(playerId, player) {
    return savePlayer(playerId, player).then(() => {
      this._refreshPlayers();
    });
  }

  _deletePlayer(playerId) {
    return deletePlayer(playerId).then(() => {
      this._refreshPlayers();
    });
  }

  render() {
    const sortedPlayers = _.orderBy(this.state.players, ['score', 'lastName', 'firstName'], ['asc']);

    return (
      <table className="leaderboard table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 px-4 py-2 text-left">Name</th>
            <th className="w-1/4 px-4 py-2 text-left">Score</th>
            <th className="w-1/4"></th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, idx) => (
            <EditablePlayerRow
              key={player.id}
              className={idx % 2 === 1 ? 'bg-gray-100' : ''}
              player={player}
              onClickSave={(form) => this._savePlayer(player.id, form)}
              onClickDelete={() => this._deletePlayer(player.id)}/>
          ))}
        </tbody>
        <tfoot>
          <AddPlayerFooterRow onClickSave={(form) => this._savePlayer(null, form)}/>
        </tfoot>
      </table>
    );
  }
};

export default LeaderboardTable;