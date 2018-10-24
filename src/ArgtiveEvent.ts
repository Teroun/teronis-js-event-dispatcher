export class ArgtiveEvent<T extends any[] = any[]> {
    private events: Array<(...args: T) => void>;

    public constructor() {
        this.events = [];
    }

    public attach(fn: (...args: T) => void) {
        this.events.push(fn);
    }

    public detach(fn: (...args: T) => void) {
        for (var i = 0; i < this.events.length; i++) {
            if (this.events[i] === fn) {
                this.events.splice(i, 1);
                break;
            }
        };
    }

    public apply(scope = null, args?: T) {
        this.events.forEach((fn) => fn.apply(scope, args));
    }

    public call(scope = null, ...args: T) {
        this.apply(scope, args);
    }

    public invoke(...args: T) {
        this.apply(undefined, args);
    }

    public length() {
         return this.events.length;
    }
}