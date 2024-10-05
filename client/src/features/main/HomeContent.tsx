import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { SearchFilters } from "./filters/components/SearchFilters";

export const HomeContent = () => {
    return(
        <div className="container mx-auto h-full bg-[#D9D9D9]">
            <p>Nature Event Tracker</p>
            <SearchFilters />
            {/* <pre>{JSON.stringify(geoEvent, null, 2)}</pre> */}
        </div>
    );
}