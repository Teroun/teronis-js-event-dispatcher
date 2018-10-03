// export interface EventHandler {
//     (sender, args): void;
// }

/**
 * Presents the class to attach functions and invoke them all at once.
 */
export class SingleEvent {
    private events: Function[];

    public constructor() {
        this.events = [];
    }

    public attach(fn: Function) {
        this.events.push(fn);
    }

    public detach(fn: Function) {
        for (var i = 0; i < this.events.length; i++) {
            if (this.events[i] === fn) {
                this.events.splice(i, 1);
                break;
            }
        };
    }

    public apply(scope, args?: any[]) {
        this.events.forEach((fn) => fn.apply(scope, args));
    }

    public call(scope, ...args) {
        this.apply(scope, args);
    }

    public invoke(...args) {
        this.apply(undefined, args);
    }
}