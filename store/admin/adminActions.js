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
const {API_URL} = process.env;
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
    return thunk.rejectWithValue({ error: {errors : {error: ['not found']}}})
   }
    return thunk.rejectWithValue({error: error.response.data})
  }
  if(error.request){
    return thunk.rejectWithValue({ error: {errors : {error: [error.request]}}})
  }
  return thunk.rejectWithValue({ error: {errors : {error: [error.message]}}})
}

export const logout = createAsyncThunk(
    'admin/logout',
    async (_, thunk) => { 
      thunk.dispatch(startLoading()) 
      headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
        const response = await Axios(`${API_URL}/api/logout`,{
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
        const response = await Axios(`${API_URL}/api/login`,{
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
        const response = await Axios(`${API_URL}/api/user-details`,{
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
        const response = await Axios(`${API_URL}${url}`,{
          method: 'POST',
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

  
  export const loadItems = createAsyncThunk(
    'item/loadItems',
    async (data, thunk) => {
      const {url, cookie} = data 
      thunk.dispatch(progressStart()) 
      headers['Authorization'] = `Bearer ${cookie}`;
     // headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
        const response = await Axios(`${API_URL}${url}`,{
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
  console.log(data)
      thunk.dispatch(startLoading())
      const {item, url, slug} = data 
      headers['Authorization'] = `Bearer ${cookies.get("token")}`
      try {
        const response = await Axios(`${API_URL}${url}${slug}`,{
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
          await Axios(`${API_URL}${url}${slug}`,{
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
        const response = await Axios(`${API_URL}${url}`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        console.log(response)
        return response
      } catch (error) {
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )
