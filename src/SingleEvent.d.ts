/**
 * Presents the class to attach functions and invoke them all at once.
 */
export declare class SingleEvent {
    events: (() => void)[];
    constructor();
    Add(fn: any): void;
    Remove(fn: any): void;
    Apply(scope: any, args: any): void;
    Call(scope: any, ...args: any[]): void;
    Invoke(...args: any[]): void;
}
