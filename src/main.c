#ifdef __EMSCRIPTEN__
#include <emscripten/emscripten.h>
#else
#define EMSCRIPTEN_KEEPALIVE
#endif
#include "main.h"
#include "bascula.h"
#include "ruido.h"

#define N_MUESTRAS 5

static double muestras[N_MUESTRAS];
static double promedio = 0.0;
static double minimo = 0.0;
static double maximo = 0.0;
static double calibrado = 0.0;
static int estable = 0;

EMSCRIPTEN_KEEPALIVE
void procesar_medicion(double peso_base, double offset, double nivel_ruido, double umbral) {
    generar_muestras(peso_base, nivel_ruido, muestras, N_MUESTRAS);

    promedio = calcular_promedio(muestras, N_MUESTRAS);
    minimo = calcular_min(muestras, N_MUESTRAS);
    maximo = calcular_max(muestras, N_MUESTRAS);
    estable = es_estable(muestras, N_MUESTRAS, umbral);
    calibrado = aplicar_calibracion(promedio, offset);
}

EMSCRIPTEN_KEEPALIVE
double obtener_muestra(int i) {
    if (i < 0 || i >= N_MUESTRAS) {
        return 0.0;
    }
    return muestras[i];
}

EMSCRIPTEN_KEEPALIVE
double obtener_promedio(void) {
    return promedio;
}

EMSCRIPTEN_KEEPALIVE
double obtener_minimo(void) {
    return minimo;
}

EMSCRIPTEN_KEEPALIVE
double obtener_maximo(void) {
    return maximo;
}

EMSCRIPTEN_KEEPALIVE
double obtener_calibrado(void) {
    return calibrado;
}

EMSCRIPTEN_KEEPALIVE
int obtener_estable(void) {
    return estable;
}

EMSCRIPTEN_KEEPALIVE
int obtener_total_muestras(void) {
    return N_MUESTRAS;
}
