import {Request} from 'express';

type IEventRequest = {
    source?: string,
    category?: Array<string>,
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