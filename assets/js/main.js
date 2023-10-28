let tareas = [
    { actividad: "Ir a entrenar", id: "1", estado: false },
    { actividad: "Programar un par de horas", id: "2", estado: false },
    { actividad: "Tomar una cerveza", id: "3", estado: false }
];

// Referencias a elementos del DOM
const btnAgregar = document.querySelector("#btnAgregar");
const inputTarea = document.querySelector("#inputTarea");
const zonaTareas = document.querySelector(".zonaTareas");
const totalTareas = document.querySelector("#totalTareas");
const tareasCompletadas = document.querySelector("#tareasCompletadas");

let contadorId = 4; 
renderizarTareas();


btnAgregar.addEventListener("click", () => {
    if (!inputTarea.value.trim()) {
        return;
    }
    tareas.push({ actividad: inputTarea.value, id: `${contadorId}`, estado: false });
    inputTarea.value = "";
    contadorId++;
    renderizarTareas();
});

function renderizarTareas() {
    let html = tareas.map(tarea => `
        <div class="tarea">
            <span>${tarea.id}</span>
            <span>${tarea.actividad}</span>
            <input type="checkbox" ${tarea.estado ? 'checked' : ''} onchange="cambiarEstado('${tarea.id}')">
            <button onclick="eliminarTarea('${tarea.id}')">Eliminar</button>
        </div>
    `).join("");

    zonaTareas.innerHTML = html;
    actualizarContadores();
}

function cambiarEstado(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.estado = !tarea.estado;
        actualizarContadores();
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    renderizarTareas();
}

function actualizarContadores() {
    totalTareas.textContent = tareas.length;
    tareasCompletadas.textContent = tareas.filter(t => t.estado).length;
}
