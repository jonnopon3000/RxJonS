/** Interface describing a Subscription; implementing the unsubscribe method */
interface ISubscription {
    unsubscribe: () => void;
}

export { ISubscription };