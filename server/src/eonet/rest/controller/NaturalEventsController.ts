import {Request, Response} from 'express';
import NaturalEventsService from "../../domain/service/NaturalEventsService";
import { IEventRequest, IEventRequestBody } from '../request/EventRequest';
import cache from 'memory-cache';

require('dotenv').config()

const NaturalEventsServiceInstance = new NaturalEventsService(process.env.NASA_API_EONET_BASE!);

const CACHE_DURATION = 5 * 60 * 1000; 

export const getCategoriesDetail = async (request: Request, response: Response) => {
    const cachedCategories = cache.get('categories');

    if (cachedCategories) {
        response.status(200).json(cachedCategories);
        return
    }
    try{
        const data = await NaturalEventsServiceInstance.getCategories();
        cache.put('categories', data, CACHE_DURATION);
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

export const getEvents = async (request: IEventRequestBody, response: Response) => {
    try{
        const data = await NaturalEventsServiceInstance.getEvents(request.query);
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

export const getGeoJsonEvents = async (request: IEventRequestBody, response: Response) => {
    try{
        const data = await NaturalEventsServiceInstance.getGeoJsonEvents(request.query);
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

export const getSources = async (request: Request, response: Response) => {
    try{
        const data = await NaturalEventsServiceInstance.getSources();
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

export default {
    getCategoriesDetail,
    getEvents,
    getSources,
    getGeoJsonEvents
}