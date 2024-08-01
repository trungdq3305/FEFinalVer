import React, { useEffect, useState } from 'react'
import GoldTable from '../Components/Gold/GoldTable'
import { getAllGold, updateGold } from '../Configs/axios'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Box,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material'

const ManageGold = () => {
  const [loading, setLoading] = useState(false)

  const [gold, setGold] = useState([])

  const fetchGold = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await axios.get(
        '/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v'
      )
      const goldList = res.data.DataList.Data
      console.log(res)
      goldList.forEach((element, index) => {
        if (index == 8) return
        const rowNumber = element['@row']
        console.log(index)
        const modifiedDate = new Date(Date.now()).toISOString()
        let goldJson = {
          goldId: String(index + 1),
          goldName: element[`@n_${rowNumber}`],
          purchasePrice: element[`@pb_${rowNumber}`],
          salePrice: element[`@ps_${rowNumber}`],
          // modifiedDate: modifiedDate,
          kara: element[`@k_${rowNumber}`],
          goldPercent: element[`@h_${rowNumber}`],
          worldPrice: element[`@pt_${rowNumber}`],
        }
        console.log(goldJson)
        const update = updateGold(goldJson)
        console.log(update)
        loadGolds()
      })
      toast.success('Fetch Gold successfully')
    } catch (error) {
      console.error('Error fetching the gold price:', error)
    } finally {
      setLoading(false)
    }
  }
  const loadGolds = async () => {
    const result = await getAllGold()
    if (result !== null) {
      setGold(result.data)
    }

    console.log(result.data)
  }
  useEffect(() => {
    loadGolds()
  }, [])
  return (
    <div>
      <Box sx={{ backgroundColor: '#333', padding: '10px', margin: '10px' }}>
        <Typography variant="h6" sx={{ color: '#fff' }}>
          Manage Golds
        </Typography>
      </Box>
      <GoldTable goldList={gold} handleFetchGold={() => fetchGold()} />
      <ToastContainer />
    </div>
  )
}

export default ManageGold
