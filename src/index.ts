import { IObserver, Observer } from './core/observer';
import { of, delay, tap, map, mapTo, take, interval, log } from './core/operators';
import { Observable } from './core/observable';

/**
 * Examples and tests of the RxJonS library
 * 
 * Comment in tests one at a time to inspect the results
 */

/** Generic Observer we'll use in every example. Just logs the values uniquely so you can see what the final Observer received */
const genericObserver: IObserver<any> = {
    next: (v: any) => {
        console.log('> Observer received value:', v, '\n\n');
    },
    error: (err: any) => {
        console.log('> Observer received error:', err);
    },
    complete: () => {
        console.log('> Observer completed');
    }
};

/** Basic Observable we'll use in some examples. Emits one string value and then completes */
const basicObservable$ = new Observable<string>(
    (observer: Observer<string>) => {
        // produces one value and then completes
        observer.next('hello world');
        observer.complete();
    }
);

/** Synchronous stream Observable we'll use in some examples. Emits the numbers 1 through 5 immediately and in order */
const synchronousObservable$ = of(1, 2, 3, 4, 5);

/** Asynchronous stream Observable we'll use in some examples. Emits the numbers 1 through 5 in order after a 2.5 second delay */
const asynchronousObservable$ = synchronousObservable$.pipe(delay(2500));

/** Interval stream Observable we'll use in some examples. Emits 0 through infnity every half-second until it's stopped */
const intervalObservable$ = interval(500);

/** Faster stream Observable we'll use in some examples. Emits 0 through infinity every one millisecond until it's stopped */
const fastIntervalObservable$ = interval(1);

/**
 * BASIC OBSERVABLE TEST
 * 
 * expected output:
 *     > Observer received value: hello world
 *     >
 *     > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: BASIC OBSERVABLE\n>>>>>>>>>>>>>>>>>>>>\n\n');
// basicObservable$.subscribe(genericObserver);

/**
 * PIPED OBSERVABLE TEST
 * 
 * performs a side effect for all three event types
 * 
 * expected output:
 *      > TAP received value: hello world
 *      > Observer received value: hello world
 *      >
 *      > TAP completed
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: PIPED OBSERVABLE\n>>>>>>>>>>>>>>>>>>>>\n\n');
// basicObservable$.pipe(
//     tap(
//         (v: string) => {
//             // log out a new thing on next()
//             console.log('> TAP received value:', v);
//         },
//         (err: any) => {
//             // log out a new thing on error()
//             console.log('> TAP received error:', err);
//         },
//         () => {
//             // log out a new thing on complete()
//             console.log('> TAP completed');
//         }
//     )
// ).subscribe(genericObserver);

/**
 * CHAIN-PIPED OBSERVABLE TEST
 * 
 * logs out the original value on next() and then pushes a new set value to the Observer
 * 
 * expected output:
 *      > logging next: hello world
 *      > Observer received value: new string
 *      >
 *      > logging complete
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: CHAIN-PIPED OBSERVABLE\n>>>>>>>>>>>>>>>>>>>>\n\n');
// basicObservable$.pipe(
//     log,
//     mapTo('new string')
// ).subscribe(genericObserver);

/**
 * SYNCHRONOUS OBSERVABLE TEST
 * 
 * expected output:
 *      > Observer received value: 1
 *      >
 *      > Observer received value: 2
 *      >
 *      > Observer received value: 3
 *      >
 *      > Observer received value: 4
 *      >
 *      > Observer received value: 5
 *      >
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: SYNCHRONOUS OBSERVABLE\n>>>>>>>>>>>>>>>>>>>>\n\n');
// synchronousObservable$.subscribe(genericObserver);

/**
 * ASYNCHRONOUS OBSERVABLE TEST
 * 
 * expected output (after a delay of 2.5 seconds):
 *      > Observer received value: 1
 *      >
 *      > Observer received value: 2
 *      >
 *      > Observer received value: 3
 *      >
 *      > Observer received value: 4
 *      >
 *      > Observer received value: 5
 *      >
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: ASYNCHRONOUS OBSERVABLE\n>>>>>>>>>>>>>>>>>>>>\n\n');
// asynchronousObservable$.subscribe(genericObserver);

/**
 * MAPPING OPERATOR TEST
 * 
 * augments the values of the synchronous Observable
 * 
 * expected output:
 *      > Observer received value: 100
 *      >
 *      > Observer received value: 200
 *      >
 *      > Observer received value: 300
 *      >
 *      > Observer received value: 400
 *      >
 *      > Observer received value: 500
 *      >
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: MAPPING OPERATOR\n>>>>>>>>>>>>>>>>>>>>\n\n');
// synchronousObservable$.pipe(
//     map(
//         (v: number) => v * 100
//     )
// ).subscribe(genericObserver);

/**
 * MULTI-MAP WITH LOGGING TEST
 * 
 * does some shit
 * 
 * expected output:
 *      > logging next: 1
 *      > logging next: 100
 *      > logging next: 10
 *      > logging next: 60
 *      > Observer received value: 60
 *      >
 *      > logging next: 2
 *      > logging next: 200
 *      > logging next: 20
 *      > logging next: 70
 *      > Observer received value: 70
 *      >
 *      > etc, until Observer received value: 100
 *      >
 *      > logging complete
 *      > logging complete
 *      > logging complete
 *      > logging complete
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: MULTI-MAP WITH LOGGING\n>>>>>>>>>>>>>>>>>>>>\n\n');
// synchronousObservable$.pipe(
//     log,
//     map(
//         (v: number) => v * 100
//     ),
//     log,
//     map(
//         (v: number) => v / 10
//     ),
//     log,
//     map(
//         (v: number) => v + 50
//     ),
//     log
// ).subscribe(genericObserver);

/**
 * BASIC INTERVAL TEST
 * 
 * expected output:
 *      > (delay 500ms)
 *      > Observer received value: 0
 *      > (delay 500ms)
 *      > Observer received value: 1
 *      > (delay 500ms)
 *      > Observer received value: 2
 *      > (delay 500ms)
 *      >
 *      > ...etc until 3 seconds have passed with no completion message
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: BASIC INTERVAL\n>>>>>>>>>>>>>>>>>>>>\n\n');
// const intervalSubscription = intervalObservable$.subscribe(genericObserver);
// setTimeout(() => {
//     intervalSubscription.unsubscribe();
// }, 3000);

/**
 * SELF-TERMINATING INTERVAL TEST
 * 
 * Uses the take() Operator to automatically shut down the interval Observable after 3 emissions
 * 
 * expected output:
 *      > (delay 500ms)
 *      > Observer received value: 0
 *      > (delay 500ms)
 *      > Observer received value: 1
 *      > (delay 500ms)
 *      > Observer received value: 2
 *      >
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: SELF-TERMINATING INTERVAL\n>>>>>>>>>>>>>>>>>>>>\n\n');
// intervalObservable$.pipe(
//     take(3)
// ).subscribe(genericObserver);

/**
 * CONVENIENT INTERVAL TEST
 * 
 * expected output:
 *      > (delay 1ms)
 *      > Observer received value: 1
 *      > (delay 1ms)
 *      >
 *      > ...etc until 50 is reached
 *      >
 *      > Observer completed
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: CONVENIENT INTERVAL\n>>>>>>>>>>>>>>>>>>>>\n\n');
// fastIntervalObservable$.pipe(
//     take(50),
//     map(
//         (v: number) => v + 1
//     )
// ).subscribe(genericObserver);

/**
 * UNSUBSCRIBE TEST
 * 
 * Immediately unsubscribe from a delayed synchronous Observable
 * 
 * Should emit nothing
 */
// console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTEST: UNSUBSCRIBE\n>>>>>>>>>>>>>>>>>>>>\n\n');
// synchronousObservable$.pipe(
//     delay(1000)
// ).subscribe(genericObserver).unsubscribe();

/** le fin */
console.log('\n\n<<<<<<<<<<<<<<<<<<<<\nTest Complete\n>>>>>>>>>>>>>>>>>>>>\n');