import {
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Table,
  TableCell,
  Paper,
  TableFooter,
  TablePagination,
  Box,
  IconButton,
  Button,
} from '@mui/material'
import React, { useState } from 'react'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import { useTheme } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const CashBill = ({ cashBill, totalCost, reload }) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const navigate = useNavigate()
  const formatDateTime = (dateString) => {
    const date = new Date(dateString)

    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    return `${formattedDate} at ${formattedTime}`
  }
  function TablePaginationActions(props) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0)
    }

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

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
    )
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cashBill.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <>
      {cashBill !== undefined ? (
        <>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 600, display: 'flex', flexDirection: 'column' }}
          >
            <Table stickyHeader aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    Total Cost
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    Publish Day
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    Voucher
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    Customer
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    Payment
                  </TableCell>

                  <TableCell
                    align="right"
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  >
                    Options
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
                {(rowsPerPage > 0
                  ? cashBill.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : cashBill
                ).map((item) => (
                  <TableRow key={cashBill.billId}>
                    <TableCell component="th" scope="row" style={{ width: 50 }}>
                      {item.billId}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {Number(item.totalCost.toFixed(0)).toLocaleString('vn')}{' '}
                    </TableCell>
                    <TableCell style={{ width: 160 }} align="right">
                      {formatDateTime(item.publishDay)}
                    </TableCell>
                    {item.voucherVoucherId === null ? (
                      <TableCell style={{ width: 160 }} align="right">
                        N/A
                      </TableCell>
                    ) : (
                      <TableCell style={{ width: 160 }} align="right">
                        {item.voucherVoucherId}
                      </TableCell>
                    )}

                    {item.customerId === null ? (
                      <TableCell style={{ width: 160 }} align="right">
                        N/A
                      </TableCell>
                    ) : (
                      <TableCell style={{ width: 160 }} align="right">
                        {item.customerId}
                      </TableCell>
                    )}

                    {item.type === true ? (
                      <TableCell style={{ width: 160 }} align="right">
                        Sale bill
                      </TableCell>
                    ) : (
                      <TableCell style={{ width: 160 }} align="right">
                        Import bill
                      </TableCell>
                    )}
                    {item.payment === 1 ? (
                      <TableCell style={{ width: 160 }} align="right">
                        Cash
                      </TableCell>
                    ) : (
                      <TableCell style={{ width: 160 }} align="right">
                        Card
                      </TableCell>
                    )}

                    <TableCell style={{ width: 160 }} align="right">
                      <Button
                        onClick={() => navigate(`/BillDetail/${item.billId}`)}
                        variant="contained"
                        sx={{
                          width: '60px',
                          height: '50px',
                          background: 'black',
                          color: '#ffdbf0',
                          '&:hover': {
                            backgroundColor: '#ffdbf0',
                            color: 'black',
                          },
                        }}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={11} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={11}
                    count={cashBill.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                    style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div>Cash has no bill</div>
      )}
    </>
  )
}
CashBill.propTypes = {
  cashBill: PropTypes.array.isRequired,
  reload: PropTypes.func.isRequired,
}

export default CashBill
