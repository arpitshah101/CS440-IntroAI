System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function updateQueens(positions, score) {
        clearBoard();
        positions.map(function (value, index) {
            jQuery('#row' + (value + 1) + ' .col' + (index + 1)).html('&#9819;');
        });
        jQuery('#atkCount').html(score.toString());
    }
    exports_1("updateQueens", updateQueens);
    function clearBoard() {
        for (var i = 1; i < 9; i++) {
            jQuery('.col' + i).each(function (index, element) {
                element.innerHTML = "";
            });
        }
    }
    exports_1("clearBoard", clearBoard);
    function updateStepCount(stepCount) {
        jQuery("#stepCount").html(stepCount.toString());
    }
    exports_1("updateStepCount", updateStepCount);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//# sourceMappingURL=chessBoard.js.map