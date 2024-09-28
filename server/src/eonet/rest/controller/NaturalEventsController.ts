import {Request, Response} from 'express';
import NaturalEventsService from "../../domain/service/NaturalEventsService";
import { IEventRequestBody } from '../request/EventRequest';

require('dotenv').config()

const NaturalEventsServiceInstance = new NaturalEventsService(process.env.NASA_API_EONET_BASE!);

export const getCategoriesDetail = async (request: Request, response: Response) => {
    try{
        const data = await NaturalEventsServiceInstance.getCategories();
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

export const getEvents = async (request: IEventRequestBody, response: Response) => {
    try{
        const data = await NaturalEventsServiceInstance.getEvents(request.body);
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
    getSources
}