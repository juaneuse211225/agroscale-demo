#include "ruido.h"
#include <stdlib.h>

void generar_muestras(double peso_base, double nivel_ruido, double *salida, int n){
	for(int i = 0; i < n; i++){
		double r = (double) rand() / RAND_MAX;
		double delta = (r * 2.0 - 1.0) * nivel_ruido;
		salida[i] = peso_base + delta;
	}
}
