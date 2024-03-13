@acceptanceTest
Feature: Acceptance testing scenarios for Auth microservice

    Background:
    * url urlBase
    * configure headers = headers
    * def ValidatorTestUtils = Java.type('co.com.financial.utils.ValidatorTestUtils')
    * ValidatorTestUtils.setContentType('application/json');
    * def requestAuthLogin = read('requestAuthLogin.json')
    * def requestAuthRegister = read('requestAuthRegister.json')
    * def result = callonce read('login.feature')
    * def responseAuthLogin = result.response

    Scenario: Dado que un usuario comercial ingresa credenciales para autenticación en el sistema financial Cuando desea realizar uso de este Entonces el sistema retorna una respuesta exitosa
    Given path '/login'
    And request requestAuthLogin
    When method POST
    Then status 200

    Scenario: Dado que un usuario comercial ingresa credenciales erroneas para autenticación en el sistema financial Cuando desea realizar uso de este Entonces el sistema retorna una exepcion de no autorizado
    Given path '/login'
    And set requestAuthLogin.email = "mail@mail.com"
    And set requestAuthLogin.password = "Abc123456"
    And request requestAuthLogin
    When method POST
    Then status 401

    Scenario Outline: Dado que no se envia el campo obligatorio <Field> en el request de la peticion para autenticación en el sistema financial Cuando se desea realizar uso de este Entonces el sistema retorna una exepcion campos obligatorios
    Given path '/login'
    And remove requestAuthLogin.<Field>
    And request requestAuthLogin
    When method POST
    Then status 400
    Examples:
    | Field |
    | email |
    | password |

    Scenario: Dado que un usuario administardor ingresa la informacion completa de un nuevo usuario Cuando requiere registrar un nuevo usuario Entonces el sistema retorna una respuesta exitosa 
    Given path '/register'
    And def randomEmail = 'user' + java.util.UUID.randomUUID().toString() + '@example.com'
    And set requestAuthRegister.email = randomEmail
    * print requestAuthRegister
    And request requestAuthRegister
    And set headers.Authorization = 'Bearer ' + responseAuthLogin.token 
    When method POST
    Then status 201

    Scenario Outline: Dado que un usuario administardor ingresa la informacion sin el campo <Field> de un nuevo usuario Cuando requiere registrar un nuevo usuario Entonces el sistema retorna una exepcion por error en el cuerpo de la peticón 
    Given path '/register'
    And remove requestAuthRegister.<Field>
    And request requestAuthRegister
    And set headers.Authorization = 'Bearer ' + responseAuthLogin.token 
    When method POST
    Then status 400
    Examples:
    | Field |
    | email |
    | password |
    | fullName |

    Scenario: Dado que desde el aplicativo font se envia JWT valido pero con menos de una hora de expiradación Cuando se requiere renovar JWT Entonces el sistema retorna una respuesta exitosa con JWT nuevo
    Given path '/renew-token'
    And set headers.Authorization = 'Bearer ' + responseAuthLogin.token 
    When method GET
    Then status 200

    Scenario: Dado que desde el aplicativo font se envia JWT invalido Cuando se requiere renovar JWT Entonces el sistema retorna una exepcion por token invalido
    Given path '/renew-token'
    And set headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWlsQG1haWwuY29tIiwibmFtZSI6Ik1haWwiLCJpYXQiOjE1MTYyMzkwMjJ9.4'
    When method GET
    Then status 401

    Scenario: Dado que algun microservicio requiere hacer validacion de JWT Cuando se consume un endpoint de este microservicio y el JWT es valido Entonces el sistema retorna una respuesta exitosa de token valido
    Given path '/valid-token'
    And set headers.Authorization = 'Bearer ' + responseAuthLogin.token 
    When method GET
    Then status 200

    Scenario: Dado que algun microservicio requiere hacer validacion de JWT Cuando se consume un endpoint de este microservicio y el JWT es invalido Entonces el sistema retorna una exepción por token invalido
    Given path '/valid-token'
    And set headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWlsQG1haWwuY29tIiwibmFtZSI6Ik1haWwiLCJpYXQiOjE1MTYyMzkwMjJ9.4'
    When method GET
    Then status 401
