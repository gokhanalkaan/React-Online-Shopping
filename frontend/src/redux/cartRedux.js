import { createSlice } from "@reduxjs/toolkit";
import { persistor } from "./store";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const addedProduct = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (
        addedProduct &&
        addedProduct.color === action.payload.color &&
        addedProduct.size === action.payload.size
      ) {
        const filteredProducts = state.products.map(
          (product) => product._id !== addedProduct._id
        );
        state.total -= addedProduct.price * addedProduct.quantity;
        addedProduct.quantity += action.payload.quantity;

        const updatedTotal = (state.total +=
          addedProduct.price * addedProduct.quantity);

        state = {
          ...state,
          products: [...filteredProducts, addedProduct],
          total: updatedTotal,
        };
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      }
    },

    increseProductQuantity: (state, action) => {
      state.products[action.payload].quantity += 1;
      state.total += state.products[action.payload].price;
    },

    decreaseProductQuantity: (state, action) => {
      state.products[action.payload].quantity -= 1;
      state.total -= state.products[action.payload].price;
    },

    deleteProduct: (state, action) => {
      const deletedProduct = state.products.find(
        (product) => product._id === action.payload
      );

      const updatedProducts = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.total -= deletedProduct.price * deletedProduct.quantity;
      state.quantity -= 1;
      state.products = [...updatedProducts];
    },
    deleteAllProduct: (state) => {
      /*persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });*/

      //state=initialState;
      state.products = [];
      state.quantity = 0;
      state.total = 0;

      // console.log(state)
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  decreaseProductQuantity,
  increseProductQuantity,
  deleteProduct,
  deleteAllProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
