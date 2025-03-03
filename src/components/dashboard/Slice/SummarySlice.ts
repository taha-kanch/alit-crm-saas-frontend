import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    summary: [],
    error: '',
};
const summarySlice = createSlice({
    name: 'summary',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successSummaryReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.summary = action.payload.data;
        },
        failedSummaryReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successSummaryReducer, failedSummaryReducer, loaderListener } = summarySlice.actions;

export default summarySlice.reducer;
