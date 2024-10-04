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
	width: 1200,
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

	const cpModalData = ["Capture page name:", "Add your capture page code below:"];

	return (
		<div>
			<Button onClick={handleOpen} variant="contained">
				ADD CAPTURE PAGE
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography variant="h3" component="h2" style={{ marginBottom: "30px" }}>
						Add a Capture Page
					</Typography>

					{cpModalData.map((val) => (
						<>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								{val}
							</Typography>
							{val === "Add your capture page code below:" ? (
								<textarea
									style={{ width: "100%", height: "400px", padding: "10px", marginTop: "10px" }}
									aria-label={val}
									placeholder="your html code goes here"
								/>
							) : (
								<TextField fullWidth margin="normal" label={val} name={val} required />
							)}
						</>
					))}

					<div style={{ display: "flex", gap: 12 }}>
						<Button variant="contained" color="primary" fullWidth style={{ marginTop: "10px" }}>
							Save Changes
						</Button>
						<Button onClick={handleClose} variant="contained" color="error" fullWidth style={{ marginTop: "10px" }}>
							Cancel
						</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
