import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeoJsonEvents } from "../../../../store/actions/Eonet.action";
import { AppDispatch, RootState } from "../../../../store/store";
import StatusSelectDropdown from "./multiselect/StatusSelectDropdown";
import CategoryDropDown from "./multiselect/CategoryDropdown";
import { Box, Button, IconButton } from "@mui/material";
import { updateEventParam } from "../../../../store/slice/Eonet.slice";
import Fingerprint from '@mui/icons-material/Fingerprint';

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
        dispatch(fetchGeoJsonEvents(params));
    }

    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        }}>
        <StatusSelectDropdown />
        <CategoryDropDown />
        {/* <IconButton aria-label="fingerprint" color="secondary">
        <Fingerprint />
        </IconButton> */}
        <Button variant="outlined" size="small" onClick={handleSearch}>search</Button>
        </Box>
    );

}