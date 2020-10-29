import {combineReducers} from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import loadersReducer from './admin/loadersSlice';
import errorsReducer from './admin/errorsSlice';
import adminsReducer from './admin/adminSlice'; 
import customersReducer from './customer/customerSlice'; 
import formsReducer from './forms/formsSlice'; 
import adsReducer from './ad/adsSlice'; 
import { HYDRATE, createWrapper } from 'next-redux-wrapper';



const rootReducer = combineReducers({ 
                   loaders: loadersReducer,
                   errors: errorsReducer,
                   admins: adminsReducer,
                   customers: customersReducer,
                   forms: formsReducer,
                   ads: adsReducer
                  });

  const hydrateReducer = (state = {}, action) => {
  if(action.type === HYDRATE){
    return {
      ...state,
      ...action.payload
    }
  }
  return rootReducer(state, action)
}


const makeStore = () => {
  const store = configureStore({
          reducer: hydrateReducer,
            middleware: getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false
            })
          
        })
   return store     
}

export const wrapper = createWrapper(makeStore, {debug: true});





