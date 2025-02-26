import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    userProfileDetail: [],
    error: '',
};
const userProfileDetailSlice = createSlice({
    name: 'userProfileDetail',
    initialState,
    reducers: {
        loaderListener: (state, action) => {
            state.loading = action.payload.loading;
        },
        successUserProfileDetailReducer: (state, action) => {
            state.loading = action.payload.loading;
            state.userProfileDetail = action.payload.data;
        },
        failedUserDetailReducer: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});
export const { successUserProfileDetailReducer, failedUserDetailReducer, loaderListener } = userProfileDetailSlice.actions;

export default userProfileDetailSlice.reducer;
