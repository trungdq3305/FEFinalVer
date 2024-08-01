// import { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableFooter, TableContainer, TableHead, TableRow, Paper, Box, TablePagination, Button } from '@mui/material';
// import EditProductDialog from './EditProductDialog';
// import PropTypes from 'prop-types';
// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import { addDiscount, editProduct } from '../../Configs/axios';

// import { useTheme } from '@mui/material/styles';
// import { propTypes } from 'react-bootstrap/esm/Image';

// function TablePaginationActions(props) {
//   const { count, page, rowsPerPage, onPageChange } = props;
//   const theme = useTheme(); // Use useTheme hook to get the theme

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };


//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


// const initialFormData = {
//   productName: '',
//   category: '',
//   material: '',
//   weight: '',
//   machiningCost: '',
//   size: '',
//   amount: '',
//   desc: '',
//   image: '',
//   gem: {
//     additionalProp1: 0,
//     additionalProp2: 0,
//     additionalProp3: 0
//   },
//   markupRate: ''
// };


// const ProductTable = ({ products, goldData, discountData }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5)
//   const [openEditDialog, setopenEditDialog] = useState(false);
//   const [openAddDiscountDialog, setOpenAddDiscountDialog] = useState(false);
//   const [editData, setEditData] = useState(initialFormData);
//   // const [gemForm, setGemForm] = useState({
//   //   productId: '',
//   //   gem: {
//   //     additionalProp1: '',
//   //     additionalProp2: '',
//   //     additionalProp3: ''
//   //   }
//   // }
//   const handleEdit = (product) => {
//     handleopenEditDialog()
//     const materialGold = goldData.find(gold => gold.goldName === product.material);
//     setEditData({
//       ...initialFormData,
//       ...product,
//       material: materialGold ? materialGold.goldId : '',
//     });
//   };
//   // const addProductDiscount = async(productId,discountId) => {
//   //   try {
//   //     await addDiscount(productId,discountId);
//   //     handleCloseDialog();
//   //     loadProducts();
//   //   } catch (error) {
//   //     console.error('Error adding discount:', error);
//   //   }
//   // };


//   const handleopenEditDialog = () => {
//     setopenEditDialog(true);
//   };

//   const handleCloseEditDialog = () => {
//     setopenEditDialog(false);
//   };
//   const handleOpenAddDiscountDialog = () => {
//     setOpenAddDiscountDialog(true)
//   }
//   const handleCloseAddDiscountDialog = () => {
//     setOpenAddDiscountDialog(false)
//   }
//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSaveProduct = async (formData) => {
//     try {
//       await editProduct(formData);
//       handleCloseEditDialog();
//       // Refresh products data if necessary
//     } catch (error) {
//       console.error('Error editing product:', error);
//     }
//   };
//   // const handleAddGem = async()

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Id</TableCell>
//               <TableCell>Product Name</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Material</TableCell>
//               <TableCell>Weight</TableCell>
//               <TableCell>Machining Cost</TableCell>
//               <TableCell>Size</TableCell>
//               <TableCell>Amount</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Image</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {(rowsPerPage > 0
//               ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               : products
//             ).map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell>{product.productId}</TableCell>
//                 <TableCell>{product.productName}</TableCell>
//                 <TableCell>{product.category}</TableCell>
//                 <TableCell>{product.material}</TableCell>
//                 <TableCell>{product.weight}</TableCell>
//                 <TableCell>{product.machiningCost}</TableCell>
//                 <TableCell>{product.size}</TableCell>
//                 <TableCell>{product.amount}</TableCell>
//                 <TableCell>{product.desc}</TableCell>
//                 <TableCell>{product.image}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleEdit(product)}>Edit</Button>
//                   <Button > Add Gem </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={9} />
//               </TableRow>
//             )}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 colSpan={9}
//                 count={products.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 SelectProps={{
//                   inputProps: {
//                     'aria-label': 'rows per page',
//                   },
//                   native: true,
//                 }}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 ActionsComponent={TablePaginationActions}
//               />
//             </TableRow>
//           </TableFooter>
//         </Table>
//       </TableContainer>
//       <EditProductDialog
//         openEditDialog={openEditDialog}
//         handleCloseEditDialog={handleCloseEditDialog}
//         productData={editData}
//         goldData={goldData}
//         onSaveProduct={handleSaveProduct}
//       />
//       {/* <openAddDiscountDialog>
//       openAddDiscountDialog={openAddDiscountDialog}
//       handleCloseAddDiscountDialog={handleCloseAddDiscountDialog}
//       openAddDiscount={addProductDiscount}
//       discountData={discountData}
//       </openAddDiscountDialog> */}
//     </>
//   );
// };

// ProductTable.propTypes = {
//   products: PropTypes.array.isRequired,
//   goldData: PropTypes.array.isRequired,
//   // discountData: propTypes.array.isRequired
// };
// export default ProductTable

import { useState } from 'react';
import { Table, TableBody, TableCell, TableFooter, TableContainer, TableHead, TableRow, Paper, Box, TablePagination, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import EditProductDialog from './EditProductDialog';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';
import AddDiscountDialog from './AddDiscountDialog';
import { addDiscountProduct, removeProductDiscount } from '../../Configs/axios';
import DiscountDialog from './ViewRemoveDiscount';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;
  const theme = useTheme();

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const ProductTable = ({ products, goldData, discountData, onEditProduct, refreshProducts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [openAddDiscountDialog, setOpenAddDiscountDialog] = useState(false);
  const [selectedProductForDiscount, setSelectedProductForDiscount] = useState(null);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleViewDiscountClick = (product) => {
    setSelectedProductForDiscount(product);
    setSelectedDiscounts(product.discount || []);
    setOpenDiscountDialog(true);
  };

  const handleCloseDiscountDialog = () => {
    setOpenDiscountDialog(false);
  };

  const handleAddDiscountClick = (product) => {
    setSelectedProductForDiscount(product);
    setOpenAddDiscountDialog(true);
  };

  const handleAddDiscount = async (productId, discountId) => {
    try {
      const result = await addDiscountProduct(productId, discountId);
      if (result.isSuccess) {
        alert('Discount added successfully!');
        if (refreshProducts) {
          refreshProducts();
        }
      } else {
        alert('Failed to add discount');
      }
      //loadProducts();
    } catch (error) {
      console.error('Error adding discount:', error);
      alert('Failed to add discount');
    }
  };
  const refreshDiscounts = () => {
    // Logic to refresh the discounts for the selected product
    const updatedProduct = products.find(p => p.productId === selectedProductForDiscount.productId);
    setSelectedDiscounts(updatedProduct.discount || []);
  };

  // const DiscountDialog = ({ open, onClose, discounts, product }) => (
  //   <Dialog open={open} onClose={onClose}>
  //     <DialogTitle>Discounts</DialogTitle>
  //     <DialogContent>
  //       {/* {discounts.length > 0 ? (
  //         discounts.map((discount, index) => (
  //           <div key={index} style={{ marginBottom: '16px' }}>
  //             <Typography>Discount ID: {discount.discountId}</Typography>
  //             <Typography>Created By: {discount.createdBy}</Typography>
  //             <Typography>Created By: {discount.expiredDay}</Typography>
  //             <Typography>Publish Day: {discount.publishDay}</Typography>
  //             <Typography>Cost: {discount.cost}</Typography>
  //           </div>
  //         ))
  //       ) : (
  //         <DialogContentText>No discounts available.</DialogContentText>
  //       )} */}
  //       <Table stickyHeader aria-label="custom pagination table">
  //         <TableHead>
  //           <TableRow>
  //             <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Discount ID</TableCell>
  //             <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Created By</TableCell>
  //             <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Created By</TableCell>
  //             <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Publish Day</TableCell>
  //             <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Cost</TableCell>
  //             <TableCell align="right" style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Options</TableCell>

  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {discounts !== null ? (
  //             discounts.map((discount, index) => (
  //               <TableRow key={index} style={{ marginBottom: '16px' }}>
  //                 <TableCell align="right">{discount.discountId}</TableCell>
  //                 <TableCell align="right">{discount.createdBy}</TableCell>
  //                 <TableCell align="right">{discount.expiredDay}</TableCell>
  //                 <TableCell align="right">{discount.publishDay}</TableCell>
  //                 <TableCell align="right">{discount.cost}</TableCell>
  //                 <TableCell align="right">
  //                   <Button onClick={() => handleRemove(discount.discountId)}>Remove</Button>
  //                 </TableCell>

  //               </TableRow>
  //             ))
  //           ) : (
  //             <TableRow>
  //               <TableCell colSpan={3} align="center">Please click &quot;View&quot; to display data.</TableCell>
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //     </DialogContent>
  //     <DialogActions>
  //       <Button onClick={onClose}>Close</Button>
  //     </DialogActions>
  //   </Dialog >
  // );
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Id</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Product Name</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Category</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Material</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Weight(g)</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Machining Cost(VND)</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Size</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Description</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Image</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Price(VND)</TableCell>
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Price After Discount(VND)</TableCell>
              {/* <TableCell>MarkupRate</TableCell> */}
              <TableCell style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.productId}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.material}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.machiningCost}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>{product.desc}</TableCell>
                <TableCell>{product.image}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.priceWithDiscount}</TableCell>
                {/* <TableCell>{product.markupRate}</TableCell> */}

                <TableCell>
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <IconButton onClick={() => handleEditClick(product)} style={{ color: '#FFA500' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleViewDiscountClick(product)} style={{ color: 'green' }}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleAddDiscountClick(product)} style={{ color: 'red' }}>
                      <AddCircleIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={13}
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                ActionsComponent={TablePaginationActions}
                style={{ backgroundColor: 'lightgray', fontWeight: 'bold' }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {selectedProduct && (
        <EditProductDialog
          openDialog={openEditDialog}
          handleCloseDialog={handleCloseEditDialog}
          product={selectedProduct}
          goldData={goldData}
          onEditProduct={onEditProduct}
        />
      )}
      <DiscountDialog
        open={openDiscountDialog}
        onClose={handleCloseDiscountDialog}
        discounts={selectedDiscounts}
        product={selectedProductForDiscount}
        refreshDiscounts={refreshDiscounts}
      />
      {selectedProductForDiscount && (
        <AddDiscountDialog
          open={openAddDiscountDialog}
          onClose={() => setOpenAddDiscountDialog(false)}
          product={selectedProductForDiscount}
          onAddDiscount={handleAddDiscount}
        />
      )}
    </>
  );
};

export default ProductTable;
