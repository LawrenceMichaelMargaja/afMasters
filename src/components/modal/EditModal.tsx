import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { useState } from "react";

const style = {
	position: "absolute" as "absolute",
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
	handleOpen: () => void;
	open: boolean;
	data: string[];
	selectedItem: number | null;
	handleClose: () => void;
}

export default function EditModal({
	handleOpen,
	open,
	handleClose,
	data,
	selectedItem,
}: EditModalProps) {
	return (
		<div>
			<Button onClick={handleOpen}>
				<EditIcon />
			</Button>
			<Modal
				disableEnforceFocus
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Input value={data[+selectedItem].name} />
						<Input value={data[+selectedItem].html} />
						<Input value={data[+selectedItem].clicks} />
						<Input value={data[+selectedItem].capture_page_set_id} />
						<Input value={data[+selectedItem].is_control} />
						<Input value={data[+selectedItem].impressions} />
						<Input value={data[+selectedItem].created_by} />
						<Input value={data[+selectedItem].created_at} />
						<Input value={data[+selectedItem].last_updated_at} />
						<Input value={data[+selectedItem].is_active} />
						<Typography id="transition-modal-title" variant="h6" component="h2">
							Text in a modal
						</Typography>
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
