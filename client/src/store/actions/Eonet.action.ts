import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/AxiosConfig";
import { EonetGeoJsonInitialState, EventRequestObject } from "../type";

const BASE = "/eonet"

export const fetchCategories = createAsyncThunk(
    "fetchCategories", 
    async(_, thunkAPI) => {
        try{
            console.log('inside here')
            const res = await axiosInstance.get(`${BASE}/categories`,);
            console.log(res.data);
            return res;
        } catch(error) {
            return thunkAPI.rejectWithValue("Failed to fetch the categories");
        }
    }
);

export const fetchGeoJsonEvents = createAsyncThunk(
    "fetchGeoJsonEvents",
    async(queryParamObj: EventRequestObject, thunkAPI) => {
        try{
            const res: any = await axiosInstance.get(`${BASE}/geojson`, {params: queryParamObj});
            console.log(queryParamObj);
            console.log(res.data.body.map((event: any) => (event.geometry)))
            return res;
        } catch(error) {
            return thunkAPI.rejectWithValue("Failed to fetch the events");
        }
    }
);