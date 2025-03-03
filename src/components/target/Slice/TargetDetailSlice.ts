import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    targetDetail: [],
    error: '',
};
const targetDetailSlice = createSlice({
    name: 'targetDetail',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successTargetDetailReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.targetDetail = action.payload.data;
        },
        failedTargetDetailReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successTargetDetailReducer, failedTargetDetailReducer, loaderListener } = targetDetailSlice.actions;

export default targetDetailSlice.reducer;
