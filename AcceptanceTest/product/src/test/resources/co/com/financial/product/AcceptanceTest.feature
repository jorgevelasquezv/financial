@acceptanceTest
Feature: Acceptance testing scenarios for Product microservice

    Background:
    * url urlBase
    * configure headers = headers
    * def ValidatorTestUtils = Java.type('co.com.financial.utils.ValidatorTestUtils')
    * ValidatorTestUtils.setContentType('application/json');
    * def requestAuthLogin = read('requestAuthLogin.json')
    * def requestCreateProduct = read('requestCreateProduct.json')
    * def requestUpdateProduct = read('requestUpdateProduct.json')
    * def result = callonce read('login.feature')
    * def responseAuthLogin = result.response
    * def token = responseAuthLogin.token

    Scenario: Dado que un usuario administardor requiere crear un producto Cuando se ingresan la informacion correctamente del nuevo producto Entonces el sistema retorna una respuesta exitosa
    Given path '/product'
    And set requestCreateProduct.code = 'P' + Math.floor(Math.random() * 90 + 10)
    And request requestCreateProduct
    And set headers.Authorization = 'Bearer ' + token
    When method POST
    Then status 201

    Scenario: Dado que un usuario administardor requiere crear un producto Cuando se ingresan la informacion incorrecta de los campos para el nuevo producto Entonces el sistema retorna una exepcion por cuerpo de peticion invalido 
    Given path '/product'
    And set requestCreateProduct.name = 456666
    And request requestCreateProduct
    And set headers.Authorization = 'Bearer ' + token
    When method POST
    Then status 400

    Scenario: Dado que un usuario administrador requiere actualizar un producto Cuando se ingresa la información correcta del los campos del productoa a actualizar Entonces el sistema retorna una respuesta exitosa
    Given path '/product/P007'
    And request requestUpdateProduct
    And set headers.Authorization = 'Bearer ' + token
    When method PUT
    Then status 200

    Scenario: Dado que un usuario administrador requiere actualizar un producto Cuando se ingresa la información incorrecta del los campos del productoa a actualizar Entonces el sistema retorna una exepcion por cuerpo de la peticion invalido
    Given path '/product/P006'
    And set requestUpdateProduct.name = 456666
    And request requestUpdateProduct
    And set headers.Authorization = 'Bearer ' + token
    When method PUT
    Then status 400

    Scenario: Dado que un usuario administrador requiere pasar a inactivo un producto Cuando se realiza solicitud al sitema de productos Entonces el sistema retorna una respuesta exitosa con la informacion del producto inactivo
    Given path '/product/P007'
    And set headers.Authorization = 'Bearer ' + token
    When method DELETE
    Then status 204

    Scenario: Dado que un usuario comercial desea conocer el listado de productos inactivos Cuando se realiza una consulta al sistema de productos por listado Entonces el sistema retorna una respuesta exitosa con el listado de productos inactivos
    Given path '/product'
    And param isActive = 'false'
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 200

    Scenario: Dado que un usuario comercial desea conocer el detalle de un producto Cuando se realiza una consulta al sistema de productos por codigo de producto Entonces el sistema retorna una respuesta exitosa con el detalle del producto solicitado
    Given path '/product/P001'
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 200
    
    Scenario: Dado que un usuario comercial desea conocer el detalle de un producto Cuando se realiza una consulta al sistema de productos por codigo de producto y el codigo no existe Entonces el sistema retorna una exepcion indidando que el producto no fue encontrado
    Given path '/product/P999'
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 404

