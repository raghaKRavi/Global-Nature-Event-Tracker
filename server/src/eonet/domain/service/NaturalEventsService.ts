import axiosInstance from '../../../integration/domain/config/AxiosConfiguration';

class NaturalEventsService {
    axios: any;
    constructor(baseURL: string){
        this.axios = axiosInstance(baseURL);
    }

    async getCategories(){
        try{
            const response = await this.axios.get(`/categories`);
            const categories = response.data.categories && response.data.categories.map((c: { id: any; title: any; }) => ({id: c.id , category: c.title}));
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

            return {success: true, body: response.data};
        } catch(error){
            console.log(error);
            return{success: false, error}
        }
    }


}
export default NaturalEventsService;