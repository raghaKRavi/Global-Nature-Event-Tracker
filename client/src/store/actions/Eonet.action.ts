import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/AxiosConfig";
import { EonetGeoJsonInitialState, EventRequestObject } from "../type";

const BASE = "/eonet"

export const fetchCategories = createAsyncThunk(
    "fetchCategories", 
    async(_, thunkAPI) => {
        try{
            const res = await axiosInstance.get(`/eonet/categories`);
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
            return res;
        } catch(error) {
            return thunkAPI.rejectWithValue("Failed to fetch the events");
        }
    }
);