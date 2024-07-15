
// elements selection 
const grid = document.getElementById('grid');
const startStopButton = document.getElementById('start-stop');
const randomizeButton = document.getElementById('randomize');
const writeNameButton = document.getElementById('write-name');

let cells = [];
let intervalId = null;
const numRows = 30;
const numCols = 30;


function createGrid() {
    grid.innerHTML = '';
    cells = [];
    for (let row = 0; row < numRows; row++) {
        const rowCells = [];
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell', 'dead');
            cell.addEventListener('click', () => toggleCell(row, col));
            grid.appendChild(cell);
            rowCells.push(cell);
        }
        cells.push(rowCells);
    }
}


function toggleCell(row, col) {
    const cell = cells[row][col];
    cell.classList.toggle('alive');
    cell.classList.toggle('dead');
}


function getNextState() {
    const newCells = cells.map(row => row.map(cell => cell.classList.contains('alive')));
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const aliveNeighbors = countAliveNeighbors(row, col);
            if (cells[row][col].classList.contains('alive')) {
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    newCells[row][col] = false;
                }
            } else {
                if (aliveNeighbors === 3) {
                    newCells[row][col] = true;
                }
            }
        }
    }
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (newCells[row][col]) {
                cells[row][col].classList.add('alive');
                cells[row][col].classList.remove('dead');
            } else {
                cells[row][col].classList.add('dead');
                cells[row][col].classList.remove('alive');
            }
        }
    }
}


function countAliveNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                if (cells[newRow][newCol].classList.contains('alive')) {
                    count++;
                }
            }
        }
    }
    return count;
}


function startStopGame() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startStopButton.textContent = 'Start';
    } else {
        intervalId = setInterval(getNextState, 100);
        startStopButton.textContent = 'Stop';
    }
}


function randomizeGrid() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (Math.random() < 0.5) {
                cells[row][col].classList.add('alive');
                cells[row][col].classList.remove('dead');
            } else {
                cells[row][col].classList.add('dead');
                cells[row][col].classList.remove('alive');
            }
        }
    }
}

function writeName() {
    const characters = [
        {
            name: 'A',
            pattern: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1]
            ]
        },
        {
            name: 'B',
            pattern: [
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1]
            ]
        },
        {
            name: 'C',
            pattern: [
                [0, 1, 1, 1],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [0, 1, 1, 1]
            ]
        },
        {
            name: 'D',
            pattern: [
                [1, 1, 1, 0],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 0]
            ]
        },
        {
            name: 'S',
            pattern: [
                [1, 1, 1, 1],
                [1, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1]
            ]
        },
        {
            name: 'H',
            pattern: [
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1]
            ]
        },
        {
            name: 'U',
            pattern: [
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [0, 1, 1, 0]
            ]
        },
        {
            name: 'B',
            pattern: [
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1]
            ]
        },
        {
            name: 'A',
            pattern: [
                [0, 1, 1, 1, 0],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1]
            ]
        },
        {
            name: 'M',
            pattern: [
                [1, 0, 0, 0, 1],
                [1, 1, 0, 1, 1],
                [1, 0, 1, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1]
            ]
        },
       
    ];

    
    createGrid();    

    
    const randomIndex = Math.floor(Math.random() * characters.length);
    const selectedCharacter = characters[randomIndex];


    const startRow = Math.floor((numRows - selectedCharacter.pattern.length) / 2);
    const startCol = Math.floor((numCols - selectedCharacter.pattern[0].length) / 2);

    
    for (let row = 0; row < selectedCharacter.pattern.length; row++) {
        for (let col = 0; col < selectedCharacter.pattern[row].length; col++) {
            if (selectedCharacter.pattern[row][col] === 1) {
                cells[startRow + row][startCol + col].classList.add('alive');
                cells[startRow + row][startCol + col].classList.remove('dead');
            }
        }
    }
}

startStopButton.addEventListener('click', startStopGame);
randomizeButton.addEventListener('click', randomizeGrid);
writeNameButton.addEventListener('click', writeName);

createGrid();