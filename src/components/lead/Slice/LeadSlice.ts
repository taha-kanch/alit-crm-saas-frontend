import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    leads: [],
    error: '',
};
const leadSlice = createSlice({
    name: 'lead',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successLeadReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.leads = action.payload.data;
        },
        failedLeadReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successLeadReducer, failedLeadReducer, loaderListener } = leadSlice.actions;

export default leadSlice.reducer;
