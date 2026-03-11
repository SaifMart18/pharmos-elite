import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Medicine } from './inventorySlice';

interface CartItem extends Medicine {
  quantity: number;
}

interface POSState {
  cart: CartItem[];
  total: number;
}

const initialState: POSState = {
  cart: [],
  total: 0,
};

const posSlice = createSlice({
  name: 'pos',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Medicine>) => {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
      state.total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      state.total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = posSlice.actions;
export default posSlice.reducer;
