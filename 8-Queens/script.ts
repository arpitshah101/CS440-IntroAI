/// <reference path="../typings/globals/jquery/index.d.ts" />

let positions: number[] = [];
for(let i = 0; i < 8; i++)
    positions.push(0);

// TEST STATE. SHOULD HAVE COST FUNCTION OF 17
// positions = [4, 5, 6, 3, 4, 5, 6, 5];

function getPositionInCol(col: number): number
{
    return positions[col];
}

function generateRandomState(): void {
    for(let i = 0; i < 8; i++)
        positions[i] = Math.floor(Math.random() * 8);
}

function logPositions() : void
{
    console.log(positions);
}

function updateQueens(): void
{
    positions.map((value: number, index: number) => {
        jQuery('#row'+(value+1)+' .col'+(index+1)).html('&#9819;');
    });
    jQuery('#atkCount').html(calculateAtkPairs().toString());
}

function calculateAtkPairs(): number
{
    let count = 0;
    positions.forEach((rowNum: number, colNum: number) => {
        for(let i = 0; i < colNum; i++) {
            // check if queen is on same row as another
            if (rowNum == positions[i]) count++;
            else {
                // check if queen is attacking another in a diagonal to the left top or bottom
                let diff = Math.abs(colNum - i);
                if (diff > 0) {
                    if (Math.abs(positions[i] - rowNum) == diff) count++;
                }
            }
        }
    });
    return count;
}

function calculateSafePairs(): number
{
    return 28 - calculateAtkPairs();
}

// ------------------------------------------------------------
// Initialize chess board with randomly generated state
jQuery(document).ready(() => {
    generateRandomState();
    updateQueens();
});
