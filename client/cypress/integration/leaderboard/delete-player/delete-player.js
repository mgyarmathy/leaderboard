import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

When('I click the delete button for a player', () => {

});

Then('the player is removed from the leaderboard', () => {

});
