import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setDisplayType, toggleSidebar } from "./store/reducers/dashboard";
import Sidebar from "./components/dashboard/Sidebar";
import Header from "./components/dashboard/Header";
import DataSheet from "./components/dashboard/DataSheet";
import { setDataType } from "./store/reducers/organization";
import { RootState } from "./store/store";
import TableTwo from "./components/dashboard/TableTwo";
import EditModal from "./components/modal/EditModal";
import AddModal from "./components/modal/AddModal";

const theme = createTheme();
// const WIDTH_THRESHOLD = 998; // Set your desired width threshold

const App: React.FC = () => {
	const display = useSelector((state: RootState) => state.dashboard.display);
	const isSideBarOpen = useSelector((state: RootState) => state.dashboard.isSideBarOpen);
	const dispatch = useDispatch();

	const handleSidebarClick = (page: string) => {
		dispatch(setDisplayType(page));
		dispatch(setDataType(page));
	};

	const handleSidebarToggle = () => {
		dispatch(toggleSidebar());
	};

	const Main = styled("main", {
		shouldForwardProp: (prop) => prop !== "open",
	})<{ open: boolean }>(({ theme }) => ({
		flexGrow: 1,
		width: "100%",
		padding: theme.spacing(3, 6),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	}));

	const AppContainer = styled("div")<{ open: boolean }>(({ theme }) => ({
		display: "flex",
		height: "100vh",
		backgroundColor: "#efefef",
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	}));

	const [sidebarData, setSideBarData] = useState<string>(display);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 998 && isSideBarOpen) {
				dispatch(toggleSidebar());
			}
		};

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isSideBarOpen, dispatch]);

	const newData = sidebarData;

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppContainer open={isSideBarOpen}>
				<Sidebar
					open={isSideBarOpen}
					onToggle={handleSidebarToggle}
					onItemClick={handleSidebarClick}
					setSideBarData={setSideBarData}
				/>
				<Main open={isSideBarOpen} style={{ overflowX: "hidden" }}>
					<Header page={display} />
					<DataSheet sidebarData={newData} />
					<AddModal />
				</Main>
			</AppContainer>
		</ThemeProvider>
	);
};

export default App;
