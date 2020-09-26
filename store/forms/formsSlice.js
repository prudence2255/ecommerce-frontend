
import { createSlice, createSelector} from '@reduxjs/toolkit'


  
 const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    schemaObject: {},
  },
  reducers: {
    setErrors: (state, action) => {
        state.schemaObject = action.payload
    }
  },
  
});

export const {
   setErrors
} = formsSlice.actions


export const formSelector = createSelector(
   (state) => ({
        schemaObject: state.forms.schemaObject,
    }),

    (state) => state
)

export default formsSlice.reducer
