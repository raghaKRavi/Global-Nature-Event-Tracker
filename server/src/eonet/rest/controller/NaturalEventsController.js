const NaturalEventsService = require("../../domain/service/NaturalEventsService");
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

module.exports = {
    getCategoriesDetail
}