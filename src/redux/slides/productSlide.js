import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const productSlide = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload
    },
    clearSearch: (state) => {
      state.search = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct, clearSearch } = productSlide.actions

export default productSlide.reducer