import { createSlice, createSelector} from '@reduxjs/toolkit';


/**
 * errors slice //catches errors from api calls from
 * all other slices
 */
const errorsSlice = createSlice({
    name: 'errors',
    initialState: {
        error: null
    },
    reducers: {
        setErrors: (state, action) => {
        state.error = Object.values(action.payload.value.error.errors).flat()
        },
        clearErrors: (state) => {
            state.error = null
        }
    }
})

export const {
    setErrors,
    clearErrors
} = errorsSlice.actions

export const errorsSelector = createSelector(
    (state) => ({
         error : state.errors.error,
     }),
 
     (state) => state
 )
 
 export default errorsSlice.reducer