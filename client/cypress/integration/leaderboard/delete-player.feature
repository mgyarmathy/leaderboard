Feature: Delete Player

  Scenario: Delete a player
    Given I am on the leaderboard page
    When I click the delete button for a player
    Then the player is removed from the leaderboard
