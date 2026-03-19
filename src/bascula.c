#include "bascula.h"

double calcular_promedio(const double *muestras, int n) {
  if (muestras == 0 || n <= 0) {
    return 0.0;
  }

  double suma = 0.0;
  for (int i = 0; i < n; i++) {
    suma += muestras[i];
  }

  return suma / n;
}

double calcular_min(const double *muestras, int n) {
  if (muestras == 0 || n <= 0) {
    return 0.0;
  }

  double min = muestras[0];
  for (int i = 1; i < n; i++) {
    if (muestras[i] < min) {
      min = muestras[i];
    }
  }
  return min;
}

double calcular_max(const double *muestras, int n) {
  if (muestras == 0 || n <= 0) {
    return 0.0;
  }

  double max = muestras[0];
  for (int i = 1; i < n; i++) {
    if (muestras[i] > max) {
      max = muestras[i];
    }
  }
  return max;
}

int es_estable(const double *muestras, int n, double umbral) {
  if (muestras == 0 || n <= 0 || umbral < 0.0) {
    return 0;
  }

  double min = calcular_min(muestras, n);
  double max = calcular_max(muestras, n);

  return (max - min) <= umbral;
}

double aplicar_calibracion(double valor, double offset) {
  return valor + offset;
}
