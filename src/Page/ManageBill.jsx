import React, { useEffect, useState } from 'react'
import {
  Box,
  Paper,
  CircularProgress,
  TextField,
  Button,
  MenuItem,
  Typography,
} from '@mui/material'
import SortAscIcon from '@mui/icons-material/ArrowUpward'
import SortDescIcon from '@mui/icons-material/ArrowDownward'
import BillTable from '../Components/ManageBill/BillTable'
import { getAllBills, getAllBills1, getAllBills2 } from '../Configs/axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ManagerSideBar from '../Components/Sidebar/ManagerSideBar'

const ManageBill = () => {
  const [bills, setBills] = useState([])
  const [loading, setLoading] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [cashNumber, setCashNumber] = useState('')

  const formatDate = (date) => date || ''

  const loadBills = async (
    axiosFunc,
    startDate,
    endDate,
    cashNumber,
    sortByTotalCost,
    sortByTotalCostDesc
  ) => {
    setLoading(true)
    try {
      const result = await axiosFunc(
        formatDate(startDate),
        formatDate(endDate),
        cashNumber,
        sortByTotalCost,
        sortByTotalCostDesc
      )
      setBills(Array.isArray(result.data) ? result.data : [])
    } catch (error) {
      console.error('Error loading bills:', error)
      toast.error('Error loading bills. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBills(getAllBills, startDate, endDate, cashNumber, '', '')
  }, [startDate, endDate, cashNumber])

  const handleSearch = (axiosFunc, sortByTotalCost, sortByTotalCostDesc) => {
    loadBills(
      axiosFunc,
      startDate,
      endDate,
      cashNumber,
      sortByTotalCost,
      sortByTotalCostDesc
    )
  }

  return (
    <>
      <ToastContainer />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <ManagerSideBar />
        <Box sx={{ flexGrow: 1, overflow: 'auto', padding: 3 }}>
          <Paper
            sx={{
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#333',
                padding: '10px',
                marginBottom: '20px',
              }}
            >
              <Typography variant="h6" sx={{ color: '#fff' }}>
                Manage Bills
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: { xs: '100%', sm: '200px' } }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ width: { xs: '100%', sm: '200px' } }}
              />
              <TextField
                select
                label="Cashier"
                value={cashNumber}
                onChange={(e) => setCashNumber(e.target.value)}
                sx={{ width: { xs: '100%', sm: '150px' } }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </TextField>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="outlined"
                  onClick={() => handleSearch(getAllBills, '', '')}
                  sx={{
                    borderColor: '#2596be',
                    color: 'white',
                    borderRadius: 2,
                    backgroundColor: '#2596be',
                    '&:hover': {
                      borderColor: '#1e88e5',
                      color: '#1e88e5',
                      backgroundColor: 'rgba(30, 136, 229, 0.1)',
                    },
                    textTransform: 'none',
                  }}
                  startIcon={<SortAscIcon />}
                >
                  Total Cost
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleSearch(getAllBills2, true, true)}
                  sx={{
                    borderColor: '#f44336',
                    color: 'white',
                    borderRadius: 2,
                    backgroundColor: '#f44336',
                    '&:hover': {
                      borderColor: '#c62828',
                      color: '#c62828',
                      backgroundColor: 'rgba(198, 40, 40, 0.1)',
                    },
                    textTransform: 'none',
                  }}
                  startIcon={<SortDescIcon />}
                >
                  Total Cost
                </Button>
              </Box>
            </Box>
            {loading ? (
              <CircularProgress />
            ) : (
              <BillTable
                bills={bills}
                reload={() =>
                  loadBills(getAllBills, startDate, endDate, cashNumber, '', '')
                }
              />
            )}
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default ManageBill
