/// <reference path="../typings/globals/jquery/index.d.ts" />




export function clearBoard(): void {
    for (let i = 1; i < 9; i++) {
        jQuery('.col'+i).each((index: number, element: Element) => {
            element.innerHTML = "";
        });
    }
}

export function disableExecBtns(): void {
    jQuery(".exec-btn").each((index: number, elem: Element) => elem.setAttribute('disabled', 'true'));
}

export function enableExecBtns(): void {
    jQuery(".exec-btn").each((index: number, elem: Element) => elem.removeAttribute('disabled'));
}

export function updateStepCount(stepCount: number): void {
    jQuery("#stepCount").html(stepCount.toString());
}

export function updateQueens(positions: number[], score: number): void {
    clearBoard();
    positions.map((value: number, index: number) => {
        jQuery('#row'+(value+1)+' .col'+(index+1)).html('&#9819;');
    });
    jQuery('#atkCount').html(score.toString());
}