import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { searchUser, updateUser } from '../Configs/axios'
import { TextField, Button, Box, Paper } from '@mui/material'
import ChangePasswordDialog from '../Components/Profile/ChangePasswordDialog'
import background from '../assets/Login.png'
import Header from '../Components/Header/Header'
const Profile = () => {
  const { userId } = useParams()
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    userId: '',
    username: '',
    fullName: '',
    dateOfBirth: '',
    phone: '',
    address: '',
  })
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)

  const getUser = async () => {
    try {
      const result = await searchUser(userId)
      const user = Array.isArray(result.data.data)
        ? result.data.data[0]
        : result.data.data

      setUserData({
        userId: user.userId || '',
        username: user.username || '',
        fullName: user.fullName || '',
        dateOfBirth: user.doB || '',
        phone: user.phone || '',
        address: user.address || '',
      })
    } catch (error) {
      console.error('Error searching user', error)
    }
  }

  useEffect(() => {
    getUser()
  }, [userId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser({
        username: userData.username,
        fullName: userData.fullName,
        dateOfBirth: userData.dateOfBirth,
        phone: userData.phone,
        address: userData.address,
      })
      alert('User data updated successfully')
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update user data')
    }
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
  }

  const openPasswordDialog = () => {
    setIsPasswordDialogOpen(true)
  }

  const closePasswordDialog = () => {
    setIsPasswordDialogOpen(false)
  }

  return (
    <>
      <Header></Header>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ``,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '80%',
            maxWidth: '600px',
            backgroundColor: 'rgba(128, 128, 128, 0.5)',
            borderRadius: '10px',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
          >
            <h1
              style={{
                fontFamily: 'Roboto, sans-serif',
                color: 'black',
                fontSize: '2rem',
              }}
            >
              Profile
            </h1>
            <TextField
              label="User ID"
              name="userId"
              value={userData.userId}
              variant="outlined"
              fullWidth
              disabled
            />
            <TextField
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <TextField
              label="Full Name"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <TextField
              label="Date of Birth"
              name="dateOfBirth"
              value={userData.dateOfBirth}
              onChange={handleChange}
              variant="outlined"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <TextField
              label="Address"
              name="address"
              value={userData.address}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: !isEditing,
              }}
            />
            <Box mt={2}>
              <Button
                onClick={toggleEdit}
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: '50px',
                  backgroundColor: '#e39994',
                  color: 'white',
                  border: '1px solid #e39994',
                  '&:hover': {
                    backgroundColor: '#e39994',
                    borderColor: 'white',
                  },
                }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              {isEditing && (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: '50px',
                    backgroundColor: '#e39994',
                    color: 'white',
                    border: '1px solid #e39994',
                    ml: 2,
                  }}
                >
                  Save Changes
                </Button>
              )}
              <Button
                onClick={openPasswordDialog}
                variant="contained"
                color="secondary"
                sx={{
                  borderRadius: '50px',
                  backgroundColor: '#e39994',
                  color: 'white',
                  border: '1px solid #e39994',
                  ml: 2,
                }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Paper>
        <ChangePasswordDialog
          open={isPasswordDialogOpen}
          onClose={closePasswordDialog}
        />
      </Box>
    </>
  )
}

export default Profile
