import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

When('I fill out the form for a new player', () => {

});

And('I click the \'Add Player\' button', () => {

});

Then('I see the new player on the leaderboard', () => {

});
