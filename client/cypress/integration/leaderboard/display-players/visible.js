import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

Then('I see the leaderboard', () => {
  LeaderboardPage.expect().toSeeLeaderboard();
});
