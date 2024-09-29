import axiosInstance from '../../../integration/domain/config/AxiosConfiguration';
import { IEventRequest, IEventRequestBody } from '../../rest';
import { ICategoryData, IEventData, ISourceData } from '../interface/IEventResponse';

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
            return { success: true, body: categories}
        } catch(error){
            console.log(error);
            return{success: false, error}
        }
    }

    async getEvents(params: IEventRequest){
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

            return {success: true, body: this.segregateOccurrence(events)};
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

    segregateOccurrence(data: IEventData[]){
        return data.reduce(function(obj, item) {
            const key = item.categories.at(0)!.title;
            console.log((key in obj))
            obj[key] = !(key in obj) ? [item] : obj[key].concat(item);
            return obj;
          }, {} as Record<string, Object[]>);
    }
}
export default NaturalEventsService;