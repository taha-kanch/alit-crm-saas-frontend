import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    monthlyLeadData: [],
    error: '',
};
const leadAnalyticsSlice = createSlice({
    name: 'monthlyLeadData',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successLeadAnalyticsReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.monthlyLeadData = action.payload.data;
        },
        failedLeadAnalyticsReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successLeadAnalyticsReducer, failedLeadAnalyticsReducer, loaderListener } = leadAnalyticsSlice.actions;

export default leadAnalyticsSlice.reducer;
