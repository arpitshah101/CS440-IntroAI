System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HillClimb;
    return {
        setters:[],
        execute: function() {
            HillClimb = (function () {
                function HillClimb(neighborsFunc, valueFunc, start) {
                    this.neighborsFunc = neighborsFunc;
                    this.valueFunc = valueFunc;
                    this.start = start;
                    this.value = this.valueFunc(this.start);
                    this.totalSteps = 0;
                    this.complete = false;
                }
                HillClimb.prototype.step = function (stepCount) {
                    var _this = this;
                    if (!stepCount || stepCount < 0)
                        stepCount = 1;
                    var currentState = this.start;
                    var currentValue = this.value;
                    var _loop_1 = function(step) {
                        var neighbors = this_1.neighborsFunc(currentState);
                        var neighborCount = neighbors.length;
                        var nextState;
                        var nextValue = currentValue;
                        var iterCount = 0;
                        neighbors.forEach(function (state, index) {
                            var tempValue = _this.valueFunc(state);
                            if (tempValue > currentValue) {
                                nextState = state;
                                nextValue = tempValue;
                            }
                            iterCount++;
                        });
                        if (nextValue <= this_1.value) {
                            this_1.complete = true;
                            return "break";
                        }
                        currentState = nextState;
                        currentValue = nextValue;
                        this_1.totalSteps++;
                    };
                    var this_1 = this;
                    for (var step = 0; step < stepCount; step++) {
                        var state_1 = _loop_1(step);
                        if (state_1 === "break") break;
                    }
                    this.start = currentState;
                    this.value = currentValue;
                };
                HillClimb.prototype.run = function (stepCount) {
                    if (!stepCount || stepCount < 0)
                        stepCount = 1 << 30;
                    this.step(stepCount);
                };
                Object.defineProperty(HillClimb.prototype, "currentState", {
                    get: function () {
                        return this.start;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HillClimb.prototype, "isComplete", {
                    get: function () {
                        return this.complete;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(HillClimb.prototype, "stepCount", {
                    get: function () {
                        return this.totalSteps;
                    },
                    enumerable: true,
                    configurable: true
                });
                return HillClimb;
            }());
            exports_1("HillClimb", HillClimb);
        }
    }
});
//# sourceMappingURL=hillClimb.js.map