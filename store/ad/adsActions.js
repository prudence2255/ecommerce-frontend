

import { createAsyncThunk} from '@reduxjs/toolkit';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import  {
   progressEnd, statusSucceeded,
} from '../admin/loadersSlice';
import {adsLoading, adsLoaded} from './adsSlice';
import {setErrors} from '../admin/errorsSlice';
import * as A from 'components/adminImports';
 

 
const apiUrl = process.env.API_URL;
let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const getError = (error, thunk) => {
  if(error.response){
    if(error.response.status === 401){
      return thunk.rejectWithValue({ error: {errors : {error: [error.response.data.message]}}})
   }
   if(error.response.status === 404){
    return thunk.rejectWithValue({ error: {errors : {error: ['Not found']}}})
   }
    return thunk.rejectWithValue({error: error.response.data})
  }
  if(error.request){
    return thunk.rejectWithValue({ error: {errors : {error: ['Connection error!']}}})
  }
  return thunk.rejectWithValue({ error: {errors : {error: [error.message]}}})
}


  export const fetchAds = createAsyncThunk(
    'ads/fetchAds',
    async (data, thunk) => {
      const {url, item} = data 
      thunk.dispatch(adsLoading())
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'POST',
          data: JSON.stringify(item),
          headers: {
            ...headers
          }
        })
        thunk.dispatch(adsLoaded())
        thunk.dispatch(statusSucceeded())
        thunk.dispatch(progressEnd())
        return response
      } catch (error) {
        thunk.dispatch(progressEnd())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const fetchItems = createAsyncThunk(
    'ads/fetchItems',
    async (data, thunk) => {
      const {url} = data;
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        thunk.dispatch(progressEnd())
        return response
      } catch (error) {
        thunk.dispatch(progressEnd())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const fetchAd = createAsyncThunk(
    'ads/fetchAd',
    async (data, thunk) => {
      const {url} = data 
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        thunk.dispatch(progressEnd())
        thunk.dispatch(A.statusSucceeded())
        return response
      } catch (error) {
        console.log(error.response)
        thunk.dispatch(progressEnd())
        thunk.dispatch(A.statusRejected())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  

  

  export const fetchCategoryLocation = createAsyncThunk(
    'ads/categoryLocation',
    async (data, thunk) => {
      const {url} = data 
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        return response
      } catch (error) {
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const fetchRecentAds = createAsyncThunk(
    'ads/fetchRecentAds',
    async (data, thunk) => {
      const {url} = data 
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        return response
      } catch (error) {
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const fetchChildOptions = createAsyncThunk(
    'ads/childOptions',
    async (data, thunk) => {
      const {url} = data 
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        return response
      } catch (error) {
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )


  

  