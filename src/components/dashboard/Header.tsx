import { Card, Grid2, Typography } from "@mui/material";
import AddModal from "../modal/AddModal";

const Header: React.FC<{ page: string }> = ({ page }) => {
	return (
		<Grid2 container alignItems="center" justifyContent="center" style={{ width: "100%", marginBottom: "15px" }}>
			<Card
				elevation={3}
				style={{
					padding: "16px",
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h5">{page}</Typography>
				<AddModal />
			</Card>
		</Grid2>
	);
};

export default Header;
