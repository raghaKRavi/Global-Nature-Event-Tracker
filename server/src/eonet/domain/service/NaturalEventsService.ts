import axiosInstance from '../../../integration/domain/config/AxiosConfiguration';
import { IEventRequest, IEventRequestBody } from '../../rest';
import { ICategoryData, IEventData, IGeometry, ISourceData } from '../interface/IEventResponse';

class NaturalEventsService {
    private axios: any;
    constructor(baseURL: string){
        this.axios = axiosInstance(baseURL);
    }

    async getCategories(){
        try{
            const response = await this.axios.get(`/categories`);
            const categories: ICategoryData[] = response.data.categories && response.data.categories.map(
                (category: any )=> {
                    const {id, title} = category
                    return {id, title};
                }
            );
            console.log("categories ", response)
            return { success: true, body: categories}
        } catch(error){
            console.log(error);
            return{success: false, error}
        }
    }

    async getEvents(params: any){
        try{
            if(params.category != null && Array.isArray(params.category) && params.category.length > 0){
                params.category =  params.category.join(',');
            }
            const response = await this.axios.get('/events', {
                params: {...params}
            });

            const events: IEventData[] = response.data.events && response.data.events.map(
                //TODO: if possible destructure and return in better format!
                (event: any) => {
                    const {
                        id, 
                        title, 
                        description, 
                        closed,
                        categories,
                        sources,
                        geometry
                    } = event;

                    return {id, 
                        title, 
                        description, 
                        closed,
                        categories,
                        sources,
                        geometry};
                }
            );

            return {success: true, body: events};
        } catch(error){
            console.log(error);
            return{success: false, error};
        }
    }

    async getSources(){
        try{
            const response = await this.axios.get('/sources');
            const sources: ISourceData[] = response.data.sources && response.data.sources.map(
                (s: any) => {
                    const {id, title, source} = s;
                    return {id, title, source}
                }
            );
            return {success: true, body: sources}
        } catch(error){
            console.log(error);
            return {success: false, error};
        }
    }

    async getGeoJsonEvents(params: any){
        try{
            if(params.category != null && Array.isArray(params.category) && params.category.length > 0){
                params.category =  params.category.join(',');
            }
            const response = await this.axios.get('/events/geojson', {
                params: {...params}
            });

            const events: IEventData[] = response.data.features?.map(
                //TODO: if possible destructure and return in better format!
                (event: any) => {
                    const {
                        properties: {id}, 
                        properties: {title}, 
                        properties: {description}, 
                        properties: {closed},
                        properties: {date},
                        properties: {magnitudeValue},
                        properties: {magnitudeUnit},
                        // geometry,
                        properties: {categories}
                    } = event;

                    const geometry = this.flattenedArray(event);

                    return {
                        id, 
                        title, 
                        description, 
                        closed,
                        date,
                        magnitudeValue,
                        magnitudeUnit,
                        // properties,
                        geometry,
                    categories};
                }
            ) ?? [];

            return {success: true, body: events};
        } catch(error){
            console.log(error);
            return{success: false, error};
        }
    }

    segregateOccurrence(data: any[]){
        const segregatedObj = {} as Record<string, Object[]>;
        // return data.reduce(function(obj, item) {
        //     const key = item.categories.at(0)!.title;
        //     obj[key] = !(key in obj) ? [item] : obj[key].concat(item);
        //     return obj;
        //   }, {} as Record<string, Object[]>);
        data.forEach((item: any) => {
            const key = item.categories.at(0)!.title;
            segregatedObj[key] = !(key in segregatedObj) ? [item] : segregatedObj[key].concat(item); 
        })
        return segregatedObj;
    }

    flattenedArray(data: Record<string, any>){
        
        if("geometry" in data && typeof data.geometry["coordinates"][0] !== 'number'){
            data.geometry["coordinates"] = data.geometry["coordinates"][0];
            return data.geometry;
        }
        return data.geometry;
    }
}
export default NaturalEventsService;