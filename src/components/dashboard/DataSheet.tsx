import React, { useEffect, useState } from "react";
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
} from "../../store/reducers/organization";
import EditModal from "../modal/EditModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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

	// const renderEle = (data: string[]) => {
	// 	return data.map((e) => (
	// 		<TableCell align="center">
	// 			<Typography variant="h6" fontSize={16}>
	// 				{e}
	// 			</Typography>
	// 		</TableCell>
	// 	));
	// };

	// const renderData = (data: string[]) => {
	// 	return Object.keys(data).map((key: any) =>
	// 		key === "is_control" || key === "is_active" || key === "isActive" ? (
	// 			<TableCell align="center">{JSON.stringify(data[key])}</TableCell>
	// 		) : (
	// 			<TableCell align="center">{data[key]}</TableCell>
	// 		)
	// 	);
	// };

	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [selectedItem, setSelectedItem] = useState<number | null>(null);

	const [change, setChange] = useState<number>(0);

	useEffect(() => {
		if (sidebarData === "Capture Pages") {
			setChange(1);
		} else {
			setChange(0);
		}
	}, [sidebarData]); 

	const columns: GridColDef[] = titleData[change].map((e) => ({
		field: e.toLowerCase().replace(/\s+/g, ""), // Field names in lowercase without spaces
		headerName: e, 
	}));


	const rows = data.map((item, index) => {
		if (change === 0) {
			return {
				id: index + 1,
				user: item.user,
				createdat: item.createdAt,
				createdby: item.createdBy,
				isactive: JSON.stringify(item.isActive),
				lastupdatedAt: item.lastUpdatedAt,
				organization: item.organization,
			};
		} else {
			return {
				id: index + 1,
				name: item.name,
				html: item.html,
				clicks: item.clicks,
				capturepagesetid: item.capture_page_set_id,
				iscontrol: item.is_control,
				impressions: item.impressions,
				lastimpressionat: item.last_impression_at,
				createdby: item.created_by,
				createdat: item.created_at,
				lastupdatedat: item.last_updated_at,
				isactive: item.is_active,
			};
		}
	});

	const paginationModel = { page: 0, pageSize: 5 };

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

			{/* <TableContainer style={{ marginTop: "1em" }} component={Paper}>
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
									<IconButton onClick={() => handleOpen()}>
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
			</TableContainer> */}
			<Paper sx={{ height: 400, width: "100%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					checkboxSelection
					sx={{ border: 0 }}
				/>
			</Paper>
		</React.Fragment>
	);
};

export default DataSheet;
