import NaturalEventsService from "../../domain/service/NaturalEventsService";
import paramProcess from "../../domain/helpers/ParamProcess.helper";
import eventParams from "../../domain/model/EventParams.model";

require('dotenv').config()

const NaturalEventsServiceInstance = new NaturalEventsService(process.env.NASA_API_EONET_BASE);

export const getCategoriesDetail = async (request: any, response: any) => {
    try{
        const data = await NaturalEventsServiceInstance.getCategories();
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

export const getEvents = async (request: any, response: any) => {
    try{
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