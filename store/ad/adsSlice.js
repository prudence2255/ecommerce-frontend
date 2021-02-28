
import { createSlice, createSelector} from '@reduxjs/toolkit'
import { fetchAd, fetchItems, fetchCategoryLocation,
      fetchAds, fetchRecentAds, fetchChildOptions,
      } from './adsActions';

      /**
       * ads slice
       */
 const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    ads: [],
    ad: {},
    recentAds: [],
    childItems: [],
    items: [],
    categoryLocations: {},
    filters: {},
    adsLoading: false,
    meta: {},
    similarAds: [],
  },
  reducers: {
    addFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload}
    },

    adsLoading: (state) => {
      state.adsLoading = true;
    },

    adsLoaded: (state) => {
      state.adsLoading = false;
    }
  },
  extraReducers: {
   
     [fetchAds.fulfilled] : (state, action) => {
      state.ads =  action.payload.data.data;
      state.meta = action.payload.data
    },

    [fetchItems.fulfilled] : (state, action) => {
        state.items =  action.payload.data 
      },

    [fetchAd.fulfilled] : (state, action) => {
      if(action.payload.data.ad.item){
        state.ad =  {
          ...state.ad, ...action.payload.data.ad.ad,
           ...action.payload.data.ad.item 
          }
      }else{
        state.ad =  {
          ...state.ad, ...action.payload.data.ad, 
          }
      }
     state.similarAds = action.payload.data.similar_ads
    },

    [fetchRecentAds.fulfilled]: (state, action) => {
      state.recentAds =  action.payload.data
    },
    
    [fetchChildOptions.fulfilled]: (state, action) => {
      state.childItems =  action.payload.data
    },
    [fetchCategoryLocation.fulfilled] : (state, action) => {
        state.categoryLocations =  action.payload.data
      },
  }

});
export const {
 addFilters,
 adsLoading,
 adsLoaded,
} = adsSlice.actions


export const adsSelector = createSelector(
   (state) => ({
        ads: state.ads.ads,
        ad: state.ads.ad,
       recentAds: state.ads.recentAds,
       childItems: state.ads.childItems,
       items: state.ads.items,
       categoryLocations: state.ads.categoryLocations,
       filters: state.ads.filters,
       meta: state.ads.meta,
       adsLoading: state.ads.adsLoading,
       similarAds: state.ads.similarAds,
    }),

    (state) => state
)

export default adsSlice.reducer
