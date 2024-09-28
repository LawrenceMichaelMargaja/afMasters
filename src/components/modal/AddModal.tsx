import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useSelector } from "react-redux";

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

export default function AddModal() {
	const data = useSelector((state: any) => state.dataSheet);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	function hh() {
		return Object.values(data.capturePages[0]).map((e) => console.log(e));
	}

	hh();
	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{Object.keys(data.capturePages[0]).map((key: any) => (
						<>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								Add a new {key}
							</Typography>
							<TextField fullWidth margin="normal" label="user" name="user" required />
						</>
					))}
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography>
					<Button variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }}>
						Save Changes
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
