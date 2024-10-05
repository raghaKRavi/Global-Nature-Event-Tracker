import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EonetGeoJsonInitialState, EventGeoJsonBodyStruct, ICategory, IEonetState, IEventParams, InitialStateProps } from "../type"
import { fetchCategories, fetchGeoJsonEvents } from "../actions/Eonet.action"


const initialState: EonetGeoJsonInitialState & InitialStateProps & IEonetState= {
    isLoading: false,
    success: true,
    body: [],
    error: null,
    headers: {},
    categories: [] as ICategory[],
    eventsParam: {
        status: "all",
        limit: '2'
    } as IEventParams,
    selectedCategories: [],
    coordinatesDetails: {}
}

const EonetSlice = createSlice({
    name: "eonet",
    initialState,
    reducers: {
        updateEventParam: (state, action: PayloadAction<{key: string; value: string}>) => {
            const {key, value} = action.payload;
            state.eventsParam[key] = value;
        },
        updateCategoriesArray: (state, action: PayloadAction<string[]>) => {
            const value = action.payload;
            // console.log(value);
            // const index = state.selectedCategories.indexOf(value);
            // console.log(index);
            // if(index > -1){
            //     console.log(value, index);
            //     state.selectedCategories.splice(index, 1);
            // } else {
            //     state.selectedCategories.concat(value);
            // }
            state.selectedCategories = value
        }
    },
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
                state.coordinatesDetails = splitCategories(action.payload.data.body)
            })
            .addCase(fetchGeoJsonEvents.rejected, (state, action) =>{
                state.isLoading = false;
                state.error = action.error.message || "something went wrong"
            });

        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.success = false;
                state.categories = [];
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.data.success;
                state.categories = action.payload.data.body;
                state.headers = action.payload.headers;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || "something went wrong"
            })
    }
});

const splitCategories = (data: EventGeoJsonBodyStruct[]): Record<string, Array<number>> => {
    var res : Record<string, Array<number>> = {};

    data.map((event: any) => {
        const coordinates = event.geometry.coordinates;
        var id = event.id;
        if(Array.isArray(coordinates[0])){
          coordinates.map((coords: Array<number>) => {
            const newId = `${id} + - + ${coordinates[1]} + ${coordinates[1]}`;
            res[newId] = coords;
          })
          
        } else {
          res[id] = coordinates;
        }
      })

    return res;
}

export const { updateCategoriesArray, updateEventParam } = EonetSlice.actions;

export default EonetSlice.reducer;