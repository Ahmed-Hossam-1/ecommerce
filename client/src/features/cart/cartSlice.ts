import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/type";

interface CartState {
  items: Product[];
}

export const totalAmount = (state: Product[]) => {
  return state.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

const loadCartFromLocalStorage = (): CartState => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : { items: [] };
};

const saveCartToLocalStorage = (cart: CartState) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id !== String(action.payload)
      );
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
