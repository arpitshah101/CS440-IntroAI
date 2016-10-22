var State = (function () {
    function State(p) {
        this.positions = [];
        this.positions = p;
        this.value = getScore(this);
    }
    State.prototype.clone = function () {
        var p = this.positions.slice();
        return new State(p);
    };
    return State;
}());
var currentAlgo = "hill-climbing";
var currentState = generateRandomState();
function getScore(state) {
    if (currentAlgo == "hill-climbing") {
        return calculateAtkPairs(state);
    }
}
function generateRandomState() {
    var p = [];
    for (var i = 0; i < 8; i++)
        p[i] = Math.floor(Math.random() * 8);
    return new State(p);
}
function updateQueens() {
    clearBoard();
    currentState.positions.map(function (value, index) {
        jQuery('#row' + (value + 1) + ' .col' + (index + 1)).html('&#9819;');
    });
    jQuery('#atkCount').html(currentState.value.toString());
}
function clearBoard() {
    for (var i = 1; i < 9; i++) {
        jQuery('.col' + i).each(function (index, element) {
            element.innerHTML = "";
        });
    }
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
function calculateSafePairs(state) {
    return 28 - calculateAtkPairs(state);
}
function getAllNeighbors(state) {
    var neighbors = [];
    state.positions.forEach(function (position, index) {
        var x = state.positions.slice();
        x[index] = position + 1;
        neighbors.push(new State(x));
        var y = state.positions.slice();
        y[index] = position - 1;
        neighbors.push(new State(y));
    });
    return neighbors;
}
function hillClimb() {
    while (true) {
        var neighbors = getAllNeighbors(currentState);
        var maxNeighbor = getMaxNeighbor(neighbors);
        if (maxNeighbor.value <= currentState.value) {
            break;
        }
        currentState = maxNeighbor;
        updateQueens();
    }
    ;
}
function getMaxNeighbor(neighbors) {
    var maxScore = 0;
    var maxIndex = 0;
    neighbors.forEach(function (state, index) {
        if (maxScore < calculateAtkPairs(state)) {
            maxIndex = index;
            maxScore = calculateAtkPairs(state);
        }
    });
    return neighbors[maxIndex];
}
jQuery(document).ready(function () {
    generateRandomState();
    updateQueens();
    jQuery("#start-btn").click(function () {
        var algo = jQuery("#algo-option").val();
        if (algo == 'hill-climbing') {
            var maxIter = 1000;
            do {
                hillClimb();
                currentState = generateRandomState();
                maxIter--;
            } while (maxIter > 0 && getScore(currentState) != 0);
            console.log('RESULT: ' + currentState.positions);
        }
    });
});
//# sourceMappingURL=script.js.map