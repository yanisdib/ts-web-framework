type Callback = () => void;

export class Eventing {
    events: { [key: string]: Callback[] } = {};

    /***
     * Register an event handler
     */
    on = (eventType: string, callback: Callback): void => {
        const handlers = this.events[eventType] || [];
        handlers.push(callback);
        this.events[eventType] = handlers;
    }

    /***
     * Triggers an event telling other 
     * parts of the app that something
     * has changed
     */
    trigger = (eventType: string): void => {
        const handlers = this.events[eventType];

        if (!handlers || handlers.length === 0) return;

        handlers.forEach(callback => callback());
    }
}