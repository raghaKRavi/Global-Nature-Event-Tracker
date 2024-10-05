import { SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateEventParam } from "../../../../../store/slice/Eonet.slice";
import { AppDispatch, RootState } from "../../../../../store/store";

const statusData = [
    {
        name: "All", value: "all"
    },
    {
        name: "Open", value: "open"
    },
    {
        name: "Close", value: "close"
    }
]

export default function StatusSelectDropdown(){
    const dispatch = useDispatch<AppDispatch>();
    const defaultStatus = useSelector((state: RootState) => state.eonet.eventsParam)

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(updateEventParam({key: "status", value: event.target.value}));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="status-select-small-label">Status</InputLabel>
      <Select
        labelId="status-select-small-label"
        id="status-select-small"
        value={defaultStatus.status}
        label="status"
        onChange={handleChange}
      >
        {statusData.map(st => (
             <MenuItem value={st.value}>{st.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}