import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField, Typography } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

interface EditModalProps {
	open: boolean;
	data: any[];
	selectedItem: number | null;
	sidebarData: any;
	handleClose: () => void;
}

export default function EditModal({
	open,
	handleClose,
	data,
	selectedItem,
	sidebarData,
}: EditModalProps) {
	if (selectedItem === null || !data[selectedItem]) return null;

	const selectedData = data[selectedItem];
	console.log(selectedData);
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography variant="h6" gutterBottom>
						Edit {sidebarData}
					</Typography>
					{Object.keys(selectedData).map((key) => (
						<TextField
							key={key}
							fullWidth
							margin="normal"
							label={key.charAt(0).toUpperCase() + key.slice(1)}
							name={key}
							value={selectedData[key]}
							required
						/>
					))}
				</Box>
			</Modal>
		</div>
	);
}
