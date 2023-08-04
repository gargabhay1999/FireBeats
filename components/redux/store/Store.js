import {createStore} from "redux";
import Reducers from "../reducers/Reducers";
import Reducers2 from "../reducers/Reducers2";
import AddressReducer from "../reducers/AddressReducer";
import { combineReducers } from "redux";

const routeReducer=combineReducers({Reducers, Reducers2, AddressReducer})

const store=createStore(routeReducer)

export default store;