import { IUser } from "./IUser";
import { Severity } from "../Consts";

export interface IEvent {
    _id: number;
    user?: IUser;
    os: string;
    eventType: string;
    severity: string;
    time: string;
}