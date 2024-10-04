import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store"; // Adjust the import based on your store location
import { toggleCheckbox, selectAll, deleteItem } from "../../store/reducers/organization";
import EditModal from "../modal/EditModal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const DataSheet: React.FC = ({ sidebarData }: any) => {
	const dispatch = useDispatch();
	const dataType = useSelector((state: any) => state.dataSheet.dataType);

	const { organizations, capturePages, checkedItems } = useSelector((state: RootState) => state.dataSheet);

	const handleDelete = (index: number) => dispatch(deleteItem(index));

	const allSelected =
		checkedItems.length === (dataType === "Organizations" ? organizations.length : capturePages.length);

	const data = dataType === "Organizations" ? organizations : capturePages;

	// Header titles
	const titleData = [
		["Organization", "Is Active", "User", "Created By", "Created At", "Last Updated At"],
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

	const [open, setOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<number | null>(null);
	const handleClose = () => setOpen(false);
	const handleOpen = (index: number) => {
		setOpen(true);
		setSelectedItem(index);
	};

	const [change, setChange] = useState<number>(0);

	useEffect(() => {
		if (sidebarData === "Capture Pages") {
			setChange(1);
		} else {
			setChange(0);
		}
	}, [sidebarData]);

	const columns: GridColDef[] = [
		...titleData[change].map((e) => ({
			field: e.toLowerCase().replace(/\s+/g, ""), // Field names in lowercase without spaces
			headerName: e,
			flex: 1,
		})),
		{
			field: "actions",
			headerName: "Actions",
			renderCell: (params) => (
				<>
					<EditIcon style={{ cursor: "pointer", marginRight: 16 }} onClick={() => handleOpen(params.row.id)} />
					<DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDelete(params.row.id)} />
				</>
			),
			width: 100,
		},
	];

	const rows = data.map((item, index) => {
		if (change === 0) {
			return {
				id: index,
				user: item.user,
				createdat: item.createdAt,
				createdby: item.createdBy,
				isactive: JSON.stringify(item.isActive),
				lastupdatedat: item.lastUpdatedAt,
				organization: item.organization,
			};
		} else {
			return {
				id: index,
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
		<>
			{selectedItem != null ? (
				<EditModal
					open={open}
					handleClose={handleClose}
					data={data}
					sidebarData={sidebarData}
					selectedItem={selectedItem}
				/>
			) : null}
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
		</>
	);
};

export default DataSheet;
