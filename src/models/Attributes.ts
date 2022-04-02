import { UserProps } from "./User";

export class Attributes<T> {
    constructor(private data: T) { }

    /**
     * Get a single user's property
     * @param key Key of Object
     * @returns data
     */
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    /**
     * Update user's information
     * @param update 
     */
    set = (update: T): void => {
        Object.assign(this.data, update);
    }

    getAll(): T {
        return this.data;
    }
}