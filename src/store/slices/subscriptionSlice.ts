import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SubscriptionPlan = 'BASIC' | 'PRO' | 'ELITE';

interface SubscriptionState {
  plan: SubscriptionPlan;
}

const initialState: SubscriptionState = {
  plan: 'ELITE', // Defaulting to Elite for demo purposes
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<SubscriptionPlan>) => {
      state.plan = action.payload;
    },
  },
});

export const { setPlan } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
