import axiosInstance from "../../services/AxiosConfig";

export const DataParent = () => {
    axiosInstance.get('/events/geojson');
    return(
        <div>
            
        </div>
    );
}