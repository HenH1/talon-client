import { IUser } from "./IUser";

export interface IEvent {
    _id: number;
    user?: IUser;
    os: string;
    eventType: string;
    severity: string;
    time: string;
}