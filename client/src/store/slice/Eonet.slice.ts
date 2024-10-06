import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EonetGeoJsonInitialState, EventGeoJsonBodyStruct, ICategory, IEonetState, IEventParams, InitialStateProps, IVisuals } from "../type"
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
        limit: '20'
    } as IEventParams,
    selectedCategories: [],
    coordinatesDetails: [],
    visuals: [] as IVisuals[],
    responseCategories: [],
    magnitudeData: []
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
            state.selectedCategories = value
        },
        updateMagnitudeData: (state, action: PayloadAction<string>) => {
            state.visuals.length > 0 && state.visuals.filter(v => v.category === action.payload).flatMap((item) => (
                state.magnitudeData = item.metadata
            ))
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
                state.visuals = action.payload.data.visuals;
                state.responseCategories = getResponseCategories(action.payload.data?.visuals);
                state.magnitudeData = action.payload.data?.visuals.at(0).metadata
                state.coordinatesDetails = combineCoordinates(action.payload.data?.body);
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

// const splitCategories = (data: EventGeoJsonBodyStruct[]): Record<string, Array<number>> => {
//     var res : Record<string, Array<number>> = {};

//     data.map((event: any) => {
//         const coordinates = event.geometry.coordinates;
//         var id = event.id;
//         if(Array.isArray(coordinates[0])){
//           coordinates.map((coords: Array<number>) => {
//             const newId = `${id} - ${coordinates[1]}${coordinates[0]}`;
//             res[newId] = coords;
//           })
          
//         } else {
//           res[id] = coordinates;
//         }
//       })

//     return res;
// }

const combineCoordinates = (data: EventGeoJsonBodyStruct[]) => {
    const resCoordinates = [] as any[];
    data.map((event: any) => {
        const coordinates = event?.geometry?.coordinates;
        if(Array.isArray(coordinates[0])){

          for(var i =0; i<coordinates?.length; i++){
            resCoordinates.push(coordinates[i]);
          }

        } else{
          resCoordinates.push(coordinates);
        }
    });

        return resCoordinates;
}

const getResponseCategories = (data: IVisuals[]): Array<string> => {
    const res: string[] = [];
    data?.map((i)=> (
        res.push(i?.category)
    ));
    return res;
}

export const { updateCategoriesArray, updateEventParam, updateMagnitudeData } = EonetSlice.actions;

export default EonetSlice.reducer;