
import { createSlice, createSelector} from '@reduxjs/toolkit'
import {logout, addAd,
      loadAds, login, loadCustomer,
      updateAd, deleteAd, categoryLocation,
      signUp, socialLogin, parentOptions, childOptions,
      } from './customerActions';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();


  
 const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    loginCustomer: {},
    ads: [],
    categoryLocations: {},
    customers: [],
    parentItems: [],
    childItems: [],
    photos: [],
   
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = [...state.photos, action.payload]
    },

    removePhoto: (state, action) => {
     let photos = [...state.photos]
     photos.splice(action.payload, 1);
     state.photos = photos;
    }
  },
  extraReducers: {
    [socialLogin.fulfilled] : (state, action) => {
      cookies.set('customer_token', action.payload.data.token, {path: '/', maxAge: 315360000})
      state.loginCustomer = action.payload.data.data
    },

    [signUp.fulfilled] : (state, action) => {
        cookies.set('customer_token', action.payload.data.token, {path: '/', maxAge: 315360000})
        state.loginCustomer = action.payload.data.data
      },

      [login.fulfilled] : (state, action) => {
        cookies.set('customer_token', action.payload.data.token, {path: '/', maxAge: 315360000})
        state.loginCustomer = action.payload.data.data
      },

     [logout.fulfilled] : (state) => {
        cookies.remove('customer_token', {path: '/'}); 
        state = {}
    },

     [addAd.fulfilled] : (state, action) => {
      state.ads = [action.payload.data, ...state.ads]
    },

     [loadAds.fulfilled] : (state, action) => {
      state.ads =  action.payload.data.data.data || action.payload.data.data
    },
     [loadCustomer.fulfilled] : (state, action) => {
      state.loginCustomer =  action.payload.data.data  
    },
     [updateAd.fulfilled] : (state, action) => { 
      const adIndex = state.ads.findIndex((ad) => ad.id === action.payload.data.data.id)
       const newAds = [...state.ads]   
      newAds[adIndex] = Object.assign({}, newAds[adIndex], action.payload.data.data)
      state.ads = newAds
      
    },
  
      [deleteAd.fulfilled] : (state, action) => {
      const index = state.ads.findIndex(ad => ad.slug === action.payload)
      state.ads.splice(index, 1)
       
     },
     [categoryLocation.fulfilled] : (state, action) => {
      state.categoryLocations =  action.payload.data || action.payload.data.data
    },
    [parentOptions.fulfilled]: (state, action) => {
      state.parentItems =  action.payload.data.data || action.payload.data
    },
    
    [childOptions.fulfilled]: (state, action) => {
      state.childItems =  action.payload.data.data || action.payload.data
    },

  }

});
export const {
 setPhotos,
 removePhoto,
} = customersSlice.actions


export const customerSelector = createSelector(
   (state) => ({
        loginCustomer: state.customers.loginCustomer,
        ads: state.customers.ads,
        categoryLocations: state.customers.categoryLocations,
        customers: state.customers.customers,
       parentItems: state.customers.parentItems,
       childItems: state.customers.childItems,
       photos: state.customers.photos,
    }),

    (state) => state
)

export default customersSlice.reducer
