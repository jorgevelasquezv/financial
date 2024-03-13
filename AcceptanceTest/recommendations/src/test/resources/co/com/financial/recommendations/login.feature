@ignore
Feature: re-usable feature to login in Auth
Background:
    * url 'http://127.0.0.5:3000/api/v1/auth'
    * configure headers = headers    

Scenario:

Given path '/login'
* def requestAuthLogin = {"email": "pperez@financial.com", "password": "Abc123456" }
And request requestAuthLogin
When method POST
Then status 200