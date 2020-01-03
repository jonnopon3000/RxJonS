/** Interface describing an Observer, implementing the three core Observable event callbacks */
interface IObserver<T> {
    next: (val: T) => void;
    error: (err: any) => void;
    complete: () => void;
}

/**
 * Main Observer class, implementing a wrapper around object literals matching the IObserver interface
 * 
 * Wraps the core Observable event callbacks, effecting the functional aspect of subscriptions and unsubscriptions
 */
class Observer<T> implements IObserver<T> {

    /** An optional callback to run when the Observer is unsubscribed */
    public _unsubscribe: any | null = null;

    /** Flag for whether or not to emit values */
    private unsubscribed = false;

    /**
     * Constructor
     * 
     * @param observer an object literal matching IObserver, implementing the three core Observable event callbacks responding to events from the Observable
     */
    constructor(private observer: IObserver<T>) { }

    /**
     * Wrap the core IObserver's next() method; only emit values if we're not unsubscribed
     * 
     * @param value the value to potentially emit
     */
    public next(value: T) {
        if (this.observer.next && !this.unsubscribed) {
            this.observer.next(value);
        }
    }

    /**
     * Wrap the core IObserver's error() method; only emit errors if we're not unsubscribed
     * 
     * Unsubscribe immediately
     * 
     * @param err the error to potentially emit
     */
    public error(err: any) {
        if (!this.unsubscribed) {
            if (this.observer.error) {
                this.observer.error(err);
            }

            this.unsubscribe();
        }
    }

    /**
     * Wrap the core IObserver's complete() method; only emit the completion event if we're not unsubscribed
     * 
     * Unsubscribe immediately
     */
    public complete() {
        if (!this.unsubscribed) {
            if (this.observer.complete) {
                this.observer.complete();
            }

            this.unsubscribe();
        }
    }

    /**
     * Unsubscribe from the subject, preventing further emissions and running the unsubscribe callback function if we have one
     */
    public unsubscribe() {
        this.unsubscribed = true;

        if (this._unsubscribe) {
            this._unsubscribe();
        }
    }
}

export {
    IObserver,
    Observer
};