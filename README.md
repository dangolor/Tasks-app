# Task App

Este proyecto es una aplicación de gestión de tareas compuesta por:

- **Backend:** Django (API)
- **Frontend:** React con Vite  
- **Ejecución:** Contenedores Docker

---

## ✅ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Docker**
- **Docker Compose**
- Haber descargado o clonado **todo el proyecto completo**, incluyendo:
  - Código fuente
  - Archivo de base de datos `db.sqlite3` usada como ejemplo

---

## 🚀 Instalación y primera ejecución

### Paso 1 — Construir y levantar la aplicación

Desde la raíz del proyecto, ejecuta:

```bash
docker compose up --build
```

Una vez que Docker termine de iniciar:

Frontend (interfaz de usuario):
http://localhost:5173

Backend (API de Django):
http://localhost:8000

superusuario:
usuario: admin pass: admin

usuario demo:
usuario: pruebas pass: pruebas
