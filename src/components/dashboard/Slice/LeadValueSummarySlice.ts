import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    leadValueSummary: [],
    error: '',
};
const leadValueSummarySlice = createSlice({
    name: 'leadValueSummary',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successLeadValueSummaryReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.leadValueSummary = action.payload.data;
        },
        failedLeadValueSummaryReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successLeadValueSummaryReducer, failedLeadValueSummaryReducer, loaderListener } = leadValueSummarySlice.actions;

export default leadValueSummarySlice.reducer;
