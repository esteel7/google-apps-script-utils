/**
 * Normaliza y valida un RUT chileno.
 *
 * Ejemplos:
 *  12.345.678-5  → 12345678-5
 *  12345678-5    → 12345678-5
 *  123456785     → 12345678-5
 *  6.123.456-k   → 6123456-K
 *
 * Si el dígito verificador no corresponde:
 *  → "RUT INVÁLIDO"
 *
 * Uso en Google Sheets:
 * =NORMALIZAR_RUT(A2)
 */
function NORMALIZAR_RUT(rut) {

  if (rut === null || rut === undefined || rut === "") {
    return "";
  }

  let limpio = String(rut)
    .trim()
    .replace(/\./g, "")
    .replace(/-/g, "")
    .replace(/\s+/g, "")
    .toUpperCase();

  if (!/^\d+[0-9K]$/.test(limpio)) {
    return "RUT INVÁLIDO";
  }

  let cuerpo = limpio.slice(0, -1);
  let dvIngresado = limpio.slice(-1);

  cuerpo = cuerpo.replace(/^0+/, "");

  if (cuerpo === "") {
    return "RUT INVÁLIDO";
  }

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplicador;

    multiplicador++;

    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  let resto = 11 - (suma % 11);
  let dvCalculado;

  if (resto === 11) {
    dvCalculado = "0";
  } else if (resto === 10) {
    dvCalculado = "K";
  } else {
    dvCalculado = String(resto);
  }

  if (dvIngresado !== dvCalculado) {
    return "RUT INVÁLIDO";
  }

  return cuerpo + "-" + dvCalculado;
}
