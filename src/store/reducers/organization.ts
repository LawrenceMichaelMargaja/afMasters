import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Organization type
interface Organization {
    user: string;
    isActive: boolean;
    organization: string;
    createdBy: string;
    createdAt: string;
    lastUpdatedAt: string;
}

// Define the CapturePage type
interface CapturePage {
    name: string;
    html: string;
    clicks: number;
    capture_page_set_id: string;
    is_control: boolean;
    impressions: number;
    last_impression_at: string;
    created_by: string;
    created_at: string;
    last_updated_at: string;
    is_active: boolean;
}

// Define the state structure
interface AppState {
    dataType: 'organization' | 'capturePage'; // Current data type being managed
    organizations: Organization[];
    capturePages: CapturePage[];
    checkedItems: number[];
}

const initialState: AppState = {
    dataType: 'organization',
    organizations: [
        { user: 'Demby Abella', isActive: true, organization: 'Org A', createdBy: 'demby.abella', createdAt: '2024-01-15', lastUpdatedAt: '2024-01-15' },
        { user: 'Lawrence Margaja', isActive: true, organization: 'Org B', createdBy: 'lawrence.margaja', createdAt: '2024-02-20', lastUpdatedAt: '2024-01-15' },
        { user: 'Younes Outerbah', isActive: true, organization: 'Org C', createdBy: 'younes.outerbah', createdAt: '2024-03-10', lastUpdatedAt: '2024-01-15' },
    ],
    capturePages: [
        {
            name: "Demby's Capture Page",
            html: '<html lang="">Page A content</html>',
            clicks: 120,
            capture_page_set_id: '1',
            is_control: true,
            impressions: 5000,
            last_impression_at: '2024-08-10',
            created_by: 'Demby Abella',
            created_at: '2024-01-15',
            last_updated_at: '2024-08-12',
            is_active: true,
        },
        {
            name: "Lawrence's Capture Page",
            html: '<html lang="">Page B content</html>',
            clicks: 85,
            capture_page_set_id: '2',
            is_control: false,
            impressions: 3000,
            last_impression_at: '2024-08-15',
            created_by: 'Lawrence Margaja',
            created_at: '2024-02-20',
            last_updated_at: '2024-08-12',
            is_active: false,
        },
        {
            name: "Younes' Capture Page",
            html: '<html lang="">Page C content</html>',
            clicks: 85,
            capture_page_set_id: '3',
            is_control: false,
            impressions: 3000,
            last_impression_at: '2024-08-15',
            created_by: 'Younes Outerbah',
            created_at: '2024-02-20',
            last_updated_at: '2024-08-12',
            is_active: false,
        },
    ],
    checkedItems: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDataType: (state, action: PayloadAction<string>) => {
            state.dataType = action.payload;
        },
        toggleCheckbox: (state, action: PayloadAction<number>) => {
            if (state.checkedItems.includes(action.payload)) {
                state.checkedItems = state.checkedItems.filter((item) => item !== action.payload);
            } else {
                state.checkedItems.push(action.payload);
            }
        },
        selectAll: (state) => {
            const dataLength = state.dataType === 'Organizations' ? state.organizations.length : state.capturePages.length;
            if (state.checkedItems.length === dataLength) {
                state.checkedItems = [];
            } else {
                state.checkedItems = Array.from({ length: dataLength }, (_, i) => i);
            }
        },
        deleteItem: (state, action: PayloadAction<number>) => {
            if (state.dataType === 'Organizations') {
                state.organizations = state.organizations.filter((_, index) => index !== action.payload);
            } else {
                state.capturePages = state.capturePages.filter((_, index) => index !== action.payload);
            }
            state.checkedItems = state.checkedItems.filter((item) => item !== action.payload);
        },
        editItem: (state, action: PayloadAction<{ index: number, updatedItem: Organization | CapturePage }>) => {
            const { index, updatedItem } = action.payload;
            if (state.dataType === 'Organizations') {
                state.organizations[index] = updatedItem as Organization;
            } else {
                state.capturePages[index] = updatedItem as CapturePage;
            }
        },
    },
});

export const { setDataType, toggleCheckbox, selectAll, deleteItem, editItem } = appSlice.actions;
export default appSlice.reducer;
