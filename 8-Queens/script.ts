/// <reference path="../typings/globals/jquery/index.d.ts" />

class State {
    positions: number[] = [];
    value: number;
    constructor(p: number[]) {
        this.positions = p;
        this.value = getScore(this);
    }

    public clone(): State {
        let p = this.positions.slice();
        return new State(p);
    }
}

var currentAlgo: string = "hill-climbing";
var currentState: State = generateRandomState();


// TEST STATE. SHOULD HAVE COST FUNCTION OF 17
// positions = [4, 5, 6, 3, 4, 5, 6, 5];

// function getPositionInCol(col: number): number
// {
//     return positions[col];
// }

function getScore(state: State): number {
    if (currentAlgo == "hill-climbing") {
        return calculateAtkPairs(state);
    }
}

function generateRandomState(): State {
    let p: number[] = [];
    for(let i = 0; i < 8; i++)
        p[i] = Math.floor(Math.random() * 8);
    return new State(p);
}

function updateQueens(): void
{
    clearBoard();
    currentState.positions.map((value: number, index: number) => {
        jQuery('#row'+(value+1)+' .col'+(index+1)).html('&#9819;');
    });
    jQuery('#atkCount').html(currentState.value.toString());
}

function clearBoard(): void {
    for (let i = 1; i < 9; i++) {
        jQuery('.col'+i).each((index: number, element: Element) => {
            element.innerHTML = "";
        });
    }
}

function calculateAtkPairs(state: State): number
{
    let count = 0;
    state.positions.forEach((rowNum: number, colNum: number) => {
        for(let i = 0; i < colNum; i++) {
            // check if queen is on same row as another
            if (rowNum == state.positions[i]) count++;
            else {
                // check if queen is attacking another in a diagonal to the left top or bottom
                let diff = Math.abs(colNum - i);
                if (diff > 0) {
                    if (Math.abs(state.positions[i] - rowNum) == diff) count++;
                }
            }
        }
    });
    return count;
}

function calculateSafePairs(state: State): number
{
    return 28 - calculateAtkPairs(state);
}

function getAllNeighbors(state: State): State[]
{
    var neighbors: State[] = [];
    state.positions.forEach((position: number, index: number) => {
        let x = state.positions.slice();
        x[index] = position + 1;
        neighbors.push(new State(x));
        let y = state.positions.slice();
        y[index] = position - 1;
        neighbors.push(new State(y));
    });
    return neighbors;
}

function hillClimb(): void {
    while (true) {
        let neighbors: State[] = getAllNeighbors(currentState);
        let maxNeighbor = getMaxNeighbor(neighbors);
        if (maxNeighbor.value <= currentState.value) {
            break;
        }
        currentState = maxNeighbor;
        updateQueens();
    };
}

function getMaxNeighbor(neighbors: State[]): State {
    let maxScore = 0;
    let maxIndex = 0;
    neighbors.forEach((state: State, index: number) => {
        if (maxScore < calculateAtkPairs(state)) {
            maxIndex = index;
            maxScore = calculateAtkPairs(state);
        }
    });
    return neighbors[maxIndex];
}

// ------------------------------------------------------------
jQuery(document).ready(() => {
    // Initialize chess board with randomly generated state
    generateRandomState();
    updateQueens();

    jQuery("#start-btn").click(function() {
        var algo: string = jQuery("#algo-option").val();
        if (algo == 'hill-climbing') {
            let maxIter = 1000;
            do {
                hillClimb();
                currentState = generateRandomState();
                maxIter--;
            } while (maxIter > 0 && getScore(currentState) != 0);
            console.log('RESULT: ' + currentState.positions);
        }
    });
});
