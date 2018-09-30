/**
 * Presents the class to attach functions and invoke them all at once.
 */
export class SingleEvent {
    events: (() => void)[];

    constructor() {
        this.events = [];
    }

    Add(fn) {
        this.events = this.events || [];
        this.events.push(fn);
    }

    Remove(fn) {
        if (!this.events)
            return;

        for (var i = 0; i < this.events.length; i++) {
            if (this.events[i] === fn) {
                this.events.splice(i, 1);
                break;
            }
        };
    }

    Apply(scope, args) {
        if (!this.events)
            return;

        this.events.forEach((fn) => fn.apply(scope, args));
    }

    Call(scope, ...args) {
        this.Apply(scope, args);
    }

    Invoke() {
        this.Apply(undefined, arguments);
    }
}
