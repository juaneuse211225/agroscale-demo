#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void procesar_medicion(double peso_base, double offset, double nivel_ruido, double umbral);
double obtener_muestra(int i);
double obtener_promedio();
double obtener_minimo();
double obtener_maximo();
double obtener_calibrado();
int obtener_estable();
int obtener_total_muestras();

int main() {
    srand((unsigned int) time(NULL));

    procesar_medicion(52.3, 0.1, 0.2, 0.5);

    int total = obtener_total_muestras();

    printf("Muestras generadas:\n");
    for (int i = 0; i < total; i++) {
        printf("Muestra %d: %.2f kg\n", i + 1, obtener_muestra(i));
    }

    printf("\nResultado del procesamiento:\n");
    printf("Promedio: %.2f kg\n", obtener_promedio());
    printf("Minimo: %.2f kg\n", obtener_minimo());
    printf("Maximo: %.2f kg\n", obtener_maximo());
    printf("Rango: %.2f kg\n", obtener_maximo() - obtener_minimo());
    printf("Peso calibrado: %.2f kg\n", obtener_calibrado());
    printf("Estado: %s\n", obtener_estable() ? "estable" : "inestable");

    return 0;
}
