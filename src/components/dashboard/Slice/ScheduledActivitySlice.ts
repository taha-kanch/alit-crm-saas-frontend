import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    scheduledActivity: [],
    error: '',
};
const scheduledActivitySlice = createSlice({
    name: 'scheduledActivity',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successScheduledActivityReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.scheduledActivity = action.payload.data;
        },
        failedScheduledActivityReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successScheduledActivityReducer, failedScheduledActivityReducer, loaderListener } = scheduledActivitySlice.actions;

export default scheduledActivitySlice.reducer;
