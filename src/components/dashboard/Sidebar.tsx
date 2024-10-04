import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Divider,
	Typography,
	Box,
	ListItemButton,
	ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { styled } from "@mui/material/styles";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 240;
const closedDrawerWidth = 80; // Width when closed

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "center",
}));

const SidebarTitle = styled(Typography)(({ theme }) => ({
	fontWeight: "bold",
	paddingLeft: theme.spacing(2),
	textAlign: "center",
	width: "100%",
}));

const StyledListItemText = styled(ListItemText)({
	textAlign: "center",
});

const icons = [<InboxIcon />, <MailIcon />, <CategoryIcon />, <GroupIcon />];

const Sidebar: React.FC<{
	open: boolean;
	onToggle: () => void;
	onItemClick: (page: string) => void;
	setSideBarData: (page: string) => void;
}> = ({ open, onToggle, onItemClick, setSideBarData }) => {
	const handleItemClick = (page: string) => {
		onItemClick(page);
		setSideBarData(page);
	};

	return (
		<Drawer
			variant="persistent"
			anchor="left"
			open={true}
			sx={{
				width: open ? drawerWidth : closedDrawerWidth,
				flexShrink: 0,
				paddingTop: "1em",
				"& .MuiDrawer-paper": {
					width: open ? drawerWidth : closedDrawerWidth,
					boxSizing: "border-box",
					overflowX: "hidden",
					paddingTop: "1em",
				},
			}}
		>
			<DrawerHeader>
				{open && (
					<SidebarTitle variant="h6" noWrap>
						Affiliate Masters
					</SidebarTitle>
				)}
				<IconButton onClick={onToggle}>{open ? <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
			</DrawerHeader>
			<Divider />
			{open && (
				<List>
					{["Organizations", "Capture Pages", "Categories", "Users"].map((text, index) => (
						<ListItem key={text} onClick={() => handleItemClick(text)} disablePadding>
							<ListItemButton>
								<ListItemIcon>{icons[index]}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			)}
		</Drawer>
	);
};

export default Sidebar;
