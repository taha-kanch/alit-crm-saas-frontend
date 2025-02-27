import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    subscriptions: [],
    error: '',
};
const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successSubscriptionReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.subscriptions = action.payload.data;
        },
        failedSubscriptionReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successSubscriptionReducer, failedSubscriptionReducer, loaderListener } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
