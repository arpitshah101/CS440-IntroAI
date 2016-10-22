# 8-Queens Puzzle

> The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard so that no two queens threaten each other. Thus, a solution requires that no two queens share the same row, column, or diagonal.

~[Wikipedia](https://en.wikipedia.org/wiki/Eight_queens_puzzle)

## Purpose
The purpose of this section is to create visualizations for the 8-Queens Puzzle and gain practice applying [various] algorithms which would find a valid solution.

## Design
The visualizations are all executed upon one common chess board with a select dropdown of algorithms allowed for simulation.

The page displays the score of the current state.

Each state is represented with a 8x8 2D Array.  
A new state is determined by one move of a single queen.

## General Components
* Chess board
    * displays queens corresponding to the state matrix
    * displays how many pairs of queens are attacking each other
    * *[ADVANCED FEATURE]*: Display # of pairs of queens would be attacking each other if the queen in the same column as a given square, s, was moved to that square respectively.
* State Manager
    * Keep track of state (queens' positions)
    * Execute a certain algorithm for solution finding

## Search Algorithms Implemented
**To Do List:**
[ ] Basic Hill Climbing
[ ] Stochastic hill-climbing
[ ] First-choice hill-climbing
[ ] Random-restart hill-climbing
[ ] Simulated Annealing
[ ] Local Beam Search
[ ] Stochastic Local Beam Search
[ ] Genetic Algorithm

## Core Functions Needed
**PrintState**(int[ ][ ] *stateMatrix*)
**CalcAtkPairs**(int[ ][ ] *stateMatrix*)
**CalcSafePairs**(int[ ][ ] *stateMatrix*)

## Draft Algorithm Notes
```python
def PrintState(matrix):
    for row in stateMatrix:
        for x in range(len(row)-1):
            print "%d " % row[x]
        print "%d\n" % row[len(row)-1]
```
```python
def CalcAtkPairs(matrix):
    count = 0
    for each column, c:
        row, col <-- location of queen in c
        count += check row for other queens
        // check top & bottom diagonals
        for each column, index d:
            diff = abs(c - d)
            if diff > 0:
                if matrix[row - diff][d] has queen:
                    count++
                if matrix[row + diff][d] has queen:
                    count++
    return count
```
```python
def CalcSafePairs(matrix):
    return 28 - CalcAtkPairs(matrix)
```
