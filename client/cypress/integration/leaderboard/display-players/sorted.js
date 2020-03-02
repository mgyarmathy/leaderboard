import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import LeaderboardPage from '../../../pages/leaderboard-page';

let rowCount;

Given('I am on the leaderboard page', () => {
  LeaderboardPage.visit();
});

Then('I see players sorted by score, last name in ascending order', () => {
  LeaderboardPage.getPlayerRows().then($selector => {
    expect($selector).to.have.length.greaterThan(0);

    rowCount = $selector.length;

    for (let i = 1; i < rowCount - 1; i++) {
      let previousRow = LeaderboardPage.getPlayerRows().eq(i - 1);
      let currentRow = LeaderboardPage.getPlayerRows().eq(i);
      previousRow.then($prevRow => {
        const prevRowScore = parseInt($prevRow.find('td').eq(1).text());
        const prevRowName = $prevRow.find('td').eq(0).text();

        currentRow.should($currRow => {
          const currentRowScore = parseInt($currRow.find('td').eq(1).text());
          const currentRowName = $currRow.find('td').eq(0).text();

          expect(currentRowScore >= prevRowScore).to.be.true;

          if (currentRowScore === prevRowScore) {
            expect(currentRowName >= prevRowName).to.be.true;
          }
        });
      });
    }
  });
});