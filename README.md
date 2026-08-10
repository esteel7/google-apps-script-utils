# Google Workspace Utils

Colección de funciones, scripts y fórmulas reutilizables para **Google Workspace**.

Este repositorio reúne utilidades para automatizar tareas, procesar y validar datos, realizar búsquedas y facilitar el trabajo con herramientas como Google Sheets, Gmail, Google Drive y otros servicios de Google Workspace.

## 📁 Estructura del repositorio

```text
google-workspace-utils/
│
├── README.md
├── LICENSE
│
├── sheets/
│   └── normalizar-rut.gs
│
├── formulas/
│   ├── indice-coincidir.md
│   └── query-importrange.md
│
├── docs/
│   └── normalizar-rut.md
│
├── gmail/
│
└── drive/
```

## 🧰 Utilidades disponibles

### Google Sheets — Apps Script

| Función | Descripción | Documentación |
|---|---|---|
| [`NORMALIZAR_RUT()`](sheets/normalizar-rut.gs) | Normaliza y valida RUT chilenos mediante módulo 11 | [Ver documentación](docs/normalizar-rut.md) |

### Google Sheets — Fórmulas

| Fórmula | Descripción | Documentación |
|---|---|---|
| `INDICE + COINCIDIR` | Busca y recupera información utilizando un identificador único | [Ver documentación](formulas/indice-coincidir.md) |
| `QUERY + IMPORTRANGE` | Importa, selecciona, filtra y ordena datos procedentes de otra hoja de cálculo | [Ver documentación](formulas/query-importrange.md) |

### Gmail

*Próximamente.*

### Google Drive

*Próximamente.*

## 🚀 Uso

### Funciones de Apps Script

Para utilizar una función personalizada en Google Sheets:

1. Abre la hoja de cálculo.
2. Ve a **Extensiones → Apps Script**.
3. Abre en este repositorio el archivo `.gs` correspondiente.
4. Copia el código.
5. Pégalo en el editor de Apps Script.
6. Guarda el proyecto.
7. Utiliza la función desde Google Sheets según su documentación.

Por ejemplo:

```excel
=NORMALIZAR_RUT(A2)
```

### Fórmulas

Las fórmulas documentadas en este repositorio pueden utilizarse directamente en Google Sheets.

Cada documento incluye:

- Sintaxis general.
- Explicación de sus componentes.
- Ejemplos de uso.
- Variaciones frecuentes.
- Consideraciones y buenas prácticas.

Los ejemplos utilizan nombres, identificadores y referencias genéricas para facilitar su adaptación a distintas hojas de cálculo.

## 🗂️ Organización

El repositorio diferencia entre distintos tipos de recursos:

- **`sheets/`** — Código fuente de funciones y scripts para Google Sheets.
- **`formulas/`** — Fórmulas y patrones reutilizables de Google Sheets.
- **`docs/`** — Documentación detallada de las funciones y scripts.
- **`gmail/`** — Utilidades relacionadas con Gmail.
- **`drive/`** — Utilidades relacionadas con Google Drive.

Esta estructura permite mantener separado el código fuente de su documentación y facilita la incorporación de nuevas utilidades.

## 🤝 Contribuciones

Las sugerencias, mejoras y correcciones son bienvenidas.

Puedes abrir un **Issue** para reportar un problema o proponer una mejora, o enviar un **Pull Request** con cambios al código o la documentación.

## 📄 Licencia

Este proyecto se distribuye bajo la **MIT License**.

Consulta el archivo [`LICENSE`](LICENSE) para conocer los términos de uso, modificación y distribución.
