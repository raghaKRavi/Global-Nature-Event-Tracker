import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { fetchGeoJsonEvents } from "../../store/actions/Eonet.action";

export const DataParent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const geoEvent = useSelector((state: RootState) => state.eonet.body);

    useEffect(() => {
        dispatch(fetchGeoJsonEvents({
            status: "all",
            limit: 5
        }));
    }, [dispatch]);

    return(
        <div className="appendTheChildIn">
            inside main component
            <pre>{JSON.stringify(geoEvent, null, 2)}</pre>
        </div>
    );
}