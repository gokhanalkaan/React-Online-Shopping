import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  count: 0,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    favoriteProduct: (state, action) => {
      const foundedProduct = state.products.find(
        (p) => p._id === action.payload._id
      );
      if (foundedProduct) return;

      state.products.push(action.payload);
      state.count += 1;
    },
    unfavoriteProduct: (state, action) => {
      const filteredProducts = state.products.filter(
        (product) => product._id !== action.payload
      );
      console.log(action.payload);
      state.products = [...filteredProducts];
      state.count -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { favoriteProduct, unfavoriteProduct } = favoritesSlice.actions;
export default favoritesSlice.reducer;
