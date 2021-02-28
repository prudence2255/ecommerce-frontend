
import { createSlice, createSelector} from '@reduxjs/toolkit'
import {logout, addAd, loadAd, updateCustomer,
      loadAds, login, loadCustomer,
      updateAd, deleteAd, categoryLocation,
      signUp, socialLogin, parentOptions, childOptions,
      } from './customerActions';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


/**
 * creates customers slice
 */
 const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    loginCustomer: {},
    ads: [],
    ad: {},
    categoryLocations: {},
    customers: [],
    parentItems: [],
    childItems: [],
    photos: [],
    meta: {},
     contacts: [],
  },
  reducers: {
    setPhotos: (state, action) => {
      state.photos = [...state.photos, action.payload]
    },

    removePhoto: (state, action) => {
     let photos = [...state.photos]
     photos.splice(action.payload, 1);
     state.photos = photos;
    },

    setContacts: (state, action) => {
      state.contacts = [...state.contacts, action.payload]
    },

    removeContact: (state, action) => {
     let contacts = [...state.contacts]
     contacts.splice(action.payload, 1);
     state.contacts = contacts;
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
      state.ads =  action.payload.data.data;
      state.meta = action.payload.data;
    },

    [loadAd.fulfilled] : (state, action) => {
  
      if(action.payload.data.item){
        state.ad =  {
          ...state.ad, ...action.payload.data.ad,
           ...action.payload.data.item  
          }
      }else{
        state.ad =  {
          ...state.ad, ...action.payload.data, 
          }
      }
     
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

    [updateCustomer.fulfilled] : (state, action) => { 
      state.loginCustomer =  action.payload.data.data
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
 setContacts,
 removeContact,
} = customersSlice.actions


/**
 * creates a selector for customers
 */
export const customerSelector = createSelector(
   (state) => ({
        loginCustomer: state.customers.loginCustomer,
        ads: state.customers.ads,
        ad: state.customers.ad,
        categoryLocations: state.customers.categoryLocations,
        customers: state.customers.customers,
       parentItems: state.customers.parentItems,
       childItems: state.customers.childItems,
       photos: state.customers.photos,
       contacts: state.customers.contacts,
       meta: state.customers.meta,
    }),

    (state) => state
)

export default customersSlice.reducer
