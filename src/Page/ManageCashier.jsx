/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button, TextField , Typography} from '@mui/material';
import { addCashier, getAllCashier, searchCashier } from '../Configs/axios';
import CashierTable from '../Components/CashierTable/CashierTable';
import AddCashierDialog from '../Components/CashierTable/AddCashierDialog';
import CounterIncomeDialog from '../Components/CashierTable/CounterIncomeDialog';
import { getAllUsers } from '../Configs/axios';
const ManageCashier = () => {
  const [loading, setLoading] = useState(true);
  const [cashiers, setCashiers] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openIncomeDialog, setOpenIncomeDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    const result = await getAllUsers();
    setUsers(result.data.data);
  };


  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenIncomeDialog = () => {
    setOpenIncomeDialog(true);
  };

  const handleCloseIncomeDialog = () => {
    setOpenIncomeDialog(false);
  };

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadCashier();
    } else {
      const result = await searchCashier(searchValue);
      setCashiers(result.data.data);
    }
  };

  const loadCashier = async () => {
    setLoading(true);
    const result = await getAllCashier();
    setCashiers(result.data);
    console.log(result);
    setLoading(false);
  };

  const handleAddCashier = async (formData) => {
    try {
      const updatedFormData = {
        ...formData,
        cashNumber: Number(formData.cashNumber),
      };
      const result = await addCashier(updatedFormData);
      if (result.code === 400) {
        window.alert(result.message);
      } else {
        console.log(result.data);
        handleCloseAddDialog();
        loadCashier();
      }
    } catch (error) {
      window.alert(error);
      console.error('Error adding user:', error);
    }
  };

  const initialFormData = {
    startCash: '',
    endCash: '',
    cashNumber: '',
    userId: ''
  };

  useEffect(() => {
    loadCashier();
    loadUsers();

  }, []);
  
  if (loading) return <div>Loading....</div>;

  return (
    <>
    <Box sx={{ backgroundColor: '#333', padding: '10px', margin:'20px' }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>Manage Cashiers</Typography>
            </Box>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="20px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        maxWidth="1200px"
      >
        <Box display="flex">
          <Button
            onClick={handleOpenAddDialog}
            sx={{
              height: '50px',
              margin: '20px',
              backgroundColor: '#3baf80',
              color: 'white',
              border: '1px solid #3baf80',
              '&:hover': {
                backgroundColor: '#3baf80',
                borderColor: '#3baf80',
              },
            }}
          >
            Add Cashier
          </Button>
          <Button
            onClick={handleOpenIncomeDialog}
            sx={{
              height: '50px',
              margin: '20px',
              backgroundColor: '#3baf80',
              color: 'white',
              border: '1px solid #3baf80',
              '&:hover': {
                backgroundColor: '#3baf80',
                borderColor: '#3baf80',
              },
            }}
          >
            View Income
          </Button>
        </Box>
        <TextField
          id="filled-search"
          label="Search"
          type="search"
          variant="filled"
          style={{ width: '300px' }}
          onChange={onSearchTextChange}
        />
      </Box>
      <AddCashierDialog
        openDialog={openAddDialog}
        handleCloseDialog={handleCloseAddDialog}
        onAddCashier={handleAddCashier}
        initialFormData={initialFormData}
        users={users}

      />
      <CounterIncomeDialog
        openDialog={openIncomeDialog}
        handleCloseDialog={handleCloseIncomeDialog}
      />
      <CashierTable cashiers={cashiers} users={users} />
    </Box></>
  );
};

export default ManageCashier;
