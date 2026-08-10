# QUERY + IMPORTRANGE

Patrón de fórmula para **Google Sheets** que combina `IMPORTRANGE` y `QUERY` para importar, seleccionar, filtrar y ordenar información procedente de otra hoja de cálculo.

Esta combinación resulta especialmente útil para construir vistas dinámicas a partir de una base de datos central.

## Sintaxis general

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Hoja!A:Z");
  "SELECT Col1, Col2, Col3";
  1
)
```

## Componentes

### IMPORTRANGE

`IMPORTRANGE` importa información desde otra hoja de cálculo de Google Sheets.

```excel
=IMPORTRANGE("URL_PLANILLA"; "Hoja!A:Z")
```

Sus argumentos son:

| Argumento | Descripción |
|---|---|
| `"URL_PLANILLA"` | URL de la hoja de cálculo de origen |
| `"Hoja!A:Z"` | Hoja y rango que se desea importar |

La primera vez que se conecta una hoja de cálculo con otra, Google Sheets solicitará autorización mediante **Permitir acceso**.

### QUERY

`QUERY` permite consultar los datos importados utilizando una sintaxis similar a SQL.

```excel
=QUERY(datos; consulta; encabezados)
```

| Argumento | Descripción |
|---|---|
| `datos` | Rango o matriz que se desea consultar |
| `consulta` | Instrucción que determina qué información se selecciona, filtra u ordena |
| `encabezados` | Número de filas de encabezado presentes en los datos |

## Uso de Col1, Col2, Col3...

Cuando `QUERY` recibe como origen el resultado de `IMPORTRANGE`, las columnas normalmente se identifican como:

```text
Col1
Col2
Col3
Col4
...
```

Por ejemplo:

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:E");
  "SELECT Col1, Col2, Col5";
  1
)
```

devuelve las columnas `A`, `B` y `E` del rango importado.

## Seleccionar columnas

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:Z");
  "SELECT Col1, Col3, Col7";
  1
)
```

## Filtrar registros

Para mostrar solamente las filas donde `Col2` tenga un determinado valor:

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:Z");
  "SELECT Col1, Col2, Col3
   WHERE Col2 = 'ACTIVO'";
  1
)
```

## Excluir valores

Para excluir un valor específico:

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:Z");
  "SELECT Col1, Col2, Col3
   WHERE Col2 <> 'POSTGRADO'";
  1
)
```

También puede utilizarse:

```sql
WHERE Col2 != 'POSTGRADO'
```

## Excluir filas vacías

Un patrón muy habitual es:

```sql
WHERE Col1 != ''
```

Por ejemplo:

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:Z");
  "SELECT Col1, Col2, Col3
   WHERE Col1 != ''";
  1
)
```

## Combinar condiciones

Pueden utilizarse varias condiciones mediante `AND`:

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:Z");
  "SELECT Col1, Col2, Col3
   WHERE Col1 = 'OBLIGATORIA'
   AND Col2 != 'POSTGRADO'
   AND Col2 != ''";
  1
)
```

## Excluir una combinación específica

Es posible excluir una fila solamente cuando se cumplen simultáneamente varias condiciones.

Por ejemplo, excluir la asignatura `ABC123` únicamente cuando corresponde al paralelo `2`:

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:Z");
  "SELECT Col1, Col2, Col3
   WHERE Col1 != ''
   AND NOT (Col2 = 'ABC123' AND Col3 = 2)";
  1
)
```

La expresión:

```sql
NOT (Col2 = 'ABC123' AND Col3 = 2)
```

significa:

> Mostrar todos los registros excepto aquellos donde simultáneamente la asignatura sea `ABC123` y el paralelo sea `2`.

## Ordenar resultados

Para ordenar por una columna:

```sql
ORDER BY Col2
```

Para ordenar utilizando varias columnas:

```sql
ORDER BY Col2, Col3
```

Ejemplo:

```excel
=QUERY(
  IMPORTRANGE("URL_PLANILLA"; "Datos!A:Z");
  "SELECT Col1, Col2, Col3
   WHERE Col1 != ''
   ORDER BY Col2, Col3";
  1
)
```

## Ejemplo completo

```excel
=QUERY(
  IMPORTRANGE(
    "URL_PLANILLA";
    "Carga Sistema!A2:Z400"
  );
  "SELECT Col1, Col2, Col3, Col5
   WHERE Col1 = 'OBLIGATORIA'
   AND Col2 != ''
   AND Col2 != 'POSTGRADO'
   AND NOT (Col3 = 'ABC123' AND Col4 = 2)
   ORDER BY Col2, Col3";
  0
)
```

Esta fórmula:

1. Importa información desde otra hoja de cálculo.
2. Selecciona únicamente determinadas columnas.
3. Conserva los registros de tipo `OBLIGATORIA`.
4. Elimina registros sin información relevante.
5. Excluye los registros de `POSTGRADO`.
6. Excluye una combinación específica de asignatura y paralelo.
7. Ordena los resultados.

## Encabezados

El último argumento de `QUERY` indica cuántas filas del rango corresponden a encabezados.

Por ejemplo:

```excel
=QUERY(...; "..."; 1)
```

indica que la primera fila del rango es un encabezado.

En cambio:

```excel
=QUERY(...; "..."; 0)
```

indica que el rango proporcionado **no contiene filas de encabezado**.

Esto es especialmente importante cuando el rango comienza directamente con datos, por ejemplo:

```text
A2:Z400
```

Si la fila 1 contiene los encabezados y no forma parte del rango importado, normalmente corresponde utilizar:

```text
0
```

## Consideración importante sobre datos manuales

Los resultados generados por `QUERY` son dinámicos.

Si se agregan, eliminan o reordenan registros en la fuente, las filas producidas por `QUERY` pueden cambiar de posición.

Por esta razón, **no es recomendable ingresar información manual en columnas contiguas confiando únicamente en la posición de las filas**.

Por ejemplo:

```text
Datos obtenidos mediante QUERY | Información manual
----------------------------------------------------
Estudiante A                 | Observación A
Estudiante B                 | Observación B
Estudiante C                 | Observación C
```

Si `QUERY` posteriormente cambia el orden de los estudiantes, la información manual puede quedar asociada al registro equivocado.

Cuando sea necesario combinar información dinámica con datos manuales, se recomienda utilizar un **identificador único y estable**, como un RUT o ID, y recuperar la información mediante funciones de búsqueda.

Una alternativa es utilizar:

[`INDEX + MATCH`](index-match.md)

## Seguridad y privacidad

Si esta fórmula se documenta o comparte públicamente, evita publicar:

- URLs reales de hojas de cálculo institucionales.
- Identificadores privados de documentos.
- RUT u otros datos personales.
- Nombres o correos de estudiantes.
- Información institucional confidencial.

Utiliza valores genéricos como:

```text
URL_PLANILLA
ABC123
Estudiante A
```

## Licencia

Esta documentación forma parte de **Google Apps Script Utils** y se distribuye bajo la [MIT License](../LICENSE).
