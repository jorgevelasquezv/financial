@acceptanceTest
Feature: Acceptance testing scenarios for Auth microservice

    Background:
    * url urlBase
    * configure headers = headers
    * def ValidatorTestUtils = Java.type('co.com.financial.utils.ValidatorTestUtils')
    * ValidatorTestUtils.setContentType('application/json');
    * def requestClientRegister = read('requestClientResgister.json')
    * def requestClientUpdate = read('requestClientUpdate.json')
    * def result = callonce read('login.feature')
    * def responseAuthLogin = result.response
    * def token = responseAuthLogin.token

    Scenario: Dado que un cliente desea registrarse en el sistema financial Cuando ingresa sus datos correctamente y el sitema front usa un usuario habilitado para generar la petición Entonces el sistema retorna una respuesta satisfactoria
    Given path '/client'
    And def randomEmail = 'client' + java.util.UUID.randomUUID().toString() + '@example.com'
    And set requestClientRegister.email = randomEmail
    And request requestClientRegister
    And set headers.Authorization = 'Bearer ' + token
    When method POST
    Then status 201

    Scenario: Dado que un cliente desea registrarse en el sistema financial Cuando ingresa un email que ya se encuentra resgistrado y el sitema front usa un usuario habilitado para generar la petición Entonces el sistema retorna excepción por email ya registrado
    Given path '/client'
    * def requestClientRegister =  { "email": "pmarmol@mail.com", "fullName": "Pablo Marmol", "accessKey": "Abc123456", "birthday": "1985-02-24" }
    And request requestClientRegister
    And set headers.Authorization = 'Bearer ' + token
    When method POST
    Then status 400

    Scenario: Dado que un usuario comercial activo desea actualizar los datos de un cliente Cuando ingresa los datos a actualizar correctamente Entonces el sistema retorna una respuesta exitosa 
    Given path '/client/ppicasso@mail.com'
    And request requestClientUpdate
    And set headers.Authorization = 'Bearer ' + token
    When method PUT
    Then status 200
    
    Scenario: Dado que un usuario comercial activo desea actualizar los datos de un cliente Cuando ingresa los datos a actualizar incorrectamente Entonces el sistema retorna una exepcion por cliente no encontrado
    Given path '/client/noexsiste@mail.com'
    And request requestClientUpdate
    And set headers.Authorization = 'Bearer ' + token
    When method PUT
    Then status 404

    Scenario: Dado que un usuario comercial activo desea consultar el listado de clientes activos Cuando realiza la petición por listado Entonces el sistema retorna una respuesta exitosa con listado de clientes 
    Given path '/client'
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 200

    Scenario: Dado que un usuario comercial activo desea consultar el listado de clientes inactivos Cuando realiza la petición por listado Entonces el sistema retorna una respuesta exitosa con listado de clientes 
    Given path '/client'
    And param isActive = "false"
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 200

    Scenario: Dado que un usuario comercial activo desea consultar un cliente por email Cuando realiza la petición por cliente y este existe Entonces el sistema retorna una respuesta exitosa con datos de cliente
    Given path '/client/pmarmol@mail.com'
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 200

    Scenario: Dado que un usuario comercial activo desea consultar un cliente por email Cuando realiza la petición por cliente y este no existe Entonces el sistema retorna una exepción indicando que no se encontro el cliente
    Given path '/client/noexiste@mail.com'
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 404

    