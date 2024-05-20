import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderItems: []
}

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const newItem = action.payload.orderItems
      const existingItem = state?.orderItems?.find((item) => item?.product === newItem.product)
      if (existingItem) {
        if (existingItem.quantity < newItem.stock) {
          existingItem.quantity += newItem?.quantity
        }
      } else {
        state.orderItems.push(newItem)
      }
    },
    increaseQuantity: (state, action) => {
      const idProduct = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      itemOrder.quantity++
    },
    decreaseQuantity: (state, action) => {
      const idProduct = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      itemOrder.quantity--
    },
    setQuantity: (state, action) => {
      const { idProduct, quantity } = action.payload
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
      if (quantity <= itemOrder.stock) {
        itemOrder.quantity = quantity
      }
    },
    removeOrderProduct: (state, action) => {
      const idProduct = action.payload
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
      state.orderItems = itemOrder
    },
    removeAllOrderProduct: (state, action) => {
      state.orderItems = []
    },
  },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increaseQuantity, decreaseQuantity, setQuantity, removeOrderProduct, removeAllOrderProduct } = orderSlide.actions

export default orderSlide.reducer