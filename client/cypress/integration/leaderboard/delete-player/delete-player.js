import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

let playerRowCount;

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

When('I click the delete button for a player', () => {
  LeaderboardPage.getPlayerRows().then($selector => {
    playerRowCount = $selector.length;

    LeaderboardPage.getPlayerRows().first().contains('Delete').click();
  });
});

Then('the player is removed from the leaderboard', () => {
  LeaderboardPage.getPlayerRows().should('have.length', playerRowCount - 1);
});
