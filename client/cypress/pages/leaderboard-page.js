const LEADERBOARD_TABLE = '.leaderboard';
const PLAYER_ROW = '.leaderboard .player-row';
const NEW_PLAYER_FORM = '.leaderboard tfoot';

class LeaderboardPage {
  static visit() {
    cy.visit('/');
  }

  static getLeaderboardTable() {
    return cy.get(LEADERBOARD_TABLE);
  }

  static getPlayerRows() {
    return cy.get(PLAYER_ROW);
  }

  static getNewPlayerForm() {
    return cy.get(NEW_PLAYER_FORM);
  }
}

export default LeaderboardPage;