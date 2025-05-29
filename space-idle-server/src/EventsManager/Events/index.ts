export abstract class Event {
    abstract name: string;
    abstract handle(data: any, callback: Function, context: any): Promise<void>;
}

export { LoginEvent } from './LoginEvent';
export { RegisterEvent } from './RegisterEvent';
export { ResetPasswordEvent } from './ResetPasswordEvent';
export { SendResetEmailEvent } from './SendResetEmailEvent';
