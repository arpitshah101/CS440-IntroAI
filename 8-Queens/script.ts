/// <reference path="../typings/globals/jquery/index.d.ts" />

import { updateQueens, clearBoard } from './chessBoard.js';

import { HillClimb, NeighborsFunction, ValueFunction } from '../core_algorithms/js/hillClimb/hillClimb.js';

class BoardState {
    positions: number[] = [];
    constructor(p: number[]) {
        this.positions = p;
    }

    clone(): BoardState {
        let p = this.positions.slice();
        return new BoardState(p);
    }

    equals(s: BoardState): boolean {
        return this.positions.every((value: number, index: number) => s.positions[index] == value);
    }

    toString() {
        return '[' + this.positions.toString() + ']';
    }
}

/**
 * Generates random BoardState object with random positions in each column (1 per column)
 */
function generateRandomState(): BoardState {
    let p: number[] = [];
    for(let i = 0; i < 8; i++)
        p[i] = Math.floor(Math.random() * 8);
    return new BoardState(p);
}

/**
 * Generates all possible neighbor states such that only one queen is moved any distance within the same column.
 */
function getAllNeighbors(state: BoardState): BoardState[] {
    let neighbors: BoardState[] = [];

    state.positions.forEach((value: number, index: number) => {
        for (let i = 0; i < 8; i++) {
            // check if value is already used to avoid duplicate states
            if (i == value) continue;
            // clone current state first
            let tempState = state.clone();
            // modify position of only 1 queen from current state
            tempState.positions[index] = i;
            neighbors.push(tempState);
        }
    });

    return neighbors;
}

/**
 * Calculates the number of pairs of queens are attacking each other given that there is only 1 queen per column
 */
function calculateAtkPairs(state: BoardState): number {
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

function countSafePairs(state: BoardState): number {
    return 28 - calculateAtkPairs(state);
}

var currentState: BoardState = generateRandomState();

jQuery(document).ready(() => {
    // Initialize chess board with randomly generated state

    currentState = new BoardState([4, 5, 6, 3, 4, 5, 6, 5]);
    updateQueens(currentState.positions);
    console.log('STARTING AT: ' + currentState.positions);
});

jQuery("#start-btn").click(function() {
    let hc = new HillClimb(getAllNeighbors, countSafePairs, currentState);
    while (!hc.isComplete) {
        hc.step(1);
        updateQueens((<BoardState> hc.currentState).positions);
    }
    console.log('RESULT: ' + hc.currentState.positions);
});
// TEST STATE. SHOULD HAVE COST FUNCTION OF 17
// positions = [4, 5, 6, 3, 4, 5, 6, 5];

function getScore(state: BoardState): number {
    return calculateAtkPairs(state);
}
