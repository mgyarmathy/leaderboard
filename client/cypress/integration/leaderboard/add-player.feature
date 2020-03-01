Feature: Add Player

  Scenario: Adding a new player
    Given I am on the leaderboard page
    When I fill out the form for a new player
    And I click the 'Add Player' button
    Then I see the new player on the leaderboard
