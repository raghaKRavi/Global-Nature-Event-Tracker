import {Request, Response} from 'express';
import NaturalEventsService from "../../domain/service/NaturalEventsService";
import paramProcess from "../../domain/helpers/ParamProcess.helper";
import eventParams from "../../domain/model/EventParams.model";
import { IEventRequestBody } from '../request/EventRequest';

require('dotenv').config()

const NaturalEventsServiceInstance = new NaturalEventsService(process.env.NASA_API_EONET_BASE);

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
        var schema : IEventRequestBody; 
        const params = paramProcess(request.body, eventParams);
        const data = await NaturalEventsServiceInstance.getEvents(params);
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

export default {
    getCategoriesDetail,
    getEvents
}