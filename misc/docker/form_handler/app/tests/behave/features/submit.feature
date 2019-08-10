Feature: submit subscription form

  Scenario: A form can successfully be submitted to the server using simple POST
    Given an instance of the server application
    And valid subscription data
      When I submit a complete subscription by POST
        Then I receive a response redirecting me to "https://andi.beta.gouv.fr/merci"
        And I can check the information has been received

  Scenario: A form can successfully be submitted to the server using JSON POST
    Given an instance of the server application
    And valid subscription data
      When I submit a complete subscription by POST in JSON format
        Then I receive a response indicating it worked
        And the response is in JSON
        And it contains the same data that was being sent
        And I can check the information has been received

  Scenario: A form can successfully be submitted to the server using GET
    Given an instance of the server application
    And valid subscription data
      When I submit a complete subscription by GET
        Then I receive a response indicating it worked
        And the response is in JSON
        And it contains the same data that was being sent
        And I can check the information has been received

  Scenario: If I resend twice the same information, it's not stored / notified
    Given an instance of the server application
    And valid subscription data
      When I submit a complete subscription by POST in JSON format
        Then it contains the same data that was being sent
      When I submit a complete subscription by POST in JSON format
        Then the response code indicates a failure
        And the error message says "data already submitted"

