import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import DataSheet from "../../components/dashboard/DataSheet";
import {useState} from "react";
import {styled} from "@mui/material";

const Organization = () => {

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: '1em',
    }));

    const AppContainer = styled('div')<{ open: boolean }>(({ open }) => ({
        display: 'flex',
        justifyContent: open ? 'flex-start' : 'center',
        alignItems: 'stretch',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#efefef'
    }));

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <AppContainer open={sidebarOpen}>
                <Sidebar open={sidebarOpen} onToggle={toggleSidebar} />
                <Main open={sidebarOpen}>
                    <Header  page={"Organizations"}/>
                    <DataSheet/>
                </Main>
            </AppContainer>
        </>
    )
}
export default Organization;