import { AxiosPromise } from "axios";


/**
 * Type constaint
 */
interface HasId {
    id?: number;
}

interface ModelAttributes<T> {
    set(value: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];

}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventType: string, callback: () => void): void;
    trigger(eventType: string): void;
}


export class Model<T extends HasId>  {
    constructor(
        private attributes: ModelAttributes<T>,
        private sync: Sync<T>,
        private events: Events
    ) { }

    // Much shorter than the accessors below
    on = this.events.on;
    trigger = this.events.trigger;
    get = this.attributes.get;

    // get on() {
    //     return this.events.on;
    // }

    // get trigger() {
    //     return this.events.trigger;
    // }

    // get get() {
    //     return this.attributes.get;
    // }

    /**
     * Update given data 
     * and tell the app something changed
     * @param update object of updated attributes
     */
    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    /**
     * Retrieve data by ID from API
     * Set object with returned data from Promise
     */
    async fetch(): Promise<void> {
        const id = this.attributes.get('id');

        if (typeof id !== 'number') {
            throw new Error('Cannot fetch without an ID');
        }

        try {
            const response = await this.sync.fetch(id);
            this.set(response.data);
        } catch {
            throw new Error('User not found');
        }
    }

    /**
     * Save data to database
     */
    async save(): Promise<void> {
        const attrs = this.attributes.getAll();

        try {
            await this.sync.save(attrs);
            this.trigger('save');
        } catch {
            this.trigger('error');
        }
    }
}