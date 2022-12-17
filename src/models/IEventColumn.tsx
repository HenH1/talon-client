export interface IEventColumn {
    id: 'eventType' | 'severity' | 'time' | 'user';
    label: string;
    width?: string;
    format?: (value: any) => string | JSX.Element;
}