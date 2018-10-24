// Generated by dts-bundle v0.7.3

export class ArgtiveEvent<T extends any[] = any[]> {
    constructor();
    attach(fn: (...args: T) => void): void;
    detach(fn: (...args: T) => void): void;
    apply(scope?: null, args?: T): void;
    call(scope?: null, ...args: T): void;
    invoke(...args: T): void;
}

