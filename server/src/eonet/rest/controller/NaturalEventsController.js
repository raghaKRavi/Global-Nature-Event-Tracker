const NaturalEventsService = require("../../domain/service/NaturalEventsService");
const paramProcess = require("../../domain/helpers/ParamProcess.helper");
const eventParams = require("../../domain/model/EventParams.model")
require('dotenv').config()

const NaturalEventsServiceInstance = new NaturalEventsService(process.env.NASA_API_EONET_BASE);

const getCategoriesDetail = async (request, response) => {
    try{
        const data = await NaturalEventsServiceInstance.getCategories();
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

const getEvents = async (request, response) => {
    try{
        const params = paramProcess(request.body, eventParams);
        const data = await NaturalEventsServiceInstance.getEvents(params);
        response.json(data);
    } catch (error){
        response.status(500).json({ message: 'Error fetching data' });
    }
}

module.exports = {
    getCategoriesDetail,
    getEvents
}