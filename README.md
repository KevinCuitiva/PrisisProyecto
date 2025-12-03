# Mercurio Connect - Plataforma B2B

Plataforma de gestión empresarial B2B que conecta distribuidores, proveedores y administradores en un ecosistema completo de comercio.

## 🚀 Descripción

**Mercurio Connect** es una solución integral que permite:

- **Administradores (Mercurio)**: Gestión completa de tiendas, distribuidores, inventario global y seguimiento de pedidos
- **Proveedores (Mercados)**: Catálogo de productos, gestión de carrito, realización de pedidos y solicitudes especiales
- **Distribuidores**: Procesamiento de pedidos con flujo completo (recibido → preparando → listo → en ruta → entregado)

## 📋 Requisitos Previos

- **Node.js** v18 o superior
- **pnpm** (gestor de paquetes)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/KevinCuitiva/PrisisProyecto.git
cd PrisisProyecto
```

2. **Instalar dependencias**
```bash
pnpm install
```

## ▶️ Ejecución

### Modo Desarrollo
```bash
pnpm dev
```

La aplicación estará disponible en: `http://localhost:5173`

### Modo Producción
```bash
# Compilar para producción
pnpm build

# Previsualizar build de producción
pnpm preview
```

## 👤 Usuarios de Prueba

La aplicación incluye 3 usuarios de prueba:

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `mercurio` | `admin123` | Administrador |
| `mercados` | `proveedor123` | Proveedor/Tienda |
| `distribuidores` | `distribuidor123` | Distribuidor |

## 📦 Estructura del Proyecto

```
PrisisProyecto/
├── public/
│   ├── products/           # Imágenes de productos
│   └── horizon-logo.svg    # Logo de la aplicación
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Catalog.jsx
│   │   ├── Cart.jsx
│   │   └── OrderTracking.jsx
│   ├── context/           # Context API
│   │   ├── AuthContext.jsx
│   │   ├── ProductContext.jsx
│   │   ├── CartContext.jsx
│   │   └── OrderContext.jsx
│   ├── pages/             # Páginas principales
│   │   ├── login/
│   │   ├── mercadoMercurio/    # Panel Admin
│   │   ├── mercados/           # Dashboard Proveedor
│   │   └── distribuidores/     # Dashboard Distribuidor
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## 🎨 Tecnologías Utilizadas

- **React 19.2.0** - Framework UI
- **Vite 7.2.5** (rolldown-vite) - Build tool
- **Tailwind CSS 4.1.17** - Framework CSS
- **Context API** - Gestión de estado
- **pnpm** - Gestor de paquetes

## ✨ Características Principales

### Panel Administrador (Mercurio)
- Dashboard con estadísticas globales
- Gestión de tiendas y distribuidores
- Seguimiento de todos los pedidos
- Inventario global de productos
- Alertas de stock bajo

### Dashboard Proveedor (Mercados)
- Catálogo completo de productos con filtros
- Carrito de compras inteligente
- Gestión de pedidos realizados
- Solicitud de productos al distribuidor
- Filtro de ventas mensuales

### Dashboard Distribuidor
- Gestión de pedidos por estados:
  - **Nuevos Pedidos** → Aceptar y preparar
  - **En Preparación** → Marcar como listo
  - **Listos para Envío** → Despachar
  - **En Ruta** → Marcar como entregado
- Catálogo de productos disponibles
- Estadísticas en tiempo real

## 📄 Scripts Disponibles

```bash
pnpm dev          # Inicia servidor de desarrollo
pnpm build        # Compila para producción
pnpm preview      # Previsualizar build de producción
pnpm lint         # Ejecuta ESLint
```

## 🔗 Recursos Adicionales

### MCP Hero UI
Para componentes UI adicionales y herramientas de desarrollo:
- **Repositorio**: [heroui-mcp](https://github.com/T-hash06/heroui-mcp)
- **Descripción**: Model Context Protocol para Hero UI components


