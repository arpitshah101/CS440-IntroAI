var positions = [];
for (var i = 0; i < 8; i++)
    positions.push(0);
function getPositionInCol(col) {
    return positions[col];
}
function generateRandomState() {
    for (var i = 0; i < 8; i++)
        positions[i] = Math.floor(Math.random() * 8);
}
function logPositions() {
    console.log(positions);
}
function updateQueens() {
    positions.map(function (value, index) {
        jQuery('#row' + (value + 1) + ' .col' + (index + 1)).html('&#9819;');
    });
    jQuery('#atkCount').html(calculateAtkPairs().toString());
}
function calculateAtkPairs() {
    var count = 0;
    positions.forEach(function (rowNum, colNum) {
        for (var i = 0; i < colNum; i++) {
            if (rowNum == positions[i])
                count++;
            else {
                var diff = Math.abs(colNum - i);
                if (diff > 0) {
                    if (Math.abs(positions[i] - rowNum) == diff)
                        count++;
                }
            }
        }
    });
    return count;
}
function calculateSafePairs() {
    return 28 - calculateAtkPairs();
}
jQuery(document).ready(function () {
    generateRandomState();
    updateQueens();
});
//# sourceMappingURL=script.js.map