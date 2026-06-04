// =============================================
// script.js - RESILIENCIA ANDINA
// Completo con los 6 simuladores (A-F)
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosReales();
    renderTabs();
    abrirSimulador(0);
    cargarCasosEstudio();
});

// ===================== DATOS EN TIEMPO REAL =====================
function cargarDatosReales() {
    const datos = [
        {
            icon: "fas fa-dollar-sign",
            titulo: "Dólar Blue",
            valor: "6.98 Bs",
            detalle: "Subió Bs 0.04 hoy"
        },
        {
            icon: "fas fa-gas-pump",
            titulo: "Combustible",
            valor: "Limitado",
            detalle: "Escasez en El Alto y Sur"
        },
        {
            icon: "fas fa-road",
            titulo: "Bloqueos",
            valor: "3 Rutas",
            detalle: "Achacachi, Desaguadero, Copacabana"
        },
        {
            icon: "fas fa-chart-line",
            titulo: "Inflación",
            valor: "+14%",
            detalle: "Alimentos este mes"
        }
    ];

    const grid = document.getElementById('realtime-grid');
    grid.innerHTML = datos.map(d => `
        <div class="realtime-card">
            <i class="${d.icon}"></i>
            <h3>${d.titulo}</h3>
            <div class="value">${d.valor}</div>
            <p>${d.detalle}</p>
        </div>
    `).join('');
}

// ===================== TABS =====================
function renderTabs() {
    const tabsContainer = document.getElementById('tabs');
    const titulos = [
        "A. Carburantes",
        "B. Alimentos",
        "C. Transporte",
        "D. Presupuesto",
        "E. Rumor de Escasez",
        "F. Poder Adquisitivo"
    ];

    tabsContainer.innerHTML = titulos.map((titulo, index) => `
        <button class="tab-button ${index === 0 ? 'active' : ''}" onclick="abrirSimulador(${index})">
            ${titulo}
        </button>
    `).join('');
}

// ===================== ABRIR SIMULADOR =====================
function abrirSimulador(id) {
    document.querySelectorAll('.tab-button').forEach((btn, i) => {
        btn.classList.toggle('active', i === id);
    });

    const simuladoresHTML = [
        // === A. CARBURANTES ===
        `<div class="simulator-card">
            <h3>A. Simulador de Abastecimiento de Carburantes</h3>
            <div class="form-grid">
                <div><label>Reserva Inicial (litros)</label><input type="number" id="reserva-inicial" value="10000"></div>
                <div><label>Consumo Diario (litros)</label><input type="number" id="consumo-diario" value="1200"></div>
                <div><label>Reabastecimiento Diario (litros)</label><input type="number" id="reabastecimiento" value="300"></div>
                <div><label>Nivel Crítico (litros)</label><input type="number" id="nivel-critico" value="2000"></div>
            </div>
            <button onclick="calcularCarburantes()" class="btn-primary">Calcular Duración</button>
            <button onclick="limpiarFormulario(0)" class="btn-clear">Limpiar Formulario</button>
            <div id="resultado-a" class="result-area"></div>
        </div>`,

        // === B. ALIMENTOS ===
        `<div class="simulator-card">
            <h3>B. Simulador de Precios de Alimentos</h3>
            <div class="form-grid">
                <div><label>Precio Anterior del Alimento (Bs)</label><input type="number" id="precio-anterior" value="8" step="0.1"></div>
                <div><label>Precio Actual (Bs)</label><input type="number" id="precio-actual" value="11" step="0.1"></div>
                <div><label>Cantidad Mensual</label><input type="number" id="cantidad-mensual" value="10"></div>
            </div>
            <button onclick="calcularAlimentos()" class="btn-primary">Calcular Impacto</button>
            <button onclick="limpiarFormulario(1)" class="btn-clear">Limpiar Formulario</button>
            <div id="resultado-b" class="result-area"></div>
        </div>`,

        // === C. TRANSPORTE ===
        `<div class="simulator-card">
            <h3>C. Simulador de Costo de Transporte</h3>
            <div class="form-grid">
                <div><label>Distancia Normal (km)</label><input type="number" id="dist-normal" value="10"></div>
                <div><label>Distancia con Desvío (km)</label><input type="number" id="dist-desvio" value="16"></div>
                <div><label>Costo por Km (Bs)</label><input type="number" id="costo-km" value="2" step="0.1"></div>
                <div><label>Viajes por Semana</label><input type="number" id="viajes-semana" value="5"></div>
            </div>
            <button onclick="calcularTransporte()" class="btn-primary">Calcular Costo Adicional</button>
            <button onclick="limpiarFormulario(2)" class="btn-clear">Limpiar Formulario</button>
            <div id="resultado-c" class="result-area"></div>
        </div>`,

        // === D. PRESUPUESTO ===
        `<div class="simulator-card">
            <h3>D. Simulador de Presupuesto Familiar</h3>
            <div class="form-grid">
                <div><label>Presupuesto Disponible (Bs)</label><input type="number" id="presupuesto" value="500"></div>
                <div><label>Total de la Compra (Bs)</label><input type="number" id="total-compra" value="580"></div>
            </div>
            <button onclick="calcularPresupuesto()" class="btn-primary">Verificar Presupuesto</button>
            <button onclick="limpiarFormulario(3)" class="btn-clear">Limpiar Formulario</button>
            <div id="resultado-d" class="result-area"></div>
        </div>`,

        // === E. RUMOR DE ESCASEZ ===
        `<div class="simulator-card">
            <h3>E. Simulador de Rumor de Escasez</h3>
            <div class="form-grid">
                <div><label>Demanda Normal</label><input type="number" id="demanda-normal" value="100"></div>
                <div><label>Aumento por Rumor (%)</label><input type="number" id="aumento-rumor" value="40"></div>
                <div><label>Stock Disponible</label><input type="number" id="stock-disponible" value="120"></div>
            </div>
            <button onclick="calcularRumor()" class="btn-primary">Simular Demanda</button>
            <button onclick="limpiarFormulario(4)" class="btn-clear">Limpiar Formulario</button>
            <div id="resultado-e" class="result-area"></div>
        </div>`,

        // === F. PODER ADQUISITIVO ===
        `<div class="simulator-card">
            <h3>F. Simulador de Poder Adquisitivo</h3>
            <div class="form-grid">
                <div><label>Ingreso Mensual (Bs)</label><input type="number" id="ingreso-mensual" value="2500"></div>
                <div><label>Gasto Anterior (Bs)</label><input type="number" id="gasto-anterior" value="1800"></div>
                <div><label>Gasto Actual (Bs)</label><input type="number" id="gasto-actual" value="2300"></div>
            </div>
            <button onclick="calcularPoderAdquisitivo()" class="btn-primary">Analizar Pérdida</button>
            <button onclick="limpiarFormulario(5)" class="btn-clear">Limpiar Formulario</button>
            <div id="resultado-f" class="result-area"></div>
        </div>`
    ];

    document.getElementById('simulator-content').innerHTML = simuladoresHTML[id];
}

// ===================== FUNCIONES DE CÁLCULO =====================
function calcularCarburantes() {
    const inicial = parseFloat(document.getElementById('reserva-inicial').value) || 0;
    const consumo = parseFloat(document.getElementById('consumo-diario').value) || 0;
    const reab = parseFloat(document.getElementById('reabastecimiento').value) || 0;
    const critico = parseFloat(document.getElementById('nivel-critico').value) || 0;

    if (consumo <= reab) {
        document.getElementById('resultado-a').innerHTML = "Error: El consumo debe ser mayor al reabastecimiento.";
        return;
    }

    const dias = Math.floor((inicial - critico) / (consumo - reab));
    const resultado = document.getElementById('resultado-a');

    let mensaje = `<strong>La reserva durará aproximadamente ${dias} días hasta llegar al nivel crítico.</strong><br>`;
    if (dias < 5) {
        resultado.className = "result-area critico";
        mensaje += "¡Situación crítica! Se recomienda buscar alternativas inmediatamente.";
    } else if (dias < 10) {
        resultado.className = "result-area alerta";
        mensaje += "Precaución: La reserva se agotará pronto.";
    } else {
        resultado.className = "result-area normal";
        mensaje += "Situación estable por el momento.";
    }
    resultado.innerHTML = mensaje;
}

function calcularAlimentos() {
    const anterior = parseFloat(document.getElementById('precio-anterior').value) || 0;
    const actual = parseFloat(document.getElementById('precio-actual').value) || 0;
    const cantidad = parseFloat(document.getElementById('cantidad-mensual').value) || 0;

    const aumento = ((actual - anterior) / anterior * 100).toFixed(1);
    const gastoAnterior = (anterior * cantidad).toFixed(2);
    const gastoActual = (actual * cantidad).toFixed(2);

    const resultado = document.getElementById('resultado-b');
    resultado.className = "result-area alerta";
    resultado.innerHTML = `
        <strong>Aumento de precio:</strong> ${aumento}%<br>
        Gasto anterior: Bs ${gastoAnterior}<br>
        Gasto actual: Bs ${gastoActual}<br>
        <strong>Diferencia mensual: +Bs ${(gastoActual - gastoAnterior).toFixed(2)}</strong>
    `;
}

function calcularTransporte() {
    const normal = parseFloat(document.getElementById('dist-normal').value) || 0;
    const desvio = parseFloat(document.getElementById('dist-desvio').value) || 0;
    const costoKm = parseFloat(document.getElementById('costo-km').value) || 0;
    const viajes = parseFloat(document.getElementById('viajes-semana').value) || 0;

    const costoNormal = (normal * costoKm * viajes).toFixed(2);
    const costoDesvio = (desvio * costoKm * viajes).toFixed(2);
    const adicional = (costoDesvio - costoNormal).toFixed(2);

    const resultado = document.getElementById('resultado-c');
    resultado.className = "result-area alerta";
    resultado.innerHTML = `
        <strong>Costo normal semanal:</strong> Bs ${costoNormal}<br>
        <strong>Costo con desvío:</strong> Bs ${costoDesvio}<br>
        <strong>Gasto adicional:</strong> Bs ${adicional}
    `;
}

function calcularPresupuesto() {
    const presupuesto = parseFloat(document.getElementById('presupuesto').value) || 0;
    const totalCompra = parseFloat(document.getElementById('total-compra').value) || 0;

    const resultado = document.getElementById('resultado-d');
    if (totalCompra > presupuesto) {
        resultado.className = "result-area critico";
        resultado.innerHTML = `<strong>¡Presupuesto insuficiente!</strong><br>Faltan Bs ${(totalCompra - presupuesto).toFixed(2)}`;
    } else {
        resultado.className = "result-area normal";
        resultado.innerHTML = `<strong>Presupuesto suficiente.</strong><br>Sobran Bs ${(presupuesto - totalCompra).toFixed(2)}`;
    }
}

function calcularRumor() {
    const demandaNormal = parseFloat(document.getElementById('demanda-normal').value) || 0;
    const aumento = parseFloat(document.getElementById('aumento-rumor').value) || 0;
    const stock = parseFloat(document.getElementById('stock-disponible').value) || 0;

    const nuevaDemanda = Math.round(demandaNormal * (1 + aumento / 100));
    const resultado = document.getElementById('resultado-e');

    if (nuevaDemanda > stock) {
        resultado.className = "result-area critico";
        resultado.innerHTML = `<strong>¡Escasez inminente!</strong><br>Nueva demanda: ${nuevaDemanda} unidades<br>Stock disponible: ${stock} (No alcanza)`;
    } else {
        resultado.className = "result-area normal";
        resultado.innerHTML = `<strong>Demanda controlada.</strong><br>Nueva demanda: ${nuevaDemanda} unidades<br>Stock suficiente.`;
    }
}

function calcularPoderAdquisitivo() {
    const ingreso = parseFloat(document.getElementById('ingreso-mensual').value) || 0;
    const gastoAnt = parseFloat(document.getElementById('gasto-anterior').value) || 0;
    const gastoAct = parseFloat(document.getElementById('gasto-actual').value) || 0;

    const perdida = ((gastoAct - gastoAnt) / ingreso * 100).toFixed(1);
    const resultado = document.getElementById('resultado-f');
    resultado.className = "result-area critico";
    resultado.innerHTML = `
        <strong>Pérdida de poder adquisitivo:</strong> ${perdida}%<br>
        Gasto anterior: Bs ${gastoAnt}<br>
        Gasto actual: Bs ${gastoAct}
    `;
}

// ===================== LIMPIAR FORMULARIO =====================
function limpiarFormulario(id) {
    abrirSimulador(id);
}

// ===================== CASOS DE ESTUDIO =====================
function cargarCasosEstudio() {
    const casos = [
        { titulo: "Caso 1: Reserva de Carburante", desc: "Reserva inicial: 10000 L", funcion: "probarCasoCarburante()" },
        { titulo: "Caso 2: Aumento de Precios", desc: "Arroz de 8 Bs a 11 Bs", funcion: "probarCasoAlimentos()" },
        { titulo: "Caso 3: Bloqueos", desc: "Distancia 10km → 16km", funcion: "probarCasoTransporte()" }
    ];

    const grid = document.getElementById('cases-grid');
    grid.innerHTML = casos.map(caso => `
        <div class="case-card">
            <h3>${caso.titulo}</h3>
            <p>${caso.desc}</p>
            <button onclick="${caso.funcion}">Probar este caso</button>
        </div>
    `).join('');
}

function probarCasoCarburante() {
    document.getElementById('simuladores').scrollIntoView({ behavior: "smooth" });
    abrirSimulador(0);
    setTimeout(() => calcularCarburantes(), 600);
}

function probarCasoAlimentos() {
    document.getElementById('simuladores').scrollIntoView({ behavior: "smooth" });
    abrirSimulador(1);
    setTimeout(() => calcularAlimentos(), 600);
}

function probarCasoTransporte() {
    document.getElementById('simuladores').scrollIntoView({ behavior: "smooth" });
    abrirSimulador(2);
    setTimeout(() => calcularTransporte(), 600);
}
