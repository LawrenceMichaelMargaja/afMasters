import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DashboardState {
	display: string;
	isSideBarOpen: boolean;
}

const initialState: DashboardState = {
	display: "Capture Pages",
	isSideBarOpen: true,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setDisplayType: (state, action: PayloadAction<string>) => {
			state.display = action.payload;
		},
		toggleSidebar: (state) => {
			state.isSideBarOpen = !state.isSideBarOpen;
		},
	},
});

export const { setDisplayType, toggleSidebar } = dashboardSlice.actions;

export default dashboardSlice.reducer;
