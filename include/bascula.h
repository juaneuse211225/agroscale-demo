#ifndef BASCULA_H
#define BASCULA_H

double calcular_promedio(const double *muestras, int n);
double calcular_min(const double *muestras, int n);
double calcular_max(const double *muestras, int n);
int es_estable(const double *muestras, int n, double umbral);
double aplicar_calibracion(double valor, double offset);

#endif
