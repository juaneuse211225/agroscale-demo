#ifndef MAIN_H
#define MAIN_H

void procesar_medicion(double peso_base, double offset, double nivel_ruido, double umbral);
double obtener_muestra(int i);
double obtener_promedio(void);
double obtener_minimo(void);
double obtener_maximo(void);
double obtener_calibrado(void);
int obtener_estable(void);
int obtener_total_muestras(void);

#endif
