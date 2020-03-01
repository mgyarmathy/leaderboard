import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

Then('I see players sorted by score, last name in ascending order', () => {

});