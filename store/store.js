import {combineReducers} from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import loadersReducer from './admin/loadersSlice';
import errorsReducer from './admin/errorsSlice';
import adminsReducer from './admin/adminSlice'; 
import { HYDRATE, createWrapper } from 'next-redux-wrapper';



const rootReducer = combineReducers({ 
                   loaders: loadersReducer,
                   errors: errorsReducer,
                   admins: adminsReducer,
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





