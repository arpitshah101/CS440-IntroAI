export interface NeighborsFunction {
	(n: any): any[];
}

export interface ValueFunction {
	(n: any): number;
}

export class HillClimb {

	/*
		Basic hill-climb algorithm (a.k.a. Greedy Local Search) for finding local optima.
	*/

	private neighborsFunc: NeighborsFunction;
	private valueFunc: ValueFunction;
	private start: any;
	private value: number;

	private totalSteps: number;

	private complete: boolean;

	constructor(neighborsFunc: NeighborsFunction, valueFunc: ValueFunction, start: any) {
		this.neighborsFunc = neighborsFunc;
		this.valueFunc = valueFunc;
		this.start = start;
		this.value = this.valueFunc(this.start);

		this.totalSteps = 0;
		this.complete = false;
	}

	/**
	 * Runs 1 <= stepCount number of steps in the algorithm
	 */
	step(stepCount: number){
		if (!stepCount || stepCount < 0) stepCount = 1;
		let currentState = this.start;
		let currentValue = this.value;
		for (let step = 0; step < stepCount; step++) {
			let neighbors: any[] = this.neighborsFunc(currentState);
			let neighborCount = neighbors.length;
			let nextState: any;
			let nextValue: number = currentValue;
			let iterCount: number = 0;
			neighbors.forEach((state: any, index: number) => {
				let tempValue = this.valueFunc(state);
				if (tempValue > currentValue) {
					nextState = state;
					nextValue = tempValue;
				}
				iterCount++;
			});

			if (nextValue <= this.value) {
				this.complete = true;
				break;
			}

			currentState = nextState;
			currentValue = nextValue;
			this.totalSteps++;
		}
		this.start = currentState;
		this.value = currentValue;
	}

	run(stepCount: number){
		if (!stepCount || stepCount < 0) stepCount = 1<<30;
		this.step(stepCount);
	}

	get currentState() {
		return this.start;
	}

	get isComplete(): boolean {
		return this.complete;
	}

}
