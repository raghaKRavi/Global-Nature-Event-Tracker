import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {updateMagnitudeData } from "../../../../store/slice/Eonet.slice";
import { AppDispatch, RootState } from "../../../../store/store";
import { useEffect, useState } from "react";

export default function ResponseCategoriesSelect(){
    const dispatch = useDispatch<AppDispatch>();
    const defaultResponseCat = useSelector((state: RootState) => state.eonet.responseCategories)
    
    const [initialValue, setInitialValue] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setInitialValue(event.target.value);
        dispatch(updateMagnitudeData(event.target.value));
      };

      useEffect(() => {
        if(defaultResponseCat.length > 0){
            setInitialValue(defaultResponseCat.at(0)!);
        }
      }, [defaultResponseCat])

  return (
    <FormControl size="small">
      <InputLabel id="category-select-small-label" 
      sx={{
          fontSize: '14px', 
        }}
        >Category</InputLabel>
      <Select
        labelId="category-select-small-label"
        id="category-select-small"
        label="category"
        onChange={handleChange}
        value={initialValue}
        sx={{
          height: 40,
          '.MuiSelect-select': {
            padding: '10px 14px',
            fontSize: '14px', // Font size for the selected text
          },
        }}
      >
        {defaultResponseCat.map(rc => (
             <MenuItem value={rc}>{rc}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}