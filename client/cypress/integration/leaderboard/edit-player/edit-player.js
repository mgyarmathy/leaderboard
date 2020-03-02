import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

When('I click the edit button for a player', () => {
  LeaderboardPage.getPlayerRows().first().contains('Edit').click();
});

And('I update their score', () => {
  LeaderboardPage.getPlayerRows().first().find('input[type="number"]').clear().type('87');
  LeaderboardPage.getPlayerRows().first().contains('Save').click();
});

Then('I see the updated score on the leaderboard', () => {
  LeaderboardPage.getPlayerRows().first().find('td').eq(1).should('have.text', '87');
});
