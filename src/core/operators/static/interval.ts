import { Observable } from "../../observable";
import { IObserver } from "../../observer";

/**
 * The static operator 'interval', producing a new Observable which will increment and emit an integer every <period> milliseconds
 * 
 * @param period the time in milliseconds between emissions
 */
const interval = (period: number) => {
    return new Observable<number>((observer: IObserver<number>) => {
        let counter = 0;

        const interval = setInterval(() => {
            observer.next(counter);
            counter++;
        }, period);

        // return an unsubscribe callback so as to clean up the interval
        return () => {
            clearInterval(interval);
        };
    });
};

export { interval };