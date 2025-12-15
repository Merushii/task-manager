# Task Manager – Guía paso a paso

## Ejercicio 1:
Desarrolla una API RESTful sencilla que permita crear, leer, actualizar y eliminar (CRUD) registros de "Tareas" (tasks). Cada tarea debe tener un id, titulo, descripcion y estado.
Implementa validación de datos utilizando middleware.



## ¿Qué hace esta aplicación?

Descripción del Proyecto:

Desarrolla una aplicación web llamada "Task Manager" que permita a los usuarios gestionar sus tareas diarias. La aplicación debe incluir las siguientes características:
Frontend
Interfaz de Usuario:

Página de inicio que muestre una lista de tareas.
Formulario para agregar nuevas tareas con campos de titulo y descripcion.
Opciones para editar y eliminar tareas existentes.
Filtro para mostrar tareas por estado (Pendiente, En Progreso, Completada).

Estado de la Aplicación:

Utiliza Redux para manejar el estado global de las tareas.
Implementa acciones para agregar, actualizar y eliminar tareas.
Backend

API:

Endpoints para gestionar tareas (CRUD).
Autenticación de usuarios para proteger las rutas de la API.


Con **Task Manager** puedes:

* Crear tareas con título y descripción
* Cambiar el estado de cada tarea:

  * Pendiente
  * En Proceso
  * Completada
* Filtrar las tareas por estado
* Eliminar tareas

Toda la información se maneja mediante una API y estado global con Redux.

## Tecnologías utilizadas

### Frontend

* React
* Redux Toolkit
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express
* Middleware de validación
* Base de datos en memoria 

## Paso 1: Descargar el proyecto

1. Descarga el proyecto como archivo **ZIP** desde el repositorio.
2. Descomprime el archivo.
3. Abre la carpeta del proyecto en tu editor de código (por ejemplo, Visual Studio Code).

## Paso 2: Ejecutar el Backend

1. Abre una terminal dentro de la carpeta del proyecto.
2. Entra a la carpeta del backend:

```bash
cd backend
```

3. Instala las dependencias:

```bash
npm install
```

4. Inicia el servidor:

```bash
node app.js
```

Si todo está correcto, verás el mensaje:

```
Server started on port 3000
```

El backend quedará ejecutándose en:

```
http://localhost:3000
```

---

## Paso 3: Ejecutar el Frontend

1. Abre **otra terminal**.
2. Entra a la carpeta del frontend:

```bash
cd frontend
```

3. Instala las dependencias:

```bash
npm install
```

4. Ejecuta la aplicación:

```bash
npm run dev
```

5. Abre el navegador y entra a:

```
http://localhost:5173
```

---

## Cómo usar la aplicación

1. Escribe un título y una descripción.
2. Presiona **Agregar tarea**.
3. La tarea aparecerá con estado **Pendiente**.
4. Usa los botones para cambiar su estado.
5. Filtra las tareas usando el selector superior.
6. Elimina una tarea cuando ya no sea necesaria.

## Autora

**Mercedes Flores Moreno**
