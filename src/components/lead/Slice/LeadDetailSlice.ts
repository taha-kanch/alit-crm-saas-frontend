import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    leadDetail: [],
    error: '',
};
const leadDetailSlice = createSlice({
    name: 'leadDetail',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successLeadDetailReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.leadDetail = action.payload.data;
        },
        failedLeadDetailReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successLeadDetailReducer, failedLeadDetailReducer, loaderListener } = leadDetailSlice.actions;

export default leadDetailSlice.reducer;
