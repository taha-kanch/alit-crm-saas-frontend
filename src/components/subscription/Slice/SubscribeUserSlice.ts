import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    subscribeUser: {},
    error: '',
    openFromPage: null,
};
const subscribeUserSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successSubscribeUserReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.subscribeUser = action.payload.data;
            state.openFromPage = action.payload.openFromPage;
        },
        failedSubscribeUserReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successSubscribeUserReducer, failedSubscribeUserReducer, loaderListener } = subscribeUserSlice.actions;

export default subscribeUserSlice.reducer;
