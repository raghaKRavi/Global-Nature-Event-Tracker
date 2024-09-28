import axiosInstance from '../../../integration/domain/config/AxiosConfiguration';
import { ICategoryData } from '../interface/ICategoryData';
import { IEventData } from '../interface/IEventResponse';
import { ISourceData } from '../interface/ISourceData';

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

    async getEvents(params: any){
        try{
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


}
export default NaturalEventsService;