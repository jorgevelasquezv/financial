@ignore
Feature: re-usable feature to login in Auth
Background:
    * url urlBase
    * configure headers = headers    

Scenario:

Given path '/login'
And request requestAuthLogin
When method POST
Then status 200