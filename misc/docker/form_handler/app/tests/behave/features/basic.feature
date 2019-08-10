Feature: form server

  Scenario: The server can be started and contacted
    Given an instance of the server application
      When I send an empty head query
        Then I receive a response indicating it worked
        And it contains "form server"
