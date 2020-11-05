import { createAsyncThunk} from '@reduxjs/toolkit';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import  {
  startLoading, endLoading,
 progressStart,
  progressEnd
} from './loadersSlice';
import {setErrors} from './errorsSlice';

 
const cookies = new Cookies();
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

export const logout = createAsyncThunk(
    'admin/logout',
    async (_, thunk) => { 
      thunk.dispatch(startLoading()) 
      headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
        const response = await Axios(`${apiUrl}/api/logout`,{
          method: 'GET',
          headers: {
          ...headers
          }
        })
        thunk.dispatch(endLoading())
        return response
      } catch (error) {
        thunk.dispatch(endLoading())
        thunk.dispatch(setErrors(getError(error, thunk)))
        return getError(error, thunk)
      }
    }
  )

  export const login = createAsyncThunk(
    'admin/login',
    async (admin, thunk) => {  
      thunk.dispatch(startLoading())
      try {
        const response = await Axios(`${apiUrl}/api/login`,{
          method: 'POST',
          data: JSON.stringify(admin), 
          headers: {
           ...headers
          }
        })
        thunk.dispatch(endLoading())
        return response
      } catch (error) {
        thunk.dispatch(endLoading())
        thunk.dispatch(setErrors(getError(error, thunk)))
        return getError(error, thunk)
      }
    }
  )

  export const loadUser = createAsyncThunk(
    'admin/loadUser',
    async (_, thunk) => {  
      thunk.dispatch(startLoading())
      headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
        const response = await Axios(`${apiUrl}/api/user-details`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        thunk.dispatch(endLoading())
        return response
      } catch (error) {
        thunk.dispatch(endLoading())
        thunk.dispatch(setErrors(getError(error, thunk)))
        return getError(error, thunk) 
      }
    }
  )
  export const addItem = createAsyncThunk(
    'item/addItem',
    async (data, thunk) => { 
      const {item, url} = data
      thunk.dispatch(startLoading()) 
      headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'POST',
          data: JSON.stringify(item), 
          headers: {
            ...headers
          }
        })
        thunk.dispatch(endLoading())
        return response
      } catch (error) {
        console.log(error.response)
        thunk.dispatch(endLoading())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  
  export const loadItems = createAsyncThunk(
    'item/loadItems',
    async (data, thunk) => {
      const {url, cookie} = data 
      headers['Authorization'] = `Bearer ${cookie}`;
     // headers['Authorization'] = `Bearer ${cookies.get("token")}`
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

  

  export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (data, thunk) => { 
      thunk.dispatch(startLoading())
      const {item, url, slug} = data 
      headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
        const response = await Axios(`${apiUrl}${url}${slug}`,{
          method: 'PUT',
          data: JSON.stringify(item),
          headers: {
            ...headers
          }
        })
        thunk.dispatch(endLoading())
        return response
      } catch (error) {
        thunk.dispatch(endLoading())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const deleteItem = createAsyncThunk(
    'item/deleteItem',
    async (data, thunk) => { 
      const {url, slug} = data
      thunk.dispatch(startLoading())
      headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
          await Axios(`${apiUrl}${url}${slug}`,{
          method: 'DELETE', 
          headers: {
            ...headers
          }
        })
        thunk.dispatch(endLoading())
        return slug
      } catch (error) {
        thunk.dispatch(endLoading())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const loadOptions = createAsyncThunk(
    'item/loadOptions',
    async (data, thunk) => {
      const {url, cookie} = data 
      headers['Authorization'] = `Bearer ${cookie}`;
     // headers['Authorization'] = `Bearer ${cookies.get("token")}`
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

  