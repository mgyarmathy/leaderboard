import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

When('I click the edit button for a player', () => {

});

And('I update their score', () => {

});

Then('I see the updated score on the leaderboard', () => {

});
