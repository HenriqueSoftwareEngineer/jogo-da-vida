// Configurações
const rows = 20;
const cols = 20;
const grid = document.getElementById("grid");
grid.style.gridTemplateColumns = `repeat(${cols}, 20px)`;

// Cria uma grade vazia (todas as células mortas inicialmente)
let cells = Array.from({ length: rows }, () => Array(cols).fill(0));

// Renderiza a grade permitindo a edição
function renderGrid() {
    grid.innerHTML = ''; // Limpa o grid
    cells.forEach((row, i) => {
        row.forEach((cell, j) => {
            const div = document.createElement("div");
            div.classList.add("cell");
            if (cell === 1) div.classList.add("alive");
            div.addEventListener("click", () => toggleCell(i, j));
            grid.appendChild(div);
        });
    });
}

// Alterna o estado da célula entre viva e morta ao clicar
function toggleCell(x, y) {
    cells[x][y] = cells[x][y] === 1 ? 0 : 1;
    renderGrid();
}

// Calcula a próxima geração
function getNextGeneration() {
    const nextGen = cells.map(arr => [...arr]);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (cells[i][j] === 1) {
                if (neighbors < 2 || neighbors > 3) nextGen[i][j] = 0;
            } else {
                if (neighbors === 3) nextGen[i][j] = 1;
            }
        }
    }

    cells = nextGen;
}

// Conta vizinhos vivos
function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const row = (x + i + rows) % rows;
            const col = (y + j + cols) % cols;
            count += cells[row][col];
        }
    }
    return count;
}

// Inicia a simulação
function startSimulation() {
    alert("Simulação iniciada!");
    setInterval(() => {
        getNextGeneration();
        renderGrid();
    }, 500);
}

// Renderiza a grade inicial
renderGrid();