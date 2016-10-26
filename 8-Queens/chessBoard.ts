/// <reference path="../typings/globals/jquery/index.d.ts" />


export function updateQueens(positions: number[]): void
{
    clearBoard();
    positions.map((value: number, index: number) => {
        jQuery('#row'+(value+1)+' .col'+(index+1)).html('&#9819;');
    });
    // TODO: finish up the line below
    // jQuery('#atkCount').html(currentState.value.toString());
}

export function clearBoard(): void
{
    for (let i = 1; i < 9; i++) {
        jQuery('.col'+i).each((index: number, element: Element) => {
            element.innerHTML = "";
        });
    }
}
