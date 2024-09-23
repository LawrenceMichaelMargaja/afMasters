import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editItem } from "../../store/reducers/organization";

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
	const dispatch = useDispatch();
	const [formData, setFormData] = useState<any>({});

	useEffect(() => {
		if (selectedItem !== null && data[selectedItem]) {
			setFormData(data[selectedItem]);
		}
	}, [selectedItem, data]);

	if (selectedItem === null || !data[selectedItem]) return null;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev: any) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSave = () => {
		if (selectedItem !== null) {
			dispatch(editItem({ index: selectedItem, updatedItem: formData }));
			handleClose();
		}
	};

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
					{Object.keys(formData).map((key) => (
						<TextField
							key={key}
							fullWidth
							margin="normal"
							label={key.charAt(0).toUpperCase() + key.slice(1)}
							name={key}
							value={formData[key]}
							onChange={handleChange}
							required
						/>
					))}
					<Button
						onClick={handleSave}
						variant="contained"
						color="primary"
						fullWidth
					>
						Save Changes
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
