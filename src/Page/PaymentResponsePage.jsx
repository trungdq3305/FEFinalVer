import React, { useEffect, useState } from 'react'
import { createBill, reponseVnPay, sendmail } from '../Configs/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import PaymentSuccess from '../Components/Payment/PaymentSuccess'
import { Button } from '@mui/material'
import ErrorIcon from '@mui/icons-material/Error'

const PaymentResponsePage = () => {
  const [paymentResponse, setPaymentResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const [billProduct, setBillProduct] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [voucherCost, setVoucherCost] = useState(0)
  const [costWithVoucher, setCostWithVoucher] = useState(0)
  const [customerId, setCustomerId] = useState('')
  const [voucherId, setVoucherId] = useState('')
  const [bill, setBill] = useState(null)
  const navigate = useNavigate()
  const sendBill = async () => {
    if (customerId !== null) {
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
                  <p><strong>Voucher: </strong></p>
                  <p style="font-size: 1.2em; margin-top: 10px; color: black; font-weight: bold;"><strong>Total Cost: </strong></p>
                </div>
                <div style="text-align: right; padding: 10px;">
                  <p style="margin: 5px 0; color: black;"><strong>${Number(
                    voucherCost.toFixed(0)
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
        alert('Send bill success')
      } else {
        alert('Invalid customer! Can not send bill')
      }
    }
  }
  useEffect(() => {
    // Retrieve values from session storage
    const storedBillProducts = sessionStorage.getItem('billProducts')
    const storedTotalCost = sessionStorage.getItem('totalCost')
    const storedVoucherCost = sessionStorage.getItem('voucherCost')
    const storedCostWithVoucher = sessionStorage.getItem('costWithVoucher')
    const storedCustomerId = sessionStorage.getItem('customerId')
    const storedVoucherId = sessionStorage.getItem('voucherId')
    console.log(storedCostWithVoucher)
    if (storedBillProducts) {
      setBillProduct(JSON.parse(storedBillProducts))
    }
    if (storedTotalCost) {
      setTotalCost(parseFloat(storedTotalCost))
    }
    if (storedVoucherCost) {
      setVoucherCost(parseFloat(storedVoucherCost))
    }
    if (storedCostWithVoucher) {
      setCostWithVoucher(parseFloat(storedCostWithVoucher))
    }
    if (storedCustomerId) {
      setCustomerId(storedCustomerId)
    }
    if (storedVoucherId) {
      setVoucherId(storedVoucherId)
    }
  }, [])
  const createBillAsync = async (initialdata) => {
    try {
      const result = await createBill(initialdata)
      if (result.data?.code === 200) {
        console.log(result)
        setBill(result.data.data)
        sessionStorage.removeItem('cardValues')
      } else {
        console.error('Error creating bill:', result)
      }
    } catch (error) {
      console.error('Error creating bill:', error)
    }
  }
  useEffect(() => {
    const fetchPaymentResponse = async () => {
      try {
        const query = new URLSearchParams(location.search)
        const params = Object.fromEntries(query.entries())
        const response = await reponseVnPay(params)
        console.log(response)
        setPaymentResponse(response.data)
      } catch (error) {
        console.error('Error fetching payment response:', error)
        setLoading(false)
      } finally {
        setLoading(false)
      }
    }

    fetchPaymentResponse()
  }, [location])

  useEffect(() => {
    if (paymentResponse?.success === true) {
      let product = {}
      billProduct.forEach((p) => {
        product[p.Id] = p.Quantity
      })

      const initialdata = {
        product: {},
        voucherId: voucherId || '',
        customerId: customerId || '',
      }
      initialdata.product = product
      createBillAsync(initialdata)
      sessionStorage.removeItem('billProducts')
      sessionStorage.removeItem('totalCost')
      sessionStorage.removeItem('voucherCost')
      sessionStorage.removeItem('costWithVoucher')
      sessionStorage.removeItem('customerId')
      sessionStorage.removeItem('voucherId')
    }
  }, [paymentResponse, billProduct, voucherId, customerId])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading, please wait...</p>
      </div>
    )
  }

  if (!paymentResponse) {
    return <p>No payment response available.</p>
  }

  return (
    <>
      {paymentResponse.success === true ? (
        <PaymentSuccess
          sendBill={sendBill}
          products={billProduct}
          totalCost={totalCost}
          voucherCost={voucherCost}
          costWithVoucher={costWithVoucher}
          bill={bill}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            <ErrorIcon color="error" sx={{ fontSize: 90, marginTop: '20px' }} />
          </div>
          <div>
            <h1>Payment Failed</h1>
          </div>
          <div>
            <Button
              onClick={() => {
                navigate('/StaffPage')
              }}
              variant="contained"
              sx={{
                background: 'black',
                height: '70px',
                width: '150px',
                color: '#ffdbf0',
                '&:hover': {
                  backgroundColor: '#ffdbf0',
                  color: 'black',
                },
              }}
            >
              Back to homepage
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default PaymentResponsePage
