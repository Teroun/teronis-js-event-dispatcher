type DefaultFunction = (...args: any[]) => void;
type Arguments<F extends Function> = F extends (...args: infer A) => any ? A : never;

export class ArgtiveEvent<T extends DefaultFunction = DefaultFunction> {
    private events: T[];

    public constructor() {
        this.events = [];
    }

    public attach(fn: T) {
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

    public apply(scope = null, args?: Arguments<T>) {
        this.events.forEach((fn) => fn.apply(scope, args));
    }

    public call(scope = null, ...args: Arguments<T>) {
        this.apply(scope, args);
    }

    public invoke(...args: Arguments<T>) {
        this.apply(undefined, args);
    }

    public length() {
         return this.events.length;
    }
}