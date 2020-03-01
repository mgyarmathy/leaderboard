Feature: Display Players

  Scenario: Leaderboard is visible
    Given I am on the leaderboard page
    Then I see the leaderboard

  Scenario: Players are sorted by score/last name in ascending order
    Given I am on the leaderboard page
    Then I see players sorted by score, last name in ascending order
