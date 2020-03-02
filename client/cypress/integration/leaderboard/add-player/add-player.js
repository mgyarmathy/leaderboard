import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';
import { getRandomFirstName, getRandomLastName, getRandomNumber } from '../../../utils';

let playerRowCount;

const newPlayerLastName = getRandomLastName();
const newPlayerFirstName = getRandomFirstName();
const newPlayerScore = `${getRandomNumber(0, 100)}`;

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

When('I fill out the form for a new player', () => {
  LeaderboardPage.getNewPlayerForm().find('input').eq(0).type(newPlayerLastName);
  LeaderboardPage.getNewPlayerForm().find('input').eq(1).type(newPlayerFirstName);
  LeaderboardPage.getNewPlayerForm().find('input').eq(2).type(newPlayerScore);
});

And('I click the \'Add Player\' button', () => {
  LeaderboardPage.getPlayerRows().then($selector => {
    playerRowCount = $selector.length;

    LeaderboardPage.getNewPlayerForm().contains('Add Player').click();
  });
});

Then('I see the new player on the leaderboard', () => {
  LeaderboardPage.getPlayerRows().should('have.length', playerRowCount + 1);
  LeaderboardPage.getPlayerRows().contains(`${newPlayerLastName}, ${newPlayerFirstName}`).should('be.visible');
});
