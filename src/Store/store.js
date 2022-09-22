import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import permanentReducer from "./permanentReducer";
import cacheReducer from "./cacheReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    permanentData: permanentReducer, // key name same as the carefully renamed default export
    cacheData: cacheReducer, // specific key name instead of the variable name
})

const persistConfig = {
    key: 'permanentData',
    storage: storage,
    whitelist: ['permanentData']
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, window.REDUX_INITIAL_DATA, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
