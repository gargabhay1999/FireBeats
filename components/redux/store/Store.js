import {createStore} from "redux";
import Reducers from "../reducers/Reducers";
import Reducers2 from "../reducers/Reducers2";
import AddressReducer from "../reducers/AddressReducer";
import OrderReducer from "../reducers/OrderReducer";
import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const routeReducer=combineReducers({Reducers, Reducers2, AddressReducer, OrderReducer})

// const store=createStore(routeReducer)

const store = configureStore({
    reducer: routeReducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    serializableCheck: {
      warnAfter: 10000, // Set a high number to suppress warnings
    },
  });

export default store;