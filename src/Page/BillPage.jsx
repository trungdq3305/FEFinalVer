import React, { useEffect, useState } from 'react'
import BillProduct from '../Components/BillProduct/BillProduct'
import styles from '../Page/Scss/Billpage.module.scss'
import Header from '../Components/Header/Header'
import BillInfor from '../Components/BillInfor/BillInfor'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CustomerList from '../Components/CustomerList/CustomerList'
import {
  createBill,
  createVnPay,
  getAllBill,
  getbillbyId,
  getCustomer,
  getVouchers,
  getVouchersv2,
  sendmail,
} from '../Configs/axios'
import PayByCashModal from '../Components/Payment/PayByCashModal'
import PaymentSuccess from '../Components/Payment/PaymentSuccess'
import axios from 'axios'
import { redirect } from 'react-router-dom'

const BillPage = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    maxHeight: '80vh', // maximum height for the modal
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
  }
  const [open, setOpen] = useState(false)
  const [openCash, setOpenCash] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const handleCloseSuccess = () => setOpenSuccess(false)
  const handleOpenCash = () => setOpenCash(true)
  const handleCloseCash = () => setOpenCash(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [billProduct, setBillProduct] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState()
  const [voucherList, setVoucherList] = useState([])
  const [voucher, setVoucher] = React.useState(0)
  const [costWithVoucher, setCostwithVoucher] = useState(0)
  const [change, setChange] = useState(0)
  const [cash, setCash] = useState(0)
  const [voucherId, setVoucherId] = useState('')
  const [billId, setBillId] = useState('')
  const [bill, setBill] = useState(null)
  const [paymentType, setPaymentType] = useState(1)

  const handleSetPayment = (e) => {
    setPaymentType(e.target.value)
    console.log(e.target.value)
  }

  function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
      }
    )
  }
  const inputCash = (e) => {
    if (e.target.value !== undefined) {
      setCash(e.target.value)
    }
  }
  const handlePayByCard = async () => {
    let formData = {
      orderId: generateUUID(),
      amount: parseFloat(totalCost),
      createdDate: new Date().toISOString(),
    }
    sessionStorage.setItem('billProducts', JSON.stringify(billProduct))
    sessionStorage.setItem('totalCost', totalCost.toString())
    sessionStorage.setItem('voucherCost', voucher.toString())
    sessionStorage.setItem('costWithVoucher', costWithVoucher.toString())
    sessionStorage.setItem('customerId', customer?.customerId || '')
    sessionStorage.setItem('voucherId', voucherId)
    const url = await createVnPay(formData)
    if (url.status === 200) {
      const res = redirect(url.data)
      console.log(res)
    } else {
      alert('Something went wrong')
    }
    console.log(url)
  }
  function redirect(url) {
    // This is a placeholder function. Replace with your actual redirect logic.
    window.location.href = url
    return 'Redirecting to payment page...'
  }
  const sendBill = async () => {
    if (customer) {
      alert('Send bill success')

      const sendingFormat = {
        information: `
          <div style="display: flex; flex-direction: row; align-items: center;">
            <div>
              <svg
                width="90"
                height="90"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="margin-top: 20px; color: green;"
              >
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 20C7.582 20 4 16.418 4 12C4 7.582 7.582 4 12 4C16.418 4 20 7.582 20 12C20 16.418 16.418 20 12 20Z" fill="currentColor"/>
              </svg>
            </div>
            <h1>Payment success</h1>
            <div style="display: flex; justify-content: space-around; align-items: flex-end;">
              <div style="margin-right: 70px;">
                <p>Bill No:</p>
                <p>Publish Day:</p>
                <p>Cashier:</p>
                <p>Customer:</p>
              </div>
              <div>
                <p>${bill.billId}</p>
                <p>${bill.publishDay}</p>
                <p>${bill.cashierId}</p>
                <p>${bill.customerId !== null ? bill.customerId : 'N/A'}</p>
              </div>
            </div>
            <div style="padding: 20px; width: 100%; position: sticky; top: 0; right: 0; height: 100%; color: white; font-family: Arial, sans-serif;">
              <div style="max-height: 70vh; overflow-y: auto;">
                <table style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
                  <thead>
                    <tr>
                      <th style="border: 1px solid #000000; padding: 10px; text-align: center; background-color: #cecece;">No.</th>
                      <th style="border: 1px solid #000000; padding: 10px; text-align: center; background-color: #cecece;">Product Name</th>
                      <th style="border: 1px solid #000000; padding: 10px; text-align: center; background-color: #cecece;">Quantity</th>
                      <th style="border: 1px solid #000000; padding: 10px; text-align: center; background-color: #cecece;">Price</th>
                      <th style="border: 1px solid #000000; padding: 10px; text-align: center; background-color: #cecece;">Price After Discount</th>
                      <th style="border: 1px solid #000000; padding: 10px; text-align: center; background-color: #cecece;">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${billProduct
                      .map(
                        (product, index) => `
                      <tr key="${index}">
                        <td style="border: 1px solid #000000; padding: 10px; text-align: center; color: #000000;">${
                          index + 1
                        }</td>
                        <td style="border: 1px solid #000000; padding: 10px; text-align: center; color: #000000;">${
                          product.Name
                        }</td>
                        <td style="border: 1px solid #000000; padding: 10px; text-align: center; color: #000000;">${
                          product.Quantity
                        }</td>
                        <td style="border: 1px solid #000000; padding: 10px; text-align: center; color: #000000;">${Number(
                          product.Price.toFixed(0)
                        ).toLocaleString('vn')} VND</td>
                        <td style="border: 1px solid #000000; padding: 10px; text-align: center; color: #000000;">${Number(
                          product.PriceWithDiscount.toFixed(0)
                        ).toLocaleString('vn')} VND</td>
                        <td style="border: 1px solid #000000; padding: 10px; text-align: center; color: #000000;">${Number(
                          (
                            product.PriceWithDiscount * product.Quantity
                          ).toFixed(0)
                        ).toLocaleString('vn')} VND</td>
                      </tr>
                    `
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
              <div style="text-align: left; font-size: 1em; display: flex; justify-content: space-between; align-items: flex-start; margin: 15px;">
                <div style="padding: 10px;">
                  
                  <p><strong>Cost: </strong></p>
                  <p><strong>Voucher: </strong></p>
                  <p style="font-size: 1.2em; margin-top: 10px; color: black; font-weight: bold;"><strong>Total Cost: </strong></p>
                </div>
                <div style="text-align: right; padding: 10px;">
                  
                  <p style="margin: 5px 0; color: black;"><strong>${Number(
                    totalCost.toFixed(0)
                  ).toLocaleString('vn')}</strong></p>
                  <p style="margin: 5px 0; color: black;"><strong>${Number(
                    voucher.toFixed(0)
                  ).toLocaleString('vn')}</strong></p>
                  <p style="margin: 5px 0; color: black;"><strong>${Number(
                    costWithVoucher.toFixed(0)
                  ).toLocaleString('vn')}</strong></p>
                </div>
              </div>
            </div>
          </div>
        `,
        subject: 'Payment Success',
        customer: bill.customer.email, // replace with actual customer email
      }

      // Example of using sendingFormat in an email

      console.log(sendingFormat)

      if (sendingFormat.customer !== null) {
        var res = await sendmail(sendingFormat)
      } else {
        alert('Invalid customer! Can not send bill')
      }
    } else {
      alert('Invalid customer')
    }
  }
  const handlecreateBill = async () => {
    let product = {}
    billProduct.forEach((p) => {
      product[p.Id] = p.Quantity
    })

    const initialdata = {
      product: {},
      voucherId: '',
      customerId: '',
      paymenttype: paymentType,
    }
    console.log(voucherId), console.log(customer)
    if (voucherId !== undefined || voucherId !== null) {
      initialdata.voucherId = voucherId
    }
    if (customer == undefined || customer == null) {
      initialdata.customerId = ''
    } else {
      console.log(customer)
      initialdata.customerId = customer.customerId
    }
    initialdata.product = product

    const result = await createBill(initialdata)

    if (!axios.isAxiosError(result)) {
      setOpenSuccess(true)
      console.log(result)
      setBillId(result.data.data.billId)
      setBill(result.data.data)
      sessionStorage.removeItem('cardValues')
      console.log(result)
    } else {
      alert(result.response.data.message)
    }
  }

  // useEffect(() => {
  //   const getBill = () => {
  //     if (billId) {
  //       const getAll = getbillbyId(billId)
  //       if (getAll.data.data[0] !== null) {
  //         console.log(getAll.data.data[0])
  //         setBill(getAll.data.data[0])
  //       }
  //     }
  //   }
  //   getBill()
  // }, [billId])

  const calculateChange = () => {
    const res = cash - totalCost
    setChange(res)
  }

  const handleChange = async (event) => {
    if (event.target.value !== 'none') {
      const params = {
        publishDay: {
          Year: '',
          Month: '',
          Day: '',
        },
        customerId: customer.customerId,
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        isActive: true,
        Id: event.target.value,
      }
      console.log(params)
      const vouchers = await getVouchersv2(params)
      console.log(vouchers.data)
      console.log(vouchers.data[0].cost)
      setVoucher(vouchers.data[0].cost)
      setVoucherId(vouchers.data[0].voucherId)
    } else {
      setVoucher(0)
      setVoucherId('')
    }
    console.log(event.target.value)
  }

  const loadCustomers = async () => {
    const result = await getCustomer()
    if (result !== null) {
      setCustomerList(result.data)
    }

    console.log(result.data)
  }

  const loadVouchers = async () => {
    try {
      const params = {
        publishDay: {
          Year: '',
          Month: '',
          Day: '',
        },
        customerId: customer.customerId,
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        isActive: true,
        Id: '',
      }
      console.log(params)
      const vouchers = await getVouchersv2(params)
      console.log(vouchers.data)
      setVoucherList(vouchers.data)
    } catch (error) {
      console.error(error)
    }
  }

  const loadBillProduct = () => {
    const productList = sessionStorage.getItem('cardValues')
    if (productList != null) {
      setBillProduct(JSON.parse(productList))
    }

    console.log(JSON.parse(productList))
  }

  const calculateCost = () => {
    const cost = billProduct.reduce(
      (total, card) => total + card.PriceWithDiscount * card.Quantity,
      0
    )
    setTotalCost(cost)
  }

  const calculateCostwVoucher = () => {
    const result = totalCost - voucher
    setCostwithVoucher(result)
  }

  const addCustomer = (cus) => {
    setCustomer(cus)
    handleClose()
  }

  useEffect(() => {
    loadBillProduct()
    loadCustomers()
  }, [])

  useEffect(() => {
    loadVouchers()
  }, [customer])

  useEffect(() => {
    calculateCostwVoucher()
  }, [voucher, calculateCostwVoucher])

  useEffect(() => {
    calculateCost()
  }, [billProduct])

  useEffect(() => {
    calculateChange()
  }, [cash])

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.bodyContainer}>
          <div className={styles.title}>
            <h2>Bill Summary</h2>
          </div>
          <div className={styles.body}>
            <BillInfor
              totalCost={totalCost}
              handlePayByCard={handlePayByCard}
              handleOpen={handleOpen}
              customer={customer}
              vouchers={voucherList}
              handleChange={handleChange}
              handleOpenCash={handleOpenCash}
              handlePaymentType={handleSetPayment}
              createBill={handlecreateBill}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CustomerList
                  customerList={customerList}
                  addCustomer={addCustomer}
                />
              </Box>
            </Modal>

            <Modal
              open={openSuccess}
              onClose={handleCloseSuccess}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <PaymentSuccess
                  sendBill={sendBill}
                  bill={bill}
                  products={billProduct}
                  totalCost={totalCost}
                  voucherCost={voucher}
                  costWithVoucher={costWithVoucher}
                />
              </Box>
            </Modal>
            <BillProduct
              products={billProduct}
              totalCost={totalCost}
              voucherCost={voucher}
              costWithVoucher={costWithVoucher}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default BillPage
