import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboard';
import organizationReducer from "./reducers/organization.ts"; // Your reducer

// Configure the store with reducers
const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        dataSheet: organizationReducer,
    },
});

// Types for dispatch and state
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
