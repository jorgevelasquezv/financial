## **Análisis y propuesta de arquitectura para el ecosistema financiero**

### **Introducción:**

El presente documento describe un análisis y una propuesta de arquitectura para un ecosistema financiero en crecimiento, con el objetivo de crear una solución óptima para la gestión de clientes, productos y servicios financieros.

### **Análisis:**

#### **Productos financieros:**

-   Cuentas de ahorro
-   Tarjetas débito y crédito
-   Seguros
-   Inversiones
-   Giros

#### **Clientes:**

-   Registro con email, nombre completo y clave de acceso.
-   Los comerciales financieros pueden ingresar información de perfil como ingresos, ciudad y edad.

#### **Funcionamiento del sistema:**

-   Se ofrece a los clientes una lista de productos que se ajustan a sus condiciones.
-   El sistema determina el servicio más adecuado y genera recomendaciones.

#### **Propuesta de arquitectura:**

Se propone una arquitectura basada en microservicios para solucionar los problemas y optimizar el sistema.

#### **Componentes principales:**

**Microservicios:**

-   **Servicio de Clientes:** Gestiona el registro, la información y el perfil de los clientes.
-   **Servicio de Productos:** Almacena y administra la información de los productos financieros.
-   **Servicio de Recomendaciones:** Analiza el perfil del cliente y recomienda productos adecuados.
-   **Servicio de Authorization:** Gestiona el acceso por usuario y roles de forma segura a los demás microservicios.

**Bases de datos:**

-   **Usuarios:** Almacena nombre completo, email, contraseña y roles.
-   **Productos:** Almacena la información de productos (código, descripción, países, edad mínima, valor mínimo de ingresos y estado).
-   **Clientes:** Almacena la información de los clientes (email, nombre completo, clave de acceso, fecha de cumpleaños, ingresos, ciudad, país y estado).

**Ventajas de la arquitectura propuesta:**

-   **Escalabilidad:** Los microservicios son independientes y escalables, lo que permite un crecimiento flexible del sistema.
-   **Seguridad:** El servicio de Authorization implementa el acceso por usuarios y roles de forma segura para proteger la información de los clientes.
-   **Flexibilidad:** La arquitectura permite la integración de nuevos productos, servicios y funcionalidades de forma sencilla.
-   **Mantenimiento:** Los microservicios independientes facilitan el mantenimiento y la actualización del sistema.

**Tecnologías:**

-   **Docker:** Para la contenerización de los microservicios.
-   **Kubernetes:** Para la orquestación de los microservicios.
-   **NestJS:** Para el desarrollo de los microservicios.
-   **Base de datos SQL:** Para el almacenamiento de datos.

**Conclusión:**

La arquitectura propuesta ofrece una solución escalable, segura y flexible para el ecosistema financiero descrito. La implementación de esta arquitectura permitirá a la startup crecer y ofrecer una mejor experiencia a sus clientes.

**Recomendaciones:**

-   Implementar un proceso de desarrollo ágil para el desarrollo e implementación de los microservicios.
-   Monitorizar el rendimiento y la seguridad del sistema de forma constante.
-   Implementar prácticas de DevOps para la integración y entrega continua del software.

**Detalle del funcionamiento de cada microservicio:**

**Microservicio de Clientes:**

**Funcionalidades:**

-   Registrar nuevos clientes.
-   Gestionar la información de los clientes (nombre, clave, etc.).
-   Almacenar el perfil del cliente (ingresos, ciudad, edad).
-   Validar la información del cliente.
-   Actualizar la información del cliente.

**Comunicación:**

-   Recibe información del frontend para registrar o actualizar nuevos clientes.
-   Se comunica con el microservicio de Authorization para validar el token.

**Tecnologías:**

-   NestJS
-   Base de datos SQL (postgres)

**Microservicio de Productos:**

**Funcionalidades:**

-   Almacenar la información de los productos financieros (código, descripción, requisitos).
-   Gestionar los diferentes tipos de productos (cuentas, tarjetas, seguros, etc.).
-   Actualizar la información de los productos.

**Comunicación:**

-   Envía información al servicio de recomendaciones para el análisis de los productos.
-   Se comunica con el microservicio de Authorization para validar el token.

**Tecnologías:**

-   Spring Boot
-   Base de datos SQL (postgres)

**Microservicio de Recomendaciones:**

**Funcionalidades:**

-   Analizar el perfil del cliente (ingresos, ciudad, edad).
-   Recomendar los productos financieros más adecuados al perfil del cliente.
-   Generar un informe con las recomendaciones.

**Comunicación:**

-   Recibe información del cliente desde el front para el análisis de recomendaciones.
-   Consulta la base de

### **Monitoreo**

-   Se implementa prometheus como servicio en cada microservicio
-   Se adopta grafana para optener datos de monitoreo a traves de prometheus

### **Próximos pasos:**

-   Integracion de terceros para validación de correos de clientes
-   Integracion de Machine Learning para mejorar el servicio de recomendaciones

## Despliegue de la solucion en kubernetes

1. Se requiere contar con una instalacion de `docker`
2. Se requiere contar con una instalacion de un `cluster de kubernetes`, para prueba se puede usar `minikube`
3. Contar con `kubectl` instalado para el manejo del cluster
4. Iniciar cluster de minikube con el comando `minikube start`
5. Desplegar la solucion mediante el archivo `financial-deployment.yml` que se encuentra en la ruta `deployment/k8s` ejecutando el comando `kubectl apply -f financial-deployment.yml`
6. Validar que todos los pods correspondiente a los servicios y bases de datos esten desplegados ejecunatdo el comando `kubectl get pods`
7. Exponer puertos de los service ejecutando los comandos
    ```
     kubectl port-forward services/auth-service --address 0.0.0.0 3000:3000
     kubectl port-forward services/client-service --address 0.0.0.0 3001:3001
     kubectl port-forward services/product-service --address 0.0.0.0 3002:3002
     kubectl port-forward services/recommendation-service --address 0.0.0.0 3003:3003
     kubectl port-forward services/grafana-service --address 0.0.0.0 3333:3000
     kubectl port-forward services/prometheus-service --address 0.0.0.0 9090:9090
    ```
8. Realizar peticion a los metodos SEED de los servicios Auth, Client y Product para iniciar data de prueba en las bases de datos.