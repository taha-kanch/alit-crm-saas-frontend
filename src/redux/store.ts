import { combineReducers, configureStore } from '@reduxjs/toolkit'
// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authSlice from '@/components/auth/Slice/authSlice';
import userProfileDetailSlice from '@/components/user-profile/Slice/UserProfileSlice';
import leadSlice from '@/components/lead/Slice/LeadSlice';
import leadDetailSlice from '@/components/lead/Slice/LeadDetailSlice';
import activitySlice from '@/components/activities/Slice/ActivitySlice';
import activityDetailSlice from '@/components/activities/Slice/ActivityDetailSlice';

const persistConfig = {
    debug: false,
    key: 'root',
    keyPrefix: 'v.1',
    storage,
    blacklist: [],
    // add reducer name to persist
    whitelist: ['auth']
}

const rootReducer = combineReducers({
"auth": authSlice,
"userProfileDetail": userProfileDetailSlice,
"leads": leadSlice,
"leadDetail": leadDetailSlice,
"activities": activitySlice,
"activityDetail": activityDetailSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(logger)
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store)
