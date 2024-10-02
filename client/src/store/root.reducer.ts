import { combineReducers } from "redux";
import EonetReducer from "./slice/Eonet.slice";

const AppReducer = combineReducers({
    eonet: EonetReducer
});

const rootReducer = (state: any, action: any) => {
    return AppReducer(state, action)
}

export default rootReducer;