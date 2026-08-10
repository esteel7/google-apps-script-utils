# NORMALIZAR_RUT

Función personalizada para **Google Sheets** que normaliza y valida RUT chilenos.

## Descripción

`NORMALIZAR_RUT()` recibe un RUT escrito en distintos formatos y lo convierte al formato estándar:

```text
12345678-9
```

o, cuando corresponde:

```text
12345678-K
```

Además de normalizar el formato, la función verifica que el **dígito verificador sea válido mediante el algoritmo módulo 11**.

## Características

La función realiza automáticamente las siguientes operaciones:

- Elimina puntos.
- Elimina espacios iniciales y finales.
- Elimina espacios internos.
- Elimina guiones existentes.
- Convierte `k` minúscula en `K` mayúscula.
- Inserta el guion antes del dígito verificador.
- Elimina ceros iniciales del cuerpo del RUT.
- Comprueba que la estructura del RUT sea válida.
- Calcula y verifica el dígito verificador mediante módulo 11.
- Devuelve `RUT INVÁLIDO` cuando el RUT no supera la validación.

## Instalación

1. Abre la hoja de cálculo de Google Sheets donde deseas utilizar la función.
2. Ve a **Extensiones → Apps Script**.
3. Abre el archivo [`normalizar-rut.gs`](../sheets/normalizar-rut.gs).
4. Copia su contenido.
5. Pega el código en el editor de Apps Script.
6. Guarda el proyecto.
7. Regresa a Google Sheets.

La función quedará disponible como una función personalizada de la hoja de cálculo.

## Sintaxis

```excel
=NORMALIZAR_RUT(rut)
```

### Parámetro

| Parámetro | Descripción |
|---|---|
| `rut` | Celda o valor que contiene el RUT que se desea normalizar y validar. |

### Retorno

La función puede devolver:

- El RUT normalizado, si es válido.
- `RUT INVÁLIDO`, si el formato o el dígito verificador son incorrectos.
- Una cadena vacía si la celda de origen está vacía.

## Ejemplo de uso

Si la celda `A2` contiene:

```text
12.345.678-5
```

utiliza:

```excel
=NORMALIZAR_RUT(A2)
```

La función devolverá:

```text
12345678-5
```

## Ejemplos

| Entrada | Resultado |
|---|---|
| `12.345.678-5` | `12345678-5` |
| `12345678-5` | `12345678-5` |
| `123456785` | `12345678-5` |
| ` 12.345.678-5 ` | `12345678-5` |
| `6.123.456-k` | `6123456-K` |
| `6123456k` | `6123456-K` |
| RUT con dígito verificador incorrecto | `RUT INVÁLIDO` |
| Texto que no corresponde a un RUT | `RUT INVÁLIDO` |
| Celda vacía | Celda vacía |

## Validación del dígito verificador

La función utiliza el algoritmo **módulo 11** empleado para calcular el dígito verificador de un RUT chileno.

Los dígitos del cuerpo del RUT se procesan de derecha a izquierda utilizando multiplicadores consecutivos entre `2` y `7`.

A partir del resultado se determina el dígito verificador correspondiente:

- Resultado `11` → `0`
- Resultado `10` → `K`
- Cualquier otro resultado → dígito numérico correspondiente

Si el dígito verificador ingresado no coincide con el calculado, la función devuelve:

```text
RUT INVÁLIDO
```

## Consideraciones

La función está diseñada para **normalizar RUT existentes**, no para corregir automáticamente RUT mal digitados.

Por esta razón, si el dígito verificador ingresado es incorrecto, la función informa que el RUT es inválido en lugar de reemplazarlo silenciosamente por el dígito verificador calculado.

Esto permite detectar posibles errores en los datos de origen.

## Código fuente

El código fuente se encuentra en:

[`sheets/normalizar-rut.gs`](../sheets/normalizar-rut.gs)

## Licencia

Esta utilidad forma parte de **Google Apps Script Utils** y se distribuye bajo la [MIT License](../LICENSE).
