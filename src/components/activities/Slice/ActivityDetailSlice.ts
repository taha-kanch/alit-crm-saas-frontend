import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    activityDetail: [],
    error: '',
};
const activityDetailSlice = createSlice({
    name: 'activityDetail',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successActivityDetailReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.activityDetail = action.payload.data;
        },
        failedActivityDetailReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successActivityDetailReducer, failedActivityDetailReducer, loaderListener } = activityDetailSlice.actions;

export default activityDetailSlice.reducer;
