import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    activities: [],
    error: '',
};
const activitySlice = createSlice({
    name: 'activity',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successActivityReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.activities = action.payload.data;
        },
        failedActivityReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successActivityReducer, failedActivityReducer, loaderListener } = activitySlice.actions;

export default activitySlice.reducer;
