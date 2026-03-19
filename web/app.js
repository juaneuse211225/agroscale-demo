Module.onRuntimeInitialized = () => {
  const procesar = Module.cwrap("procesar_medicion", null, ["number", "number", "number", "number"]);
  const obtenerMuestra = Module.cwrap("obtener_muestra", "number", ["number"]);
  const obtenerPromedio = Module.cwrap("obtener_promedio", "number", []);
  const obtenerMinimo = Module.cwrap("obtener_minimo", "number", []);
  const obtenerMaximo = Module.cwrap("obtener_maximo", "number", []);
  const obtenerCalibrado = Module.cwrap("obtener_calibrado", "number", []);
  const obtenerEstable = Module.cwrap("obtener_estable", "number", []);
  const obtenerTotal = Module.cwrap("obtener_total_muestras", "number", []);

  const boton = document.getElementById("btn");
  const lista = document.getElementById("muestras");
  const promedioEl = document.getElementById("promedio");
  const rangoEl = document.getElementById("rango");
  const calibradoEl = document.getElementById("calibrado");
  const estadoEl = document.getElementById("estado");

  const displayEl = document.getElementById("scaleDisplay");
  const platformEl = document.getElementById("scalePlatform");
  const statusPill = document.getElementById("statusPill");
  const stabilityFill = document.getElementById("stabilityFill");
  const scaleMachine = document.getElementById("scaleMachine");

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const estabilidadOk = "linear-gradient(90deg, #68d391 0%, #2f855a 100%)";
  const estabilidadBad = "linear-gradient(90deg, #f6ad55 0%, #c53030 100%)";

  function leerNumero(id, etiqueta, opciones = {}) {
    const valor = parseFloat(document.getElementById(id).value);
    const { min = null, estrictoMayor = null } = opciones;

    if (Number.isNaN(valor)) {
      throw new Error(`${etiqueta} debe ser numérico.`);
    }

    if (min !== null && valor < min) {
      throw new Error(`${etiqueta} debe ser >= ${min}.`);
    }

    if (estrictoMayor !== null && valor <= estrictoMayor) {
      throw new Error(`${etiqueta} debe ser > ${estrictoMayor}.`);
    }

    return valor;
  }

  function setStatus(texto, tipo) {
    statusPill.textContent = texto;
    statusPill.className = "status-pill";
    statusPill.classList.add(tipo);
  }

  function moverPlataforma(peso) {
    const desplazamiento = Math.min(peso * 0.35, 22);
    platformEl.style.transform = `translateY(${desplazamiento}px)`;
  }

  function resetAnimaciones() {
    scaleMachine.classList.remove("shake", "confirm");
    void scaleMachine.offsetWidth;
  }

  async function mostrarMuestrasAnimadas(total) {
    lista.innerHTML = "";

    for (let i = 0; i < total; i++) {
      const muestra = obtenerMuestra(i);

      displayEl.textContent = `${muestra.toFixed(2)} kg`;
      moverPlataforma(muestra);

      const li = document.createElement("li");
      li.textContent = `Muestra ${i + 1}: ${muestra.toFixed(2)} kg`;
      lista.appendChild(li);

      await sleep(450);
    }
  }

  boton.onclick = async () => {
    try {
      const peso = leerNumero("peso", "Peso base");
      const offset = leerNumero("offset", "Offset calibración");
      const ruido = leerNumero("ruido", "Nivel ruido", { min: 0 });
      const umbral = leerNumero("umbral", "Umbral estabilidad", { estrictoMayor: 0 });

      boton.disabled = true;
      resetAnimaciones();

      promedioEl.textContent = "Promedio: --";
      rangoEl.textContent = "Rango: --";
      calibradoEl.textContent = "Peso calibrado: --";
      estadoEl.textContent = "Estado: midiendo...";
      estadoEl.className = "";

      displayEl.classList.add("measuring");
      displayEl.textContent = "----";
      stabilityFill.style.width = "10%";
      stabilityFill.style.background = estabilidadOk;
      setStatus("Midiendo...", "status-measuring");

      procesar(peso, offset, ruido, umbral);

      const total = obtenerTotal();
      await mostrarMuestrasAnimadas(total);

      const promedio = obtenerPromedio();
      const min = obtenerMinimo();
      const max = obtenerMaximo();
      const calibrado = obtenerCalibrado();
      const estable = !!obtenerEstable();
      const rango = max - min;

      displayEl.classList.remove("measuring");
      displayEl.textContent = `${calibrado.toFixed(2)} kg`;
      moverPlataforma(calibrado);

      const porcentajeEstabilidad = Math.max(0, Math.min(100, 100 - (rango / umbral) * 100));
      stabilityFill.style.width = `${porcentajeEstabilidad}%`;

      if (estable) {
        stabilityFill.style.background = estabilidadOk;
        setStatus("Lectura estable", "status-ok");
        scaleMachine.classList.add("confirm");
      } else {
        stabilityFill.style.background = estabilidadBad;
        setStatus("Lectura inestable", "status-bad");
        scaleMachine.classList.add("shake");
      }

      promedioEl.textContent = `Promedio: ${promedio.toFixed(2)} kg`;
      rangoEl.textContent = `Rango: ${rango.toFixed(2)} kg`;
      calibradoEl.textContent = `Peso calibrado: ${calibrado.toFixed(2)} kg`;
      estadoEl.textContent = `Estado: ${estable ? "Lectura estable" : "Lectura inestable"}`;
      estadoEl.classList.add("result-strong");
    } catch (error) {
      const mensaje = error instanceof Error ? error.message : "Error al procesar la medición.";
      alert(mensaje);
      setStatus("Revisar parámetros", "status-bad");
    } finally {
      boton.disabled = false;
      displayEl.classList.remove("measuring");
    }
  };
};
