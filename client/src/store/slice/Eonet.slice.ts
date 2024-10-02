import { createSlice } from "@reduxjs/toolkit"
import { EonetGeoJsonInitialState, InitialStateProps } from "../type"
import { fetchGeoJsonEvents } from "../actions/Eonet.action"


const initialState: EonetGeoJsonInitialState & InitialStateProps= {
    isLoading: false,
    success: true,
    body: [],
    error: null,
    headers: {}
}

const EonetSlice = createSlice({
    name: "eonet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeoJsonEvents.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.body = [];
            })
            .addCase(fetchGeoJsonEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.data.success;
                state.body = action.payload.data.body;
                state.headers = action.payload.headers;
            })
            .addCase(fetchGeoJsonEvents.rejected, (state, action) =>{
                state.isLoading = false;
                state.error = action.error.message || "something went wrong"
            });
    }
});

export default EonetSlice.reducer;