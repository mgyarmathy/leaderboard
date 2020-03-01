Feature: Edit Player

  Scenario: Editing an existing player
    Given I am on the leaderboard page
    When I click the edit button for a player
    And I update their score
    Then I see the updated score on the leaderboard
