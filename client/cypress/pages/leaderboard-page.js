const LEADERBOARD_TABLE = '.leaderboard';

class LeaderboardPage {
  static visit() {
    cy.visit('/');
  }

  static expect() {
    return {
      toSeeLeaderboard: () => {
        cy.get(LEADERBOARD_TABLE).should('be.visible')
      }
    }
  }
}

export default LeaderboardPage;