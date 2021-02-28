import { createAsyncThunk} from '@reduxjs/toolkit';
import Axios from 'axios';
import Cookies from 'universal-cookie';
import  {
  startLoading, endLoading,
 progressStart,
  progressEnd, statusSucceeded,
} from '../admin/loadersSlice';
import {setErrors} from '../admin/errorsSlice';
import * as A from 'components/adminImports';
 

 
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
    console.log(error.request)
    return thunk.rejectWithValue({ error: {errors : {error: ['Connection error']}}})
  }
  return thunk.rejectWithValue({ error: {errors : {error: [error.message]}}})
}

export const logout = createAsyncThunk(
    'customer/logout',
    async (_, thunk) => { 
      thunk.dispatch(startLoading()) 
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
      try {
        const response = await Axios(`${apiUrl}/api/customer-logout`,{
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
    'customer/login',
    async (customer, thunk) => {  
      thunk.dispatch(startLoading())
      try {
        const response = await Axios(`${apiUrl}/api/customer-login`,{
          method: 'POST',
          data: JSON.stringify(customer), 
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

  export const loadCustomer = createAsyncThunk(
    'customer/loadCustomer',
    async (cookie, thunk) => {  
      headers['Authorization'] = `Bearer ${cookie}`
      try {
        const response = await Axios(`${apiUrl}/api/login-customer`,{
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
  export const addAd = createAsyncThunk(
    'customer/addAd',
    async (data, thunk) => { 
      const {ad, url} = data
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'POST',
          data: JSON.stringify(ad), 
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

  
  export const loadAds = createAsyncThunk(
    'ad/loadAds',
    async (data, thunk) => {
      const {url, cookie} = data 
      //headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
      headers['Authorization'] = `Bearer ${cookie}`;
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'GET',
          headers: {
            ...headers
          }
        })
        thunk.dispatch(statusSucceeded())
        thunk.dispatch(progressEnd())
        return response
      } catch (error) {
        console.log(error.response)
        thunk.dispatch(progressEnd())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const loadAd = createAsyncThunk(
    'ad/loadAd',
    async (data, thunk) => {
      const {url, cookie} = data 
      headers['Authorization'] = `Bearer ${cookie}`;
      ///headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
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
        thunk.dispatch(progressEnd())
        thunk.dispatch(A.statusRejected())
        thunk.dispatch(setErrors(getError(error, thunk))) 
        return getError(error, thunk)
      }
    }
  )

  export const updateAd = createAsyncThunk(
    'ad/updateAd',
    async (data, thunk) => { 
      thunk.dispatch(startLoading())
      const {ad, url, slug} = data 
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
      try {
        const response = await Axios(`${apiUrl}${url}${slug}`,{
          method: 'PUT',
          data: JSON.stringify(ad),
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

  export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (data, thunk) => { 
      thunk.dispatch(startLoading())
      const {customer, url} = data 
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'PUT',
          data: JSON.stringify(customer),
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

  export const deleteAd = createAsyncThunk(
    'ad/deleteAd',
    async (data, thunk) => { 
      const {url, slug} = data
      thunk.dispatch(startLoading())
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
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

  export const categoryLocation = createAsyncThunk(
    'customer/categoryLocation',
    async (data, thunk) => {
      const {url, cookie} = data 
      headers['Authorization'] = `Bearer ${cookie}`;
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

  export const parentOptions = createAsyncThunk(
    'customer/parentOptions',
    async (data, thunk) => {
      const {url} = data 
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
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

  export const childOptions = createAsyncThunk(
    'customer/childOptions',
    async (data, thunk) => {
      const {url} = data 
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
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


  export const signUp = createAsyncThunk(
    'customer/signUp',
    async (data, thunk) => { 
      const {customer, url} = data
      thunk.dispatch(startLoading()) 
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'POST',
          data: JSON.stringify(customer), 
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

  export const socialLogin = createAsyncThunk(
    'customer/socialLogin',
    async (data, thunk) => { 
      const {customer, url} = data
      thunk.dispatch(startLoading()) 
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'POST',
          data: JSON.stringify(customer), 
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

  export const updatePassword = createAsyncThunk(
    'customer/updatePassword',
    async (data, thunk) => { 
      thunk.dispatch(startLoading())
      const {item, url} = data 
      headers['Authorization'] = `Bearer ${cookies.get("customer_token")}`
      try {
        const response = await Axios(`${apiUrl}${url}`,{
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


  export const sendEmail = createAsyncThunk(
    'customer/sendEmail',
    async (data, thunk) => { 
      const {email, url} = data
      thunk.dispatch(startLoading()) 
      try {
        const response = await Axios(`${apiUrl}${url}`,{
          method: 'POST',
          data: JSON.stringify(email), 
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