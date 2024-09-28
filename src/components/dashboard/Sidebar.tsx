// import { Drawer, List, ListItem, ListItemText, IconButton, Divider, Typography, Box } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import { styled } from "@mui/material/styles";

// const drawerWidth = 240;
// const closedDrawerWidth = 80; // Width when closed

// const DrawerHeader = styled("div")(({ theme }) => ({
// 	display: "flex",
// 	alignItems: "center",
// 	padding: theme.spacing(0, 1),
// 	...theme.mixins.toolbar,
// 	justifyContent: "center",
// }));

// const SidebarTitle = styled(Typography)(({ theme }) => ({
// 	fontWeight: "bold",
// 	paddingLeft: theme.spacing(2),
// 	textAlign: "center",
// 	width: "100%",
// }));

// const StyledListItemText = styled(ListItemText)({
// 	textAlign: "center",
// });

// const Sidebar: React.FC<{
// 	open: boolean;
// 	onToggle: () => void;
// 	onItemClick: (page: string) => void;
// 	setSideBarData: (page: string) => void;
// }> = ({ open, onToggle, onItemClick, setSideBarData }) => {
// 	const handleItemClick = (page: string) => {
// 		onItemClick(page);
// 		setSideBarData(page);
// 	};

// 	return (
// 		<Drawer
// 			variant="persistent"
// 			anchor="left"
// 			open={true}
// 			sx={{
// 				width: open ? drawerWidth : closedDrawerWidth,
// 				flexShrink: 0,
// 				paddingTop: "1em",
// 				"& .MuiDrawer-paper": {
// 					width: open ? drawerWidth : closedDrawerWidth,
// 					boxSizing: "border-box",
// 					overflowX: "hidden",
// 					paddingTop: "1em",
// 				},
// 			}}
// 		>
// 			<DrawerHeader>
// 				{open && (
// 					<SidebarTitle variant="h6" noWrap>
// 						Affiliate Masters
// 					</SidebarTitle>
// 				)}
// 				<IconButton onClick={onToggle}>{open ? <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
// 			</DrawerHeader>
// 			<Divider />
// 			{open && (
// 				<List>
// 					{["Organizations", "Capture Pages", "Categories", "Users"].map((text) => (
// 						<ListItem key={text} onClick={() => handleItemClick(text)}>
// 							<StyledListItemText primary={text} />
// 						</ListItem>
// 					))}
// 				</List>
// 			)}
// 		</Drawer>
// 	);
// };

// export default Sidebar;

import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean;
}>(({ theme }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	variants: [
		{
			props: ({ open }) => open,
			style: {
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			},
		},
	],
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(["margin", "width"], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export default function Sidebar() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="fixed"
				open={open}
				style={{ backgroundColor: "transparent", boxShadow: "none", width: "fit-content", left: 0 }}
			>
				<Toolbar>
					<IconButton
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={[
							{
								mr: 2,
							},
							open && { display: "none" },
						]}
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<div style={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>Affiliate Masters</div>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{["Organization", "Capture Pages"].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
}
