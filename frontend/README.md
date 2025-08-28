# Frontend (Angular)

Sistema de gestión de mantenimiento para INACIF desarrollado con Angular, integrando autenticación vía Keycloak y comunicación con el backend Jakarta EE.

## Características

- ✅ Angular 20 con TypeScript
- ✅ Autenticación e integración con Keycloak
- ✅ Dashboard con navegación lateral dinámica basada en roles
- ✅ Guards de autenticación y autorización por roles
- ✅ Integración con API backend `/api/v1/health`
- ✅ Diseño responsive con SCSS
- ✅ Tests unitarios con Jasmine/Karma

## Roles de Usuario

- **ADMIN**: Acceso completo a contratos, reportes y administración
- **TECNICO**: Acceso a equipos, mantenimientos, tickets y alertas
- **PROVEEDOR**: Acceso a tickets relacionados con sus servicios
- **CONSULTA**: Acceso de solo lectura a reportes

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── guards/       # Guards de autenticación y roles
│   │   └── services/     # Servicios de autenticación y API
│   ├── features/
│   │   ├── dashboard/    # Componente principal del dashboard
│   │   ├── login/        # Página de inicio de sesión
│   │   └── unauthorized/ # Página de acceso denegado
│   ├── shared/
│   │   └── components/   # Componentes reutilizables (navbar, sidebar)
│   └── environments/     # Configuraciones de entorno
```

## Desarrollo Local

### Prerequisitos

- Node.js 20+
- npm 10+
- Angular CLI

### Instalación y Configuración

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno en src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8081/api/v1',
  keycloak: { 
    url: 'http://localhost:8080', 
    realm: 'INACIF', 
    clientId: 'inacif-ui' 
  }
};
```

### Comandos de Desarrollo

```bash
# Servir en modo desarrollo (puerto 4200)
npm start
# o
ng serve

# Ejecutar tests unitarios
npm test

# Construir para producción
npm run build

# Ejecutar linter
ng lint
```

## Docker

### Desarrollo
```bash
# Construir imagen
docker build -t inacif-frontend .

# Ejecutar contenedor
docker run -p 8082:80 inacif-frontend
```

### Producción con Docker Compose
```bash
# Desde la raíz del proyecto
docker compose up
```

El frontend estará disponible en `http://localhost:8082`

## Configuración de Nginx

El archivo `nginx.conf` configura:
- Servir archivos estáticos de Angular
- Proxy reverso al backend (`/api/` → `http://backend:8080/api/`)
- Fallback a `index.html` para rutas de Angular

## Autenticación con Keycloak

### Configuración del Realm

El proyecto está configurado para usar:
- **Realm**: `INACIF`
- **Cliente**: `inacif-ui` (público)
- **URL**: `http://localhost:8080` (desarrollo)

### Flujo de Autenticación

1. Usuario accede a una ruta protegida
2. Si no está autenticado, se redirige a Keycloak
3. Tras autenticación exitosa, vuelve a la aplicación
4. Los guards verifican roles según la ruta

## API Integration

### Health Check

El dashboard consume el endpoint `/api/v1/health` del backend para mostrar:
- Estado del servicio (UP/DOWN)
- Información del servicio

### Configuración CORS

Asegurar que el backend permite requests desde:
- `http://localhost:4200` (desarrollo)
- `http://localhost:8082` (Docker)

## Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Cobertura de código
npm run test:coverage
```

### Tests Incluidos

- ✅ Componente principal (AppComponent)
- ✅ Servicio de autenticación (AuthService)
- ✅ Tests de integración básicos

## Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## Troubleshooting

### Problemas Comunes

**Error de CORS**: Verificar configuración del backend para permitir origen del frontend
**Keycloak no conecta**: Verificar URL de Keycloak en environment.ts
**Build falla**: Verificar versiones de Node.js y Angular CLI

### Logs

- Frontend (desarrollo): Consola del navegador
- Frontend (Docker): `docker logs <container-id>`
- Nginx: `/var/log/nginx/` dentro del contenedor

## Arquitectura

```
┌─────────────────┐    ┌──────────────────┐    ┌────────────────┐
│   Frontend      │    │    Keycloak      │    │    Backend     │
│   (Angular)     │◄──►│  (Autenticación) │    │   (Jakarta EE) │
│   Port: 8082    │    │   Port: 8080     │    │   Port: 8081   │
└─────────────────┘    └──────────────────┘    └────────────────┘
         │                                              ▲
         └──────────────────────────────────────────────┘
                        API Calls (/api/v1/*)
```
