# AgroScale Demo

Simulador de báscula agrícola con núcleo en **C** compilado a **WebAssembly** y una interfaz web interactiva.

## Qué demuestra este proyecto

- Integración C + WebAssembly en navegador.
- Procesamiento de señales simple (promedio, min/max, rango, estabilidad).
- UI dinámica para simular lecturas de báscula y estado estable/inestable.

## Stack

- C (lógica de medición y calibración)
- WebAssembly (Emscripten)
- HTML/CSS/JavaScript (visualización y controles)

## Estructura

```text
include/      # headers C
src/          # lógica C + runner local de prueba
build/        # artefactos wasm/js
web/          # frontend fuente
docs/         # versión lista para GitHub Pages
Makefile      # tareas de build/publicación
```

## Ejecutar local (binario nativo)

```bash
make native
./agroscale
```

## Compilar a WebAssembly

Requiere `emcc` (Emscripten) en PATH.

```bash
make wasm
```
