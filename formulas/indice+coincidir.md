# Búsqueda con INDICE + COINCIDIR

Patrón de fórmula para **Google Sheets** que permite buscar un valor en una tabla y devolver información asociada utilizando las funciones `INDICE` y `COINCIDIR`.

Es especialmente útil para cruzar información entre distintas hojas utilizando un identificador único, como un RUT.

## Sintaxis general

```excel
=INDICE(rango_resultado; COINCIDIR(valor_buscado; rango_busqueda; 0))
```

## Componentes

| Componente | Descripción |
|---|---|
| `rango_resultado` | Columna desde la cual se desea obtener el resultado |
| `valor_buscado` | Valor utilizado como identificador para realizar la búsqueda |
| `rango_busqueda` | Columna donde se buscará el identificador |
| `0` | Indica que `COINCIDIR` debe buscar una coincidencia exacta |

## Ejemplo

Supongamos que tenemos una hoja llamada `Estudiantes`:

| A | B | C |
|---|---|---|
| RUT | Nombre | Carrera |
| 12345678-5 | Ana Pérez | Ingeniería Civil |
| 9876543-K | Juan Soto | Ingeniería Eléctrica |

En otra hoja, la celda `A2` contiene el RUT:

```text
12345678-5
```

Para obtener el nombre del estudiante:

```excel
=INDICE(Estudiantes!B:B; COINCIDIR(A2; Estudiantes!A:A; 0))
```

El resultado será:

```text
Ana Pérez
```

## Cómo funciona

La fórmula se evalúa en dos etapas.

### 1. COINCIDIR encuentra la posición

```excel
=COINCIDIR(A2; Estudiantes!A:A; 0)
```

`COINCIDIR` busca el contenido de `A2` dentro de la columna `A` de la hoja `Estudiantes`.

El tercer argumento, `0`, exige una **coincidencia exacta**.

### 2. INDICE devuelve el resultado

```excel
=INDICE(Estudiantes!B:B; fila)
```

`INDICE` utiliza la posición encontrada por `COINCIDIR` para devolver el valor correspondiente de la columna `B`.

## Búsqueda por RUT

Este patrón resulta especialmente útil cuando el RUT funciona como identificador entre dos bases de datos.

Por ejemplo:

```excel
=INDICE(Respuestas_Formulario!Y:Y; COINCIDIR(A2; Respuestas_Formulario!D:D; 0))
```

En este caso:

- `A2` contiene el RUT que se desea buscar.
- `Respuestas_Formulario!D:D` contiene los RUT de la base original.
- `Respuestas_Formulario!Y:Y` contiene la información que se desea recuperar.

> Las columnas anteriores son solo ilustrativas y deben adaptarse a la estructura de cada hoja de cálculo.

## Uso con NORMALIZAR_RUT()

Si los RUT pueden encontrarse escritos con formatos diferentes, se recomienda normalizarlos antes de realizar la búsqueda.

Por ejemplo:

```excel
=INDICE(
  Respuestas_Formulario!Y:Y;
  COINCIDIR(
    NORMALIZAR_RUT(A2);
    Respuestas_Formulario!D:D;
    0
  )
)
```

Para que la coincidencia funcione correctamente, los RUT de la columna de búsqueda también deben encontrarse normalizados.

La función personalizada `NORMALIZAR_RUT()` está disponible en:

[`NORMALIZAR_RUT()`](../docs/normalizar-rut.md)

## Manejo de valores no encontrados

Si `COINCIDIR` no encuentra una coincidencia exacta, Google Sheets devuelve un error.

Puede utilizarse `SI.ERROR` para devolver una celda vacía:

```excel
=SI.ERROR(
  INDICE(Estudiantes!B:B; COINCIDIR(A2; Estudiantes!A:A; 0));
  ""
)
```

O mostrar un mensaje:

```excel
=SI.ERROR(
  INDICE(Estudiantes!B:B; COINCIDIR(A2; Estudiantes!A:A; 0));
  "No encontrado"
)
```

## Ventajas de INDICE + COINCIDIR

- Permite realizar búsquedas exactas.
- La columna de búsqueda no necesita estar a la izquierda de la columna de resultado.
- Permite seleccionar independientemente el rango de búsqueda y el rango de resultado.
- Es útil para cruzar información entre distintas hojas.
- Funciona especialmente bien cuando existe un identificador único y estable.

## Consideraciones

Los valores utilizados como identificadores deben encontrarse escritos de manera consistente en ambas tablas.

En el caso de los RUT, diferencias como:

```text
12.345.678-5
12345678-5
123456785
```

pueden impedir una coincidencia directa aunque representen el mismo RUT.

Por esta razón, es recomendable normalizar previamente los identificadores.

## Licencia

Esta documentación forma parte de **Google Apps Script Utils** y se distribuye bajo la [MIT License](../LICENSE).
