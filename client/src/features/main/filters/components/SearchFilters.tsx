import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeoJsonEvents } from "../../../../store/actions/Eonet.action";
import { AppDispatch, RootState } from "../../../../store/store";
import StatusSelectDropdown from "./multiselect/StatusSelectDropdown";
import CategoryDropDown from "./multiselect/CategoryDropdown";
import { Button } from "@mui/material";
import { updateEventParam } from "../../../../store/slice/Eonet.slice";

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
  ]

export const SearchFilters = () => {
    const dispatch = useDispatch<AppDispatch>();
    const params = useSelector((state: RootState) => state.eonet.eventsParam);
    const selectedCategories = useSelector((state: RootState) => state.eonet.selectedCategories);

    useEffect(() => {
        handleSearch();
    }, []);

    useEffect(() => {
        if(selectedCategories != null && Array.isArray(selectedCategories) && selectedCategories.length > 0){
            const categoriesString =  selectedCategories.join(',');
            dispatch(updateEventParam({key: "category", value: categoriesString}));
        }
    }, [dispatch, params, selectedCategories])

    const handleSearch = () => {
        console.log("rendered from search");
        dispatch(fetchGeoJsonEvents(params));
    }

    return(
        <>
        <StatusSelectDropdown />
        <CategoryDropDown />
        <Button variant="outlined" onClick={handleSearch}>search</Button>
        </>
    );

}