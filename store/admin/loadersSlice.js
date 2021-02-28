
import { createSlice, createSelector} from '@reduxjs/toolkit';


/**
 * loaders slice
 */
const loadersSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading: false,
        status: 'idle',
        progress: false,
    },

    reducers: {
        startLoading: (state) => {
            state.loading = true
        },
        endLoading: (state) => {
            state.loading = false
        },
        statusIdle: (state) => {
        state.status = 'idle'
       },
        statusSucceeded: (state) => {
        state.status = 'succeeded'
       },
        statusRejected: (state) => {
        state.status = 'rejected'
       },

       progressStart: (state) => {
        state.progress = true
       },
       progressEnd: (state) => {
        state.progress = false
       }
    }
})


export const {
    startLoading, endLoading,
    statusIdle, statusSucceeded,
    statusRejected, progressStart,
    progressEnd
} = loadersSlice.actions

export const loadersSelector = createSelector(
   (state) => ({
        loading: state.loaders.loading,
        status: state.loaders.status,
        progress: state.loaders.progress
    }),

    (state) => state
)

export default loadersSlice.reducer
