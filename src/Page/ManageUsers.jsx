/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { addUser, getAllUsers, searchUser } from '../Configs/axios';
import UserTable from '../Components/UserTable/UserTable';
import AddUserDialog from '../Components/UserTable/AddUserDialog';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadAllUsers();
    } else {
      try {
        const result = await searchUser(searchValue);
        setUsers(result.data.data);
      } catch (error) {
        console.error('Error searching users:', error);
      }
    }
  };
  const handleUpdateUserStatus = (userId) => {
    setUsers((prevUsers) => 
      prevUsers.map((user) => 
        user.userId === userId ? { ...user, status: !user.status } : user
      )
    );
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialFormData = {
    role: '',
    fullName: '',
    doB: '',
    phone: '',
    address: ''
  };

  const roleMapping = [
    { id: 1, label: 'Staff' },
    { id: 2, label: 'Manager' },
    { id: 3, label: 'Admin' }
  ];

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      setUsers(result.data.data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (formData) => {
    try {
      const result = await addUser(formData);
      if (result.code === 400) {
        window.alert(result.message);
      } else {
        handleCloseDialog();
        loadAllUsers();
      }
    } catch (error) {
      window.alert(error);
      console.error('Error adding user:', error);
    }
  };
  const handleUpdateRole = (userId, newRoleId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userId === userId ? { ...user, role: newRoleId } : user
      )
    );
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <>
     <Box sx={{ backgroundColor: '#333', padding: '10px', margin:'20px' }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>Manage Users</Typography>
            </Box>
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      margin="20px"
    >
      <Button onClick={handleOpenDialog} sx={{
        height: '50px', margin: '10px', backgroundColor: '#3baf80',
        color: 'white',
        border: '1px solid #3baf80',
        '&:hover': {
          backgroundColor: '#3baf80',
          borderColor: '#3baf80',
        },
      }}>
        Add User
      </Button>
      <TextField
        id="filled-search"
        label="Search"
        type="search"
        variant="filled"
        style={{ width: '300px', marginLeft: '600px', marginBottom: ' 10px' }}
        onChange={onSearchTextChange}
      />

      <AddUserDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        onAddUser={handleAddUser}
        initialFormData={initialFormData}
        roleMapping={roleMapping}
      />
      <UserTable users={users} onUpdateUserStatus={handleUpdateUserStatus} onUpdateRole={handleUpdateRole}
 />
    </Box></>
  );
};

export default ManageUsers;
