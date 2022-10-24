import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import appApi from './services/AppApi';
//persist our store
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

//reducers
const reducers = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blackList: [appApi.reducer]
}

//persist out store 
const persitedReducer = persistReducer(persistConfig, reducers);

//creating the store 
const store = configureStore({
  reducer: persitedReducer,
  middleware: [thunk, appApi.middleware],
})

export default store;
