## Chess Tournament Manager

Una aplicación full-stack para crear y gestionar torneos de ajedrez.  
Backend en Django + Django REST Framework; frontend en Next.js. Usa PostgreSQL como base de datos y JWT para la autenticación.

---

## Tabla de Contenidos

1. [Características](#características)  
2. [Tecnologías](#tecnologías)  
3. [Primeros Pasos](#primeros-pasos)  
   - [Requisitos Previos](#requisitos-previos)  
   - [Configuración del Backend](#configuración-del-backend)  
   - [Configuración del Frontend](#configuración-del-frontend)  
4. [Variables de Entorno](#variables-de-entorno)  
5. [Endpoints de la API](#endpoints-de-la-api)  
6. [Estructura del Proyecto](#estructura-del-proyecto)  
7. [Uso](#uso)  
8. [Protótipo / Capturas](#protótipo--capturas)  
9. [Licencia](#licencia)  

---

## Características

- **Página principal**  
  - Lista torneos pendientes o en curso  
  - Filtro por estado: pendiente, en curso, finalizado  

- **Detalle de torneo**  
  - Muestra nombre, descripción, fecha/hora, modo y premio   

- **Gestión de torneos**  
  - Crear nuevos torneos  
  - Editar y eliminar torneos existentes  

- **Autenticación**  
  - Registro e inicio de sesión con JWT  
  - Rutas protegidas  

---

## Tecnologías

- **Backend**  
  - Python 3.x, Django 5.x, Django REST Framework  
  - JWT (djangorestframework-simplejwt)  
  - PostgreSQL  

- **Frontend**  
  - Next.js 13 (App Router) 
  - CSS

- **Herramientas**  
  - `psycopg2` para PostgreSQL  
  - `django-filter` para filtros en la API  
  - `django-cors-headers` para CORS  

---

## Primeros Pasos

### Requisitos Previos

- [Node.js ≥ 16](https://nodejs.org/)  
- [Python ≥ 3.10](https://www.python.org/)  
- PostgreSQL  

### Pasos para comenzar
- Creamos una carpeta para colocar el proyecto
- dentro de esta carpeta vamos a crear un entorno virtual para Django
    ```
    python -m venv .venv
    source .venv/bin/activate   # macOS/Linux
    .venv\Scripts\activate      # Windows 

    ```

### Configuración del Backend

1. Clona el repositorio y entra a la carpeta `backend`:
   ```
   git clone <URL-del-repo>
   cd challenge-ajedrez
   cd backend
   ```

2. instalamos las dependencias:
    ```
    pip install -r requirements.txt
    ```

3. Crea un archivo .env junto a manage.py:
    ```
    DB_DATABASE=chess_challenge
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_PORT=5432
    DB_HOST=localhost

    DEBUG=True
    SECRET_KEY='tu_secreto_django'
    ALLOWED_HOSTS = '*'
    ```

4. Ejecuta migraciones y crea superusuario:
    ```
    python manage.py migrate
    python manage.py createsuperuser
    ```

5. Inicia el servidor:
    ```
    python manage.py runserver

    ```
    La API quedará en http://127.0.0.1:8000/ (aca puede variar el puerto)


### Configuración del Frontend

1. En otro terminal, ve a la carpeta `frontend`:
   ```
   cd frontend
   ```

2. instalamos las dependencias:
    ```
    npm install
    # o
    yarn
    ```

3. Crea un archivo .env en la raíz del frontend:
    ```
    NEXT_PUBLIC_API_URL=<url del backend, ej.: http://127.0.0.1:8000 >
    ```

4. Ejecuta el servidor de desarrollo:
    ```
    npm run dev
    # o
    yarn dev
    ```
    La app estará en http://localhost:3000/.


### Endpoints de la API

|Método |	Ruta |	Descripción
| ---   |   --- |   ---|
|POST	| /api/register/	| Registro de usuario
|POST	| /api/login/	| Obtención de tokens JWT
|POST	| /api/token/refresh/	| Refrescar token accesible
|POST	| /api/token/blacklist/	| Inhabilitar token de refresco
|GET	| /api/tournaments/	| Listar y filtrar torneos
|POST	| /api/tournaments/	| Crear torneo
|GET	| /api/tournaments/{id}/	| Ver detalle de un torneo
|PUT	| /api/tournaments/{id}/	| Actualizar torneo
|DELETE	| /api/tournaments/{id}/	| Eliminar torneo



### Estructura del Proyecto
```
├── api/               # Django app
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
├── backend/           # Proyecto Django
│   ├── settings.py
│   └── urls.py
|
└── frontend/
|    ├── src
|    |  └── app/               # Next.js App Router
|    |      ├── layout.js
|    |      ├── page.js        # Landing Page
|    |      |── tournaments/
|    |      |    ├── page.js    # Listado y filtro
|    |      |    └── [id]/page.js # Detalle de torneo
|    |      |
|    |      |── login/
|    |      |── register/
|    |      |── components/        # Componentes React
|    |      |
|    |      └── middleware.js
|    |        
|    ├── utils/             # Helpers (p. ej. fetchWithAuth)
|    ├── public/            # Archivos estáticos e imágenes
|    ├── .env               # crear este archivo
|    └── package.json
|
|
├── manage.py
├── requirements.txt
└── .env        # crear este archivo

```

### Uso

Regístrate o inicia sesión.

Explora la página principal (/) para ver torneos activos.

Filtra por estado (pendientes, en curso).

Haz clic en un torneo para ver detalle e inscribirte.

Crea nuevos torneos desde la vista “Crear”.

Cierra sesión desde la navbar.