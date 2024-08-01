import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@mui/material'
import { getAllGem } from '../../Configs/axios'

const AddProductDialog = ({
  openDialog,
  handleCloseDialog,
  onAddProduct,
  initialFormData,
  goldData,
}) => {
  const [formData, setFormData] = useState(initialFormData)
  const [propChecks, setPropChecks] = useState({})
  const [gemData, setGemData] = useState([])
  const [gemAmounts, setGemAmounts] = useState({})

  useEffect(() => {
    setFormData(initialFormData)
    getGemList()
  }, [initialFormData])

  const handleChange = (event) => {
    const { name, value } = event.target

    // Ensure numerical fields are validated
    if (
      ['weight', 'machiningCost', 'size', 'amount', 'markupRate'].includes(name)
    ) {
      const parsedValue = parseFloat(value)
      if (isNaN(parsedValue) || parsedValue < 0) return
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: parsedValue,
      }))
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }))
    }
  }

  const handleCheckChange = (event) => {
    const { name, checked } = event.target
    const gemKey = name // Use name directly as gemKey

    if (checked) {
      setPropChecks((prevChecks) => ({
        ...prevChecks,
        [name]: checked,
      }))
      setGemAmounts((prevAmounts) => ({
        ...prevAmounts,
        [gemKey]: { gemId: '', amount: '' },
      }))
    } else {
      const newChecks = { ...propChecks }
      delete newChecks[name]
      setPropChecks(newChecks)

      const newAmounts = { ...gemAmounts }
      delete newAmounts[gemKey]
      setGemAmounts(newAmounts)
    }
  }

  const handleGemChange = (event) => {
    const { name, value } = event.target
    const gemKey = name.split('.')[0] // Extract gem key

    setGemAmounts((prevAmounts) => ({
      ...prevAmounts,
      [gemKey]: {
        ...prevAmounts[gemKey],
        gemId: value,
      },
    }))
  }

  const handleAmountChange = (event) => {
    const { name, value } = event.target
    const gemKey = name.split('.')[0] // Extract gem key

    const parsedValue = parseFloat(value)
    if (isNaN(parsedValue) || parsedValue < 0) return

    setGemAmounts((prevAmounts) => ({
      ...prevAmounts,
      [gemKey]: {
        ...prevAmounts[gemKey],
        amount: parsedValue,
      },
    }))
  }

  const handleAddProduct = () => {
    const updatedGemData = {}
    Object.keys(gemAmounts).forEach((key) => {
      const { gemId, amount } = gemAmounts[key]
      if (gemId && amount) {
        updatedGemData[gemId] = parseInt(amount, 10)
      }
    })

    const updatedFormData = {
      ...formData,
      gem: updatedGemData,
    }
    onAddProduct(updatedFormData)
    setFormData(initialFormData) // Reset the form
    setGemAmounts({})
    setPropChecks({})
  }

  const getGemList = async () => {
    try {
      const result = await getAllGem()
      if (result.isSuccess) {
        setGemData(result.data)
        const initialPropChecks = result.data.reduce((acc, gem, index) => {
          acc[`gemProp${index + 1}`] = false
          return acc
        }, {})
        setPropChecks(initialPropChecks)
      }
    } catch (error) {
      console.error('Error fetching gem data:', error)
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <Paper
          variant="outlined"
          component="form"
          sx={{ margin: 2, padding: 2 }}
        >
          {/* Other form fields */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="productName"
            label="Product Name"
            value={formData.productName}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Necklace">Necklace</MenuItem>
              <MenuItem value="Bracelet">Bracelet</MenuItem>
              <MenuItem value="Ring">Ring</MenuItem>
              <MenuItem value="Charm">Charm</MenuItem>
              <MenuItem value="Earing">Earing</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Material</InputLabel>
            <Select
              name="material"
              value={formData.material}
              onChange={handleChange}
            >
              {goldData && goldData.length > 0 ? (
                goldData.map((gold) => (
                  <MenuItem key={gold.goldId} value={gold.goldName}>
                    {gold.goldName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            name="weight"
            label="Weight"
            type="number"
            value={formData.weight || ''}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">grams</InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="machiningCost"
            label="Machining Cost"
            type="number"
            value={formData.machiningCost || ''}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">VND</InputAdornment>,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="size"
            label="Size"
            type="number"
            value={formData.size || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount"
            type="number"
            value={formData.amount || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="desc"
            label="Description"
            value={formData.desc}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="image"
            label="Image"
            value={formData.image}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="markupRate"
            label="Markup Rate"
            type="number"
            value={formData.markupRate || ''}
            onChange={handleChange}
          />

          {gemData.map((gem, index) => (
            <div key={gem.gemId}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={propChecks[`gemProp${index + 1}`] || false}
                    onChange={handleCheckChange}
                    name={`gemProp${index + 1}`}
                  />
                }
                label={`Add Gem ${index + 1}`}
              />
              {propChecks[`gemProp${index + 1}`] && (
                <div>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Gem Type</InputLabel>
                    <Select
                      name={`gemProp${index + 1}.gemId`}
                      value={gemAmounts[`gemProp${index + 1}`]?.gemId || ''}
                      onChange={handleGemChange}
                    >
                      {gemData.map((g) => (
                        <MenuItem key={g.gemId} value={g.gemId}>
                          {g.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    margin="normal"
                    fullWidth
                    name={`gemProp${index + 1}.amount`}
                    label="Amount"
                    type="number"
                    value={gemAmounts[`gemProp${index + 1}`]?.amount || ''}
                    onChange={handleAmountChange}
                  />
                </div>
              )}
            </div>
          ))}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={handleAddProduct} variant="contained" color="primary">
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddProductDialog
