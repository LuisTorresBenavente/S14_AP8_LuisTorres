# 🏋️ FitLife - Plataforma de Control Fitness

¡Bienvenido a **FitLife**! Esta es una aplicación web moderna desarrollada en **Angular** diseñada para ayudar a los entusiastas del fitness a explorar planes de entrenamiento, consultar rutinas personalizadas, ponerse en contacto con entrenadores y permitir el acceso de encargados para administrar la información de los usuarios inscritos.

El proyecto ha sido preparado para compilar de forma limpia y desplegarse automáticamente en la nube utilizando **Render** como plataforma de hospedaje estático y **GitHub** como repositorio de código.

---

## 👨‍💻 Datos del Estudiante
* **Nombre Completo:** Luis Torres Benavente
* **Institución:** Valle Grande
* **Repositorio de Código:** [GitHub - S14_AP8_LuisTorres](https://github.com/LuisTorresBenavente/S14_AP8_LuisTorres)

---

## 🌟 Características Principales

La aplicación cuenta con una estructura bien organizada y contiene las siguientes páginas y funcionalidades:

1. **Página de Inicio (Home):**
   * Vista de bienvenida e información motivadora.
   * Enlaces directos a las secciones de la web.
   * Diseño responsive e intuitivo.
2. **Rutinas de Entrenamiento:**
   * Listado de rutinas personalizadas clasificadas por nivel (Principiante, Intermedio, Avanzado).
   * Detalle de ejercicios, series, repeticiones y tiempo de descanso para cada rutina.
   * Filtro interactivo por categorías.
3. **Planes de Membresía (Precios):**
   * Tarjetas informativas de planes de suscripción (Plan Básico, Plan Premium Star, Plan Élite VIP).
   * Formulario modal integrado para inscribirse a un plan seleccionado de manera sencilla.
4. **Formulario de Contacto:**
   * Formulario con validaciones para el envío de consultas de los usuarios.
   * Guardado seguro de mensajes en `localStorage`.
5. **Panel del Encargado (Zona Protegida):**
   * Protegido mediante un guard de autenticación (`authGuard`).
   * Visualización del listado de clientes inscritos a planes y de mensajes de contacto recibidos.
6. **Autenticación (Login):**
   * Acceso para encargados con credenciales simuladas.
   * **Credenciales de Acceso:**
     * **Usuario (Email):** `admin@miapp.com`
     * **Contraseña:** `123456`

---

## 🛠️ Tecnologías y Características Técnicas

* **Framework Core:** Angular 19+
* **Routing:** Enrutamiento modular por componentes con carga diferida (lazy loading).
* **Formularios:** Implementación avanzada de Formularios Reactivos de Angular con validaciones personalizadas.
* **Seguridad:** Guard de autenticación (`CanActivate`) para proteger las vistas de administración.
* **Persistencia:** Simulación de base de datos local utilizando `localStorage` en servicios reutilizables de Angular.
* **Estilos:** Diseño personalizado con Vanilla CSS enfocado en la usabilidad y diseño responsivo.

---

## 🚀 Instalación y Ejecución Local

Para probar el proyecto en tu entorno local, sigue los pasos a continuación:

### Prerrequisitos
Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior recomendada).

### 1. Clonar el repositorio
```bash
git clone https://github.com/LuisTorresBenavente/S14_AP8_LuisTorres.git
cd Fitness
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Servidor de desarrollo
Para iniciar el servidor de desarrollo local, ejecuta:
```bash
npm start
```
Abre tu navegador y navega a [http://localhost:4200](http://localhost:4200). La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

### 4. Compilación de producción
Para generar la versión de producción (build optimizado):
```bash
npm run build
```
Esto creará el compilado optimizado en el directorio `dist/frontend-base/browser`.

---

## 🌐 Despliegue en Render

El proyecto está configurado para desplegarse de manera continua y sin contratiempos utilizando el archivo de configuración **`render.yaml`** ubicado en la raíz.

### Configuración de Render:
* **Tipo de Servicio:** Sitio Estático (Static Site)
* **Comando de Construcción:** `npm run build`
* **Directorio de Publicación:** `dist/frontend-base/browser`
* **Enrutamiento SPA:** Se reescriben todas las peticiones a `index.html` para evitar errores 404 en las rutas internas de Angular.
