import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root.reducer";
import EonetReducer from "./slice/Eonet.slice";

export const store = configureStore({
    reducer: {
        eonet: EonetReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;