import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import CashBill from '../Components/CashBill/CashBill'
import { getCashBill } from '../Configs/axios'
import {
  Box,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'

const HistoryPage = () => {
  const [loading, setLoading] = useState(false)
  const [cash, setCash] = useState(0)
  const [card, setCard] = useState(0)
  const [length, setLenght] = useState(0)
  const [cashBill, setCashBill] = useState([])
  const [payment, setPayment] = useState(0)
  const [type, setType] = useState(3)

  const fetchCashBill = async (_payment, _type) => {
    setLoading(true)
    try {
      const res = await getCashBill(_payment, _type)
      console.log(res.data)
      await setCashBill(res.data)
    } catch (error) {
      console.error('Failed to fetch cash bill:', error)
    } finally {
      setLoading(false)
    }
  }

  const cashIcome = async () => {
    try {
      const res = await getCashBill(1, 3)

      const cash = res.data
      if (!Array.isArray(cash)) return 0
      const cashIn = cash.reduce((total, bill) => total + bill.totalCost, 0)
      setCash(cashIn)
    } catch (error) {
      console.error('Failed to fetch cash bill:', error)
      return 0
    }
  }
  const cardIcome = async () => {
    try {
      const res = await getCashBill(2, 3)

      const cash = res.data
      if (!Array.isArray(cash)) return 0
      const cardIn = cash.reduce((total, bill) => total + bill.totalCost, 0)
      setCard(cardIn)
    } catch (error) {
      console.error('Failed to fetch cash bill:', error)
      return 0
    }
  }
  const calculateTotalCost = (bills) => {
    if (!Array.isArray(bills)) return 0
    return bills.reduce((total, bill) => total + bill.totalCost, 0)
  }

  useEffect(() => {
    fetchCashBill(0, 3), cashIcome(), cardIcome()
  }, [])

  const totalCost = calculateTotalCost(cashBill)

  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Box sx={{ marginTop: 5, marginLeft: 5 }}>
          <h3 style={{ color: '#cc3366' }}>Number of bill</h3>
          <p style={{ fontWeight: 'bolder' }}>{cashBill.length}</p>
          <h3 style={{ color: '#cc3366' }}>Total Income</h3>
          <p style={{ fontWeight: 'bolder' }}>{totalCost}</p>
          <h3 style={{ color: '#cc3366' }}>Cash Income</h3>
          <p style={{ fontWeight: 'bolder' }}>{cash}</p>
          <h3 style={{ color: '#cc3366' }}>Card Income</h3>
          <p style={{ fontWeight: 'bolder' }}>{card}</p>
          <TextField
            select
            label="Payment"
            onChange={(e) => setPayment(e.target.value)}
            sx={{ width: { xs: '100%', sm: '150px', margin: 10 } }}
          >
            <MenuItem value="0">All</MenuItem>
            <MenuItem value="1">Pay by Cash</MenuItem>
            <MenuItem value="2">Pay by card</MenuItem>
          </TextField>
          <TextField
            select
            label="Bill type"
            onChange={(e) => setType(e.target.value)}
            sx={{ width: { xs: '100%', sm: '150px', margin: 10 } }}
          >
            <MenuItem value="3">All</MenuItem>
            <MenuItem value="0">Import bill</MenuItem>
            <MenuItem value="1">Sale bill</MenuItem>
          </TextField>
          <Box sx={{}}>
            <Button
              variant="contained"
              onClick={() => fetchCashBill(payment, type)}
              sx={{
                background: 'black',
                color: '#ffdbf0',
                marginLeft: '10px ',
                marginTop: '10px',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box>
          {' '}
          {loading ? (
            <CircularProgress />
          ) : (
            <CashBill
              cashBill={cashBill}
              totalCost={totalCost}
              sx={{ border: '1px solid grey' }}
              reload={() => fetchCashBill(0, 3)}
            />
          )}
        </Box>
      </Box>
    </>
  )
}

export default HistoryPage
