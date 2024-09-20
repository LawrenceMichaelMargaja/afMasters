import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
	Checkbox,
	Button,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store"; // Adjust the import based on your store location
import {
	toggleCheckbox,
	selectAll,
	deleteItem,
	editItem,
} from "../../store/reducers/organization";
import EditModal from "../modal/EditModal";

const DataSheet: React.FC = ({ sidebarData }: any) => {
	const dispatch = useDispatch();
	const dataType = useSelector((state: any) => state.dataSheet.dataType);

	const organizations = useSelector(
		(state: RootState) => state.dataSheet.organizations
	);
	const capturePages = useSelector(
		(state: RootState) => state.dataSheet.capturePages
	);
	const checkedItems = useSelector(
		(state: RootState) => state.dataSheet.checkedItems
	);

	const handleCheckboxChange = (index: number) =>
		dispatch(toggleCheckbox(index));

	const handleSelectAllToggle = () => dispatch(selectAll());

	const handleDelete = (index: number) => dispatch(deleteItem(index));

	const handleEdit = (index: number) => {
		const updatedItem =
			dataType === "Organizations"
				? { ...organizations[index], organization: "Updated Org" }
				: { ...capturePages[index], name: "Updated Name" };
		dispatch(editItem({ index, updatedItem }));
	};

	const allSelected =
		checkedItems.length ===
		(dataType === "Organizations" ? organizations.length : capturePages.length);

	const data = dataType === "Organizations" ? organizations : capturePages;

	const titleData = [
		[
			"Organization",
			"Is Active",
			"User",
			"Created By",
			"Created At",
			"Last Updated At",
		],
		[
			"Name",
			"HTML",
			"Clicks",
			"Capture Page Set ID",
			"Is Control",
			"Impressions",
			"Last Impression At",
			"Created By",
			"Created At",
			"Last Updated At",
			"Is Active",
		],
	];

	const renderEle = (data: string[]) => {
		return data.map((e) => (
			<TableCell align="center">
				<Typography variant="h6">{e}</Typography>
			</TableCell>
		));
	};

	const renderData = (data: string[]) => {
		return Object.keys(data).map((key: any) =>
			key === "is_control" || key === "is_active" || key === "isActive" ? (
				<TableCell align="center">{JSON.stringify(data[key])}</TableCell>
			) : (
				<TableCell align="center">{data[key]}</TableCell>
			)
		);
	};

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [selectedItem, setSelectedItem] = useState<number | null>(null);
	return (
		<React.Fragment>
			{selectedItem != null ? (
				<EditModal
					open={open}
					handleClose={handleClose}
					data={data}
					sidebarData={sidebarData}
					selectedItem={selectedItem}
				/>
			) : null}
			<TableContainer style={{ marginTop: "1em" }} component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center" style={{ width: "50px" }}>
								<Button
									variant="contained"
									onClick={handleSelectAllToggle}
									style={{ width: "150px" }}
								>
									{allSelected ? "Select None" : "Select All"}
								</Button>
							</TableCell>
							{dataType === "Organizations"
								? renderEle(titleData[0])
								: renderEle(titleData[1])}
							<TableCell align="center">
								<Typography variant="h6">Edit</Typography>
							</TableCell>
							<TableCell align="center">
								<Typography variant="h6">Delete</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row: any, index) => (
							<TableRow
								key={index}
								sx={{
									backgroundColor: index % 2 === 0 ? "#f7e1f0" : "#d0e7ff",
								}}
							>
								<TableCell align="center">
									<Checkbox
										checked={checkedItems.includes(index)}
										onChange={() => handleCheckboxChange(index)}
									/>
								</TableCell>
								{dataType === "Organizations"
									? renderData(row)
									: renderData(row)}
								<TableCell
									align="center"
									onClick={() => {
										setSelectedItem(index);
									}}
								>
									<IconButton onClick={() => (handleEdit(index), handleOpen())}>
										<EditIcon />
									</IconButton>
								</TableCell>
								<TableCell align="center">
									<IconButton onClick={() => handleDelete(index)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
};

export default DataSheet;
