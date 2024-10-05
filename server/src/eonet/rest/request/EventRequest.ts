import {Request} from 'express';

export type IEventRequest = {
    source?: string,
    category?: string,
    status: string, //TODO: change to enum
    limit: number,
    days?: number,
    start?: string,
    end?: string,
    minimumLong?: number,
    maximumLong?: number,
    minimumLat?: number,
    maximumLat?: number,
}

export interface IEventRequestBody extends Request{
    body: IEventRequest;
}