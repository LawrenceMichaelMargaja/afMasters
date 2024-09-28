import ButtonComponent from "../../atoms/button/Button";
import { Card, Grid2 } from "@mui/material";

const Header: React.FC<{ page: string }> = ({ page }) => {
	const getButtonLabel = (page: string) => {
		switch (page) {
			case "Organizations":
				return { add: "Add Organization" };
			case "Capture Pages":
				return { add: "Add Capture Page" };
			case "Categories":
				return { add: "Add Category" };
			case "Users":
				return { add: "Add User" };
			default:
				return { add: "Add Capture Page" };
		}
	};

	const { add } = getButtonLabel(page);

	return (
		<Grid2
			style={{
				width: "100%",
				height: "5%",
				margin: "0 auto 15px",
				backgroundColor: "#fff",
				alignItems: "center",
			}}
		>
			<Card
				style={{
					backgroundColor: "#fff",
					border: "1px grey solid",
					padding: "10px 1em",
					width: "100%",
					height: "100%",
					margin: "0 auto",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<h2>{page}</h2>
				<div>
					<ButtonComponent
						name={add}
						fontWeight={"bold"}
						margin={"0 1em 0 0"}
						variant={"contained"}
						styledColor={"grey"}
					/>
				</div>
			</Card>
		</Grid2>
	);
};

export default Header;
