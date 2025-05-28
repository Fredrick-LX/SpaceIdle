import { Event } from './Events';

export class EventsManager {
    private events: Map<string, Event> = new Map();

    register(event: Event) {
        this.events.set(event.name, event);
    }

    async handle(eventName: string, data: any, callback: Function, context: any) {
        const event = this.events.get(eventName);
        if (!event) {
            return callback({ code: 1, message: '未知事件' });
        }
        await event.handle(data, callback, context);
    }
}
