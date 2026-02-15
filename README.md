## 🌦️ Weather App - Práctica de Laboratorio 01
Esta es una aplicación web desarrollada con Node.js y Express para la consulta de información climática en tiempo real. El proyecto integra el consumo de APIs externas de geocodificación y clima, manejo de vistas dinámicas con Handlebars (HBS) y persistencia de datos local para el historial de búsquedas.

Desplegado en: [URL de Railway aquí]

## 📌 Planteamiento del Problema
La Facultad de Ingeniería requiere centralizar la información climática de ciudades clave para la comunidad UPAEP (Puebla, Tehuacán, CDMX, Veracruz, Tijuana, etc.) a través de una interfaz web responsiva y accesible.

### Características Principales:
Búsqueda dinámica: Formulario para consultar el clima de cualquier ciudad.

Visualización clara: Presentación de datos meteorológicos de forma atractiva.

Historial de búsquedas: Persistencia de las ciudades consultadas recientemente.

Diseño Responsivo: Interfaz adaptada a dispositivos móviles y escritorio mediante CSS (Media Queries y Layouts flexibles).

Arquitectura MVC: Separación clara entre Modelos, Vistas y Controladores.

## 🛠️ Tecnologías Utilizadas
Entorno de Ejecución: Node.js

Framework Web: Express

Motor de Plantillas: Handlebars (HBS)

Consumo de APIs: Axios

Estilos: CSS3

Despliegue: Railway.app

Control de Versiones: Git & GitHub

## 🏗️ Arquitectura del Proyecto (MVC)
El proyecto sigue el patrón Modelo-Vista-Controlador para asegurar la escalabilidad:

Models: manejo del historial (lectura/escritura de archivos JSON) y peticiones a APIs (Mapbox/OpenWeather).

Views: Plantillas .hbs y parciales reutilizables para la interfaz de usuario.

Controllers: Intermediarios que gestionan las peticiones HTTP y coordinan la respuesta.

## 🚀 Configuración e Instalación
### Requisitos Previos
Node.js instalado (v14 o superior).

Cuenta y API Keys de Mapbox (Geocodificación) y OpenWeather (Clima).

### Pasos a seguir:
Clonar el repositorio:

git clone https://github.com/fabigp/ejercicio1multiplataforma.git

cd ejercicio1multiplataforma

Instalar dependencias:

npm install

Configurar variables de entorno:

Crea un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=3000

MAPBOX_KEY=tu_api_key_de_mapbox

OPENWEATHER_KEY=tu_api_key_de_openweather

Ejecutar la aplicación:

npx nodemon app.js

## 🌐 Despliegue en Railway
La aplicación está configurada para el despliegue continuo:

Se vincula el repositorio de GitHub a Railway.

Se configuran las Variables de Entorno en el panel de Railway (imprescindible para el PORT y las API_KEYS).

## 👥 Autor
Fabiola García Piana

Nota: Este proyecto fue realizado como parte de la Práctica de Laboratorio 01 para el curso de Desarrollo de Aplicaciones Multiplataforma en la UPAEP.

