import axios from "axios";

import { Eventing } from "./Eventing";


export class Collection<T, K> {
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(
        public rootUrl: string,
        public deserialize: (json: K) => T
    ) { }

    // Not shortened because of declarations inline above
    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    async fetch(): Promise<void> {
        const response = await axios.get(this.rootUrl);

        response.data.forEach((value: K) => {
            this.models.push(this.deserialize(value));
        });

        this.trigger('change');
    }
}