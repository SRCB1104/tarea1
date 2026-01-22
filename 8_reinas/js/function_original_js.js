var contador = 0;
var tipoReyna = 1;
var colorClaro = "#ffc0cb"; // pink
var colorOscuro = "#f5f5dc"; // beige

// Inicializar el tablero con colores por defecto
function inicializarTablero() {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, j) => {
            if ((i + j) % 2 === 0) {
                celda.style.backgroundColor = colorClaro;
            } else {
                celda.style.backgroundColor = colorOscuro;
            }
        });
    });
}

// Actualizar colores del tablero
function actualizarColoresTablero() {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, j) => {
            if ((i + j) % 2 === 0) {
                celda.style.backgroundColor = colorClaro;
            } else {
                celda.style.backgroundColor = colorOscuro;
            }
        });
    });
}

// Obtener la posición de una celda
function obtenerPosicion(celda) {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].querySelectorAll('td');
        for (let j = 0; j < celdas.length; j++) {
            if (celdas[j] === celda) {
                return { fila: i, columna: j };
            }
        }
    }
    return null;
}

// Obtener celda por posición
function obtenerCelda(fila, columna) {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    if (fila >= 0 && fila < 8 && columna >= 0 && columna < 8) {
        return filas[fila].querySelectorAll('td')[columna];
    }
    return null;
}

// Marcar casillas atacadas por una reina
function marcarAtaques(fila, columna) {
    // Marcar fila
    for (let j = 0; j < 8; j++) {
        if (j !== columna) {
            const celda = obtenerCelda(fila, j);
            if (celda && !celda.classList.contains('reina')) {
                celda.classList.add('atacada');
                if (!celda.querySelector('.marca-x')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar columna
    for (let i = 0; i < 8; i++) {
        if (i !== fila) {
            const celda = obtenerCelda(i, columna);
            if (celda && !celda.classList.contains('reina')) {
                celda.classList.add('atacada');
                if (!celda.querySelector('.marca-x')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar diagonal superior izquierda
    let i = fila - 1;
    let j = columna - 1;
    while (i >= 0 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j--;
    }
    
    // Marcar diagonal superior derecha
    i = fila - 1;
    j = columna + 1;
    while (i >= 0 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j++;
    }
    
    // Marcar diagonal inferior izquierda
    i = fila + 1;
    j = columna - 1;
    while (i < 8 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j--;
    }
    
    // Marcar diagonal inferior derecha
    i = fila + 1;
    j = columna + 1;
    while (i < 8 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j++;
    }
}

// Limpiar todas las marcas de ataque
function limpiarAtaques() {
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');
    
    celdas.forEach(celda => {
        celda.classList.remove('atacada');
        const marcaX = celda.querySelector('.marca-x');
        if (marcaX) {
            marcaX.remove();
        }
    });
}

// Recalcular todos los ataques
function recalcularAtaques() {
    limpiarAtaques();
    
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, j) => {
            if (celda.classList.contains('reina')) {
                marcarAtaques(i, j);
            }
        });
    });
}

// Marcar preview de ataques (hover)
function marcarPreviewAtaques(fila, columna) {
    // Marcar fila
    for (let j = 0; j < 8; j++) {
        if (j !== columna) {
            const celda = obtenerCelda(fila, j);
            if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
                celda.classList.add('preview-ataque');
                if (!celda.querySelector('.marca-x-preview')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x-preview';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar columna
    for (let i = 0; i < 8; i++) {
        if (i !== fila) {
            const celda = obtenerCelda(i, columna);
            if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
                celda.classList.add('preview-ataque');
                if (!celda.querySelector('.marca-x-preview')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x-preview';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar diagonal superior izquierda
    let i = fila - 1;
    let j = columna - 1;
    while (i >= 0 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j--;
    }
    
    // Marcar diagonal superior derecha
    i = fila - 1;
    j = columna + 1;
    while (i >= 0 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j++;
    }
    
    // Marcar diagonal inferior izquierda
    i = fila + 1;
    j = columna - 1;
    while (i < 8 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j--;
    }
    
    // Marcar diagonal inferior derecha
    i = fila + 1;
    j = columna + 1;
    while (i < 8 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j++;
    }
}

// Limpiar preview de ataques
function limpiarPreviewAtaques() {
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');
    
    celdas.forEach(celda => {
        celda.classList.remove('preview-ataque');
        const marcaX = celda.querySelector('.marca-x-preview');
        if (marcaX) {
            marcaX.remove();
        }
    });
}

// Manejar hover sobre celdas
function cellHover(celda) {
    // Solo mostrar preview si la celda está vacía y no atacada
    if (!celda.classList.contains('reina') && !celda.classList.contains('atacada') && contador < 8) {
        const pos = obtenerPosicion(celda);
        if (pos) {
            marcarPreviewAtaques(pos.fila, pos.columna);
        }
    }
}

// Manejar cuando el mouse sale de una celda
function cellLeave() {
    limpiarPreviewAtaques();
}

// Función para colocar/quitar reinas
function cellClick(celda) {
    // No permitir colocar reina en casilla atacada
    if (celda.classList.contains('atacada')) {
        return;
    }
    
    if (!celda.classList.contains('reina')) {
        if (contador < 8) {
            celda.innerHTML = "&#9819;";
            celda.classList.add('reina');
            
            if (tipoReyna == 1) {
                celda.style.color = "rgb(236, 98, 117)";
            } else if (tipoReyna == 2) {
                celda.style.color = "rgb(155, 61, 72)";
            } else if (tipoReyna == 3) {
                celda.style.color = "rgb(90, 26, 34)";
            }
            
            contador++;
            
            // Limpiar preview antes de marcar ataques permanentes
            limpiarPreviewAtaques();
            
            // Marcar casillas atacadas
            const pos = obtenerPosicion(celda);
            if (pos) {
                marcarAtaques(pos.fila, pos.columna);
            }
        }
    } else {
        celda.innerHTML = "";
        celda.classList.remove('reina');
        celda.style.color = "";
        contador--;
        
        // Recalcular ataques
        recalcularAtaques();
    }
}
// Reiniciar el tablero
function resetBoard() {
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');

    celdas.forEach(celda => {
        celda.innerHTML = "";
        celda.classList.remove('reina', 'atacada', 'preview-ataque');
        const marcaX = celda.querySelector('.marca-x');
        if (marcaX) marcaX.remove();
    });

    contador = 0;
}

// Soluciones predefinidas para 8Reinas
function solveEightQueens1() {
    resetBoard();
    const positions = [0, 4, 7, 5, 2, 6, 1, 3];
    positions.forEach((col, row) => {
        const celda = obtenerCelda(row, col);
        cellClick(celda);
    });
}

function solveEightQueens2() {
    resetBoard();
    const positions = [0, 5, 7, 2, 4, 6, 1, 3];
    positions.forEach((col, row) => {
        const celda = obtenerCelda(row, col);
        cellClick(celda);
    });
}

function solveEightQueens3() {
    resetBoard();
    const positions = [5, 1, 6, 0, 3, 7, 4, 2];
    positions.forEach((col, row) => {
        const celda = obtenerCelda(row, col);
        cellClick(celda);
    });
}

// Event listeners para los selectores de color
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el tablero
    inicializarTablero();
    
    // Listener para color claro
    const color1 = document.getElementById('color1');
    color1.addEventListener('input', function() {
        colorClaro = this.value;
        actualizarColoresTablero();
    });
    
    // Listener para color oscuro
    const color2 = document.getElementById('color2');
    color2.addEventListener('input', function() {
        colorOscuro = this.value;
        actualizarColoresTablero();
    });
    
    // Agregar event listeners de hover a todas las celdas
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');
    
    celdas.forEach(celda => {
        celda.addEventListener('mouseenter', function() {
            cellHover(this);
        });
        
        celda.addEventListener('mouseleave', function() {
            cellLeave();
        });
    });
    
});