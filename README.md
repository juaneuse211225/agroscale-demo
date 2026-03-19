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

## Preparar carpeta para GitHub Pages

Si ya tienes `build/agroscale.js` y `build/agroscale.wasm`:

```bash
make pages
```

Esto genera/actualiza `docs/` con rutas correctas para Pages.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub.
2. En GitHub: `Settings` -> `Pages`.
3. En `Build and deployment`, selecciona:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/docs`
4. Guarda cambios.

URL esperada:

```text
https://<tu-usuario>.github.io/<tu-repo>/
```

## Nota para hoja de vida

Puedes describir este proyecto como:

> "Desarrollé un simulador de báscula agrícola con lógica en C compilada a WebAssembly, expuesto en una interfaz web interactiva y desplegado en GitHub Pages."
