CC ?= gcc
CFLAGS ?= -O2 -Wall -Wextra -std=c11 -Iinclude
LDFLAGS ?=
EMCC ?= emcc
EMCC_FLAGS ?= -O2 -Iinclude -s WASM=1 -s EXPORTED_RUNTIME_METHODS='["cwrap"]'
WASM_EXPORTS = -s EXPORTED_FUNCTIONS='["_procesar_medicion","_obtener_muestra","_obtener_promedio","_obtener_minimo","_obtener_maximo","_obtener_calibrado","_obtener_estable","_obtener_total_muestras"]'

NATIVE_SRCS = src/test_main.c src/main.c src/bascula.c src/ruido.c
WASM_SRCS = src/main.c src/bascula.c src/ruido.c
WEB_ASSETS = web/index.html web/app.js web/style.css
BUILD_DIR = build
DOCS_DIR = docs

.PHONY: all native wasm pages clean

all: native

native: agroscale

agroscale: $(NATIVE_SRCS)
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

wasm: $(BUILD_DIR)/agroscale.js $(BUILD_DIR)/agroscale.wasm

$(BUILD_DIR)/agroscale.js $(BUILD_DIR)/agroscale.wasm: $(WASM_SRCS) | $(BUILD_DIR)
	$(EMCC) $(WASM_SRCS) $(EMCC_FLAGS) $(WASM_EXPORTS) -o $(BUILD_DIR)/agroscale.js

pages:
	@test -f $(BUILD_DIR)/agroscale.js && test -f $(BUILD_DIR)/agroscale.wasm || \
		( echo "Faltan artefactos WASM. Ejecuta 'make wasm' antes de 'make pages'."; exit 1 )
	mkdir -p $(DOCS_DIR)/build
	cp $(WEB_ASSETS) $(DOCS_DIR)/
	cp $(BUILD_DIR)/agroscale.js $(BUILD_DIR)/agroscale.wasm $(DOCS_DIR)/build/
	sed -i 's#../build/agroscale.js#./build/agroscale.js#' $(DOCS_DIR)/index.html
	touch $(DOCS_DIR)/.nojekyll
	@echo "Sitio listo en $(DOCS_DIR)/ para GitHub Pages."

clean:
	rm -f agroscale
	rm -rf $(BUILD_DIR)
