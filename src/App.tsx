import { CssBaseline, ThemeProvider, createTheme, styled } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store.ts';
import { setDisplayType, toggleSidebar } from '../store/reducers/dashboard';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import DataSheet from '../components/dashboard/DataSheet';
import {setDataType} from "../store/reducers/organization.ts";

const theme = createTheme();

const App: React.FC = () => {
    const display = useSelector((state: RootState) => state.dashboard.display);
    const isSideBarOpen = useSelector((state: RootState) => state.dashboard.isSideBarOpen);

    const dispatch = useDispatch();

    const handleSidebarClick = (page: string) => {
        dispatch(setDisplayType(page));
        dispatch(setDataType(page))
    };

    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
    };

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open: boolean }>(({ theme }) => ({
        flexGrow: 1,
        width: '100%',
        padding: theme.spacing(3, 6),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }));

    const AppContainer = styled('div')<{ open: boolean }>(({ theme }) => ({
        display: 'flex',
        // width: '100%',
        height: '100vh',
        backgroundColor: '#efefef',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    }));

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppContainer open={isSideBarOpen}>
                <Sidebar
                    open={isSideBarOpen}
                    onToggle={() => {
                        handleSidebarToggle();
                        console.log("the selector --- ", isSideBarOpen);
                    }}
                    onItemClick={handleSidebarClick}
                />
                <Main open={isSideBarOpen}>
                    <Header page={display} />
                    <DataSheet />
                </Main>
            </AppContainer>
        </ThemeProvider>
    );
};

export default App;
