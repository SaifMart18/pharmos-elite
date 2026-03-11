import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Medicine {
  id: string;
  name: string;
  barcode: string;
  category: string;
  price: number;
  stock: number;
  expiryDate: string;
}

interface InventoryState {
  medicines: Medicine[];
  loading: boolean;
}

const initialState: InventoryState = {
  medicines: [
    { id: '1', name: 'Amoxicillin 500mg', barcode: '123456789', category: 'Antibiotics', price: 15.5, stock: 45, expiryDate: '2026-12-01' },
    { id: '2', name: 'Paracetamol 500mg', barcode: '987654321', category: 'Analgesics', price: 5.0, stock: 120, expiryDate: '2025-08-15' },
    { id: '3', name: 'Ibuprofen 400mg', barcode: '456123789', category: 'Anti-inflammatory', price: 8.25, stock: 8, expiryDate: '2025-05-20' },
  ],
  loading: false,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addMedicine: (state, action: PayloadAction<Medicine>) => {
      state.medicines.push(action.payload);
    },
    updateStock: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const med = state.medicines.find(m => m.id === action.payload.id);
      if (med) med.stock += action.payload.quantity;
    },
  },
});

export const { addMedicine, updateStock } = inventorySlice.actions;
export default inventorySlice.reducer;
