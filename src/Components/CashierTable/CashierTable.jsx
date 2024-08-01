import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Button,
  IconButton,
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import UpdateCashierDialog from './UpdateCashierDialog';
import { updateCashier } from '../../Configs/axios';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const initialFormData = {
  startCash: '',
  endCash: '',
  cashNumber: '',
  userId: '',
  status: '',
  income: '',
  cashId: ''
};

const CashierTable = ({ cashiers, users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [updateData, setUpdateData] = useState(initialFormData);
  const [cashierList, setCashierList] = useState(cashiers);

  useEffect(() => {
    setCashierList(cashiers);
  }, [cashiers]);

  const handleUpdate = async (updatedCashier) => {
    try {
      const result = await updateCashier(updatedCashier);
      setCashierList((prev) =>
        prev.map((cashier) =>
          cashier.cashId === updatedCashier.cashId ? updatedCashier : cashier
        )
      );
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating cashier:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd HH:mm');
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cashierList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <UpdateCashierDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onUpdateCashier={handleUpdate}
        formData={updateData}
        setFormData={setUpdateData}
        users={users}
      />
      <TableContainer
        component={Paper}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Table stickyHeader aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Id</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Start Date</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>End Date</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Income(VND)</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Cashier Number</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>User Id</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            {(rowsPerPage > 0
              ? cashierList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              : cashierList
            ).map((cashier) => (
              <TableRow key={cashier.cashId}>
                <TableCell component="th" scope="row">
                  {cashier.cashId}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {formatDate(cashier.startCash)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {formatDate(cashier.endCash)}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {cashier.income}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {cashier.cashNumber}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {cashier.userId}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {cashier.status}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
      <IconButton
        onClick={() => {
          handleOpenDialog();
          setUpdateData({
            ...initialFormData,
            ...cashier,
          });
        }}
        sx={{
          color: '#FFA500',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#D5E3F7',
          },
        }}
      >
        <EditIcon />
      </IconButton>
    </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
               style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={8}
                count={cashierList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

CashierTable.propTypes = {
  cashiers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default CashierTable;