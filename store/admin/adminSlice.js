
import { createSlice, createSelector} from '@reduxjs/toolkit'
import {logout, addItem,
      loadItems, login, loadUser,
      updateItem, deleteItem, loadOptions,
      } from './adminActions';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();


  
 const adminsSlice = createSlice({
  name: 'admins',
  initialState: {
    loginAdmin: {},
    items: [],
    options: [],
  },
  reducers: {
  },
  extraReducers: {
      [login.fulfilled] : (state, action) => {
        cookies.set('token', action.payload.data.token, {path: '/', maxAge: 315360000})
      },
     [logout.fulfilled] : (state) => {
        cookies.remove('token', {path: '/'}); 
        state = {}
    },
     [addItem.fulfilled] : (state, action) => {
      state.items = [action.payload.data.data, ...state.items]
    },
     [loadItems.fulfilled] : (state, action) => {
      state.items =  action.payload.data.data.data || action.payload.data.data
    },
     [loadUser.fulfilled] : (state, action) => {
      state.loginAdmin =  action.payload.data.data  
    },
     [updateItem.fulfilled] : (state, action) => { 
      const itemIndex = state.items.findIndex((item) => item.id === action.payload.data.data.id)
       const newItems = [...state.items]   
      newItems[itemIndex] = Object.assign({}, newItems[itemIndex], action.payload.data.data)
      state.items = newItems
      
    },
  
      [deleteItem.fulfilled] : (state, action) => {
      const index = state.items.findIndex(item => item.slug === action.payload)
      state.items.splice(index, 1)
       
     },
     [loadOptions.fulfilled] : (state, action) => {
      state.options =  action.payload.data.data.data || action.payload.data.data
    },
     
  }

});

export const adminSelector = createSelector(
   (state) => ({
        loginAdmin: state.admins.loginAdmin,
        items: state.admins.items,
        options: state.admins.options,
    }),

    (state) => state
)

export default adminsSlice.reducer
