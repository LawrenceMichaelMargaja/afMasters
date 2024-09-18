import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store'; // Adjust the import based on your store location
import { toggleCheckbox, selectAll, deleteItem, editItem } from '../../store/reducers/organization';

const DataSheet: React.FC = () => {
    const dispatch = useDispatch();
    const dataType = useSelector((state: RootState) => state.dataSheet.dataType);
    const organizations = useSelector((state: RootState) => state.dataSheet.organizations);
    const capturePages = useSelector((state: RootState) => state.dataSheet.capturePages);
    const checkedItems = useSelector((state: RootState) => state.dataSheet.checkedItems);

    const handleCheckboxChange = (index: number) => {
        dispatch(toggleCheckbox(index));
    };

    const handleSelectAllToggle = () => {
        dispatch(selectAll());
    };

    const handleDelete = (index: number) => {
        dispatch(deleteItem(index));
    };

    const handleEdit = (index: number) => {
        const updatedItem = dataType === 'Organizations'
            ? { ...organizations[index], organization: 'Updated Org' }
            : { ...capturePages[index], name: 'Updated Name' };
        dispatch(editItem({ index, updatedItem }));
    };

    const allSelected = checkedItems.length === (dataType === 'Organizations' ? organizations.length : capturePages.length);

    const data = dataType === 'Organizations' ? organizations : capturePages;

    return (
        <TableContainer style={{ marginTop: '1em' }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ width: '50px' }}>
                            <Button
                                variant="contained"
                                onClick={handleSelectAllToggle}
                                style={{ width: '150px' }}
                            >
                                {allSelected ? 'Select None' : 'Select All'}
                            </Button>
                        </TableCell>
                        {dataType === 'Organizations' ? (
                            <>
                                <TableCell align="center"><Typography variant="h6">Organization</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Is Active</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">User</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Created By</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Created At</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Last Updated At</Typography></TableCell>
                            </>
                        ) : (
                            <>
                                <TableCell align="center"><Typography variant="h6">Name</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">HTML</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Clicks</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Capture Page Set ID</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Is Control</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Impressions</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Last Impression At</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Created By</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Created At</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Last Updated At</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Is Active</Typography></TableCell>
                            </>
                        )}
                        <TableCell align="center"><Typography variant="h6">Edit</Typography></TableCell>
                        <TableCell align="center"><Typography variant="h6">Delete</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                backgroundColor: index % 2 === 0 ? '#f7e1f0' : '#d0e7ff',
                            }}
                        >
                            <TableCell align="center">
                                <Checkbox
                                    checked={checkedItems.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </TableCell>
                            {dataType === 'Organizations' ? (
                                <>
                                    <TableCell align="center">{row.organization}</TableCell>
                                    <TableCell align="center">{JSON.stringify(row.isActive)}</TableCell>
                                    <TableCell align="center">{row.user}</TableCell>
                                    <TableCell align="center">{row.createdBy}</TableCell>
                                    <TableCell align="center">{row.createdAt}</TableCell>
                                    <TableCell align="center">{row.lastUpdatedAt}</TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.html}</TableCell>
                                    <TableCell align="center">{row.clicks}</TableCell>
                                    <TableCell align="center">{row.capture_page_set_id}</TableCell>
                                    <TableCell align="center">{JSON.stringify(row.is_control)}</TableCell>
                                    <TableCell align="center">{row.impressions}</TableCell>
                                    <TableCell align="center">{row.last_impression_at}</TableCell>
                                    <TableCell align="center">{row.created_by}</TableCell>
                                    <TableCell align="center">{row.created_at}</TableCell>
                                    <TableCell align="center">{row.last_updated_at}</TableCell>
                                    <TableCell align="center">{JSON.stringify(row.is_active)}</TableCell>
                                </>
                            )}
                            <TableCell align="center">
                                <IconButton onClick={() => handleEdit(index)}>
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
    );
};

export default DataSheet;
