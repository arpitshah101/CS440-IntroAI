System.register(['./chessBoard.js', '../core_algorithms/js/hillClimb/hillClimb.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var chessBoard_js_1, hillClimb_js_1;
    var BoardState, currentState, hc;
    function generateRandomState() {
        var p = [];
        for (var i = 0; i < 8; i++)
            p[i] = Math.floor(Math.random() * 8);
        return new BoardState(p);
    }
    function getAllNeighbors(state) {
        var neighbors = [];
        state.positions.forEach(function (value, index) {
            for (var i = 0; i < 8; i++) {
                if (i == value)
                    continue;
                var tempState = state.clone();
                tempState.positions[index] = i;
                neighbors.push(tempState);
            }
        });
        return neighbors;
    }
    function calculateAtkPairs(state) {
        var count = 0;
        state.positions.forEach(function (rowNum, colNum) {
            for (var i = 0; i < colNum; i++) {
                if (rowNum == state.positions[i])
                    count++;
                else {
                    var diff = Math.abs(colNum - i);
                    if (diff > 0) {
                        if (Math.abs(state.positions[i] - rowNum) == diff)
                            count++;
                    }
                }
            }
        });
        return count;
    }
    function countSafePairs(state) {
        return 28 - calculateAtkPairs(state);
    }
    function getScore(state) {
        return calculateAtkPairs(state);
    }
    return {
        setters:[
            function (chessBoard_js_1_1) {
                chessBoard_js_1 = chessBoard_js_1_1;
            },
            function (hillClimb_js_1_1) {
                hillClimb_js_1 = hillClimb_js_1_1;
            }],
        execute: function() {
            BoardState = (function () {
                function BoardState(p) {
                    this.positions = [];
                    this.positions = p;
                }
                BoardState.prototype.clone = function () {
                    var p = this.positions.slice();
                    return new BoardState(p);
                };
                BoardState.prototype.equals = function (s) {
                    return this.positions.every(function (value, index) { return s.positions[index] == value; });
                };
                BoardState.prototype.toString = function () {
                    return '[' + this.positions.toString() + ']';
                };
                return BoardState;
            }());
            currentState = generateRandomState();
            jQuery(document).ready(function () {
                currentState = generateRandomState();
                chessBoard_js_1.updateQueens(currentState.positions);
                console.log('STARTING AT: ' + currentState.positions);
                hc = new hillClimb_js_1.HillClimb(getAllNeighbors, countSafePairs, currentState);
            });
            jQuery("#start-btn").click(function () {
                if (!hc.isComplete) {
                    hc.step(1);
                    chessBoard_js_1.updateQueens(hc.currentState.positions);
                    console.log('RESULT: ' + hc.currentState.positions);
                }
                else {
                    alert("Local maxima/minima found!");
                }
            });
        }
    }
});
//# sourceMappingURL=script.js.map