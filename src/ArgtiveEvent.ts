type DefaultFunction = (...args: any[]) => void;
type Arguments<F extends Function> = F extends (...args: infer A) => any ? A : never;

export type UnsubscribeArgtiveEventHandler = () => void;

export class ArgtiveEvent<T extends DefaultFunction = DefaultFunction> {
    private events: T[];

    public constructor() {
        this.events = [];
    }

    /**
     * @returns The amount of subscriptions.
     */
    public get length() {
        return this.events.length;
    }

    /**
     * All subscriptions will be called at once, when this event instance gets invoked.
     * @param fn
     * @returns A function you can call to unsubscribe.
     */
    public subscribe(fn: T) : UnsubscribeArgtiveEventHandler {
        this.events.push(fn);
        return () => this.unsubscribe(fn) ;
    }

    /**
     * Unsubscribe a handler you subscribed before.
     * @param fn 
     */
    public unsubscribe(fn: T) {
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
}