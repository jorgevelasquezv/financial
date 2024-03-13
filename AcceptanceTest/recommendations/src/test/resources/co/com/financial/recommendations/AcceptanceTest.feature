@acceptanceTest
Feature: Acceptance testing scenarios for Product microservice

    Background:
    * url urlBase
    * configure headers = headers
    * def ValidatorTestUtils = Java.type('co.com.financial.utils.ValidatorTestUtils')
    * ValidatorTestUtils.setContentType('application/json');
    * def requestRecommendation = read('requestRecommendation.json')
    * def result = callonce read('login.feature')
    * def responseAuthLogin = result.response
    * def token = responseAuthLogin.token

    Scenario Outline: Dado que un usuario comercial requiere obtener el listado de los clientes que se ajustan a las condiciones del servicio para el producto <Product> Cuando se realiza la solicitud al sistema de recomendaciones Entonces el sistema restorna una respuesta exitosa con el listado de clientes
    # * def pathProduct = '/recommendation/' + <Product>
    Given path '/recommendation/' + <Product>
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 200
    Examples:
    | Product   |
    | "P001"    |
    | "P002"    |
    | "P003"    |
    | "P004"    |
    | "P005"    |
    | "P006"    |

    Scenario: Dado que un usuario comercial requiere obtener el listado de los clientes que se ajustan a las condiciones del servicio para un producto Cuando se realiza la solicitud al sistema de recomendaciones con un producto que no existe Entonces el sistema restorna una exepcion indicando que el producto no existe 
    Given path '/recommendation/noexiste'
    And set headers.Authorization = 'Bearer ' + token
    When method GET
    Then status 404
    
    Scenario: Dado que un usuario comercial requiere obtener listado de productos que por sus condiciones de servicio se ajustan a un cliente Cuando se realiza la solicitud al sistema de recommendaciones Entonces el sistema restorna una respuesta satisfactoria con el listado de productos asociados
    Given path '/recommendation'
    And request requestRecommendation
    And set headers.Authorization = 'Bearer ' + token
    When method POST
    Then status 200

    Scenario: Dado que un usuario comercial requiere obtener listado de productos que por sus condiciones de servicio se ajustan a un cliente Cuando se realiza la solicitud al sistema de recommendaciones con un cliente que no existe Entonces el sistema restorna una respuesta satisfactoria con el listado de productos asociados
    Given path '/recommendation'
    And set requestRecommendation.email = 'noexiste@mail.com'
    And request requestRecommendation
    And set headers.Authorization = 'Bearer ' + token
    When method POST
    Then status 404

    