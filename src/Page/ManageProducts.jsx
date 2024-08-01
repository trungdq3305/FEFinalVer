// import { useEffect, useState } from 'react';
// import { Box, Button, Paper, TextField } from '@mui/material';
// import ProductTable from '../Components/ProductTable/ProductTable';
// import { getAllProducts, addProduct, searchProduct, getAllGold, getDiscount } from '../Configs/axios';
// import AddProductDialog from '../Components/ProductTable/AddProductDialog';

// const ManageProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [goldData, setGoldData] = useState([]);
//   const [discountData, setDiscountData] = useState([])

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   const initialFormData = {
//     productName: '',
//     category: '',
//     material: '',
//     weight: '',
//     machiningCost: '',
//     size: '',
//     amount: '',
//     desc: '',
//     image: '',
//     markupRate: '',
//     gem: {
//       additionalProp1: 0,
//       additionalProp2: 0,
//       additionalProp3: 0
//     },
//   };

//   const onSearchTextChange = async (event) => {
//     const searchValue = event.target.value;
//     if (searchValue.length === 0) {
//       loadProducts();
//     } else {
//       const result = await searchProduct(searchValue);
//       setProducts(result.data.data);
//     }
//   };

//   const loadGold = async () => {
//     try {
//       const result = await getAllGold();
//       setGoldData(result.data || []); // Ensure it is an array
//     } catch (error) {
//       console.error('Error fetching gold data:', error);
//     }
//   };
//   const loadDiscount = async () => {
//     try {
//       const result = await getDiscount()
//       // console.log(result.data)
//       setDiscountData(result.data)
//     } catch (error) {
//       // console.log('Error fetching load discount')
//     }
//   }

//   const loadProducts = async () => {
//     setLoading(true);
//     try {
//       const result = await getAllProducts('', '', '', '');
//       setProducts(result.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//     setLoading(false);
//   };

//   const handleAddProduct = async (formData) => {
//     const requiredFields = [
//       'productName',
//       'category',
//       'material',
//       'weight',
//       'machiningCost',
//       'size',
//       'amount',
//       'desc',
//       'image'
//     ];
//     const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

//     if (isAnyFieldEmpty) {
//       window.alert('Please fill out all required fields.');
//       return;
//     }

//     try {
//       await addProduct(reformatData(formData));
//       handleCloseDialog();
//       loadProducts();
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };
//   const reformatData = (formData) => {
//     const item = goldData.find(item => item.goldName === formData.material);
//     const value = item ? item.goldId : null;
//     return {
//       ...formData,
//       material: value
//     }
//   }

//   useEffect(() => {
//     loadProducts()
//     loadGold()
//     loadDiscount()
//   }, [])

//   if (loading) return <div>Loading....</div>

//   return (
//     <>
//       <Box
//         sx={{
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           padding: '20px',
//         }}
//       >
//         <Paper
//           sx={{
//             flexGrow: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             maxHeight: '80vh',
//             overflow: 'hidden',
//             padding: '10px'
//           }}
//         >
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
//             <Button
//               onClick={handleOpenDialog} sx={{
//                 height: '50px', margin: '20px', backgroundColor: 'white',
//                 color: '#3baf80',
//                 border: '1px solid #3baf80',
//                 '&:hover': {
//                   backgroundColor: 'white',
//                   borderColor: '#3baf80'
//                 },
//               }}
//             >
//               Add Product
//             </Button>
//             <TextField
//               id="filled-search"
//               label="Search"
//               type="search"
//               variant="filled"
//               style={{ width: '300px' }}
//               onChange={onSearchTextChange}
//             />
//           </Box>
//           <AddProductDialog
//             openDialog={openDialog}
//             handleCloseDialog={handleCloseDialog}
//             onAddProduct={handleAddProduct}
//             initialFormData={initialFormData}
//             goldData={goldData}
//           />
//           <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
//             <ProductTable products={products} goldData={goldData} discountData={discountData} />
//           </Box>
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default ManageProducts;
import { useEffect, useState } from 'react';
import { Box, Button, Paper, TextField, Typography} from '@mui/material';
import ProductTable from '../Components/ProductTable/ProductTable';
import { getAllProducts, addProduct, searchProduct, getAllGold, getDiscount } from '../Configs/axios';
import AddProductDialog from '../Components/ProductTable/AddProductDialog';
import { getAllGem } from '../Configs/axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [goldData, setGoldData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [gemData, setGemData] = useState([]);

  useEffect(() => {
    const fetchGemData = async () => {
      try {
        const result = await getAllGem();
        if (result.isSuccess) {
          setGemData(result.data);
        }
      } catch (error) {
        console.error('Error fetching gem data:', error);
      }
    };

    fetchGemData();
  }, []);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const initialFormData = {
    productName: '',
    category: '',
    material: '',
    weight: '',
    machiningCost: '',
    size: '',
    amount: '',
    desc: '',
    image: '',
    markupRate: '',
    gem: {
      additionalProp1: 0,
      additionalProp2: 0,
      additionalProp3: 0
    },
  };

  const onSearchTextChange = async (event) => {
    const searchValue = event.target.value;
    if (searchValue.length === 0) {
      loadProducts();
    } else {
      const result = await searchProduct(searchValue);
      setProducts(result.data.data);
    }
  };

  const loadGold = async () => {
    try {
      const result = await getAllGold();
      setGoldData(result.data || []); // Ensure it is an array
    } catch (error) {
      console.error('Error fetching gold data:', error);
    }
  };

  const loadDiscount = async () => {
    try {
      const result = await getDiscount();
      setDiscountData(result.data);
    } catch (error) {
      console.error('Error fetching discount data:', error);
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const result = await getAllProducts('', '', '', '');
      setProducts(result.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const handleAddProduct = async (formData) => {
    const requiredFields = [
      'productName',
      'category',
      'material',
      'weight',
      'machiningCost',
      'size',
      'amount',
      'desc',
      'image',
      'markupRate'
    ];
    const isAnyFieldEmpty = requiredFields.some((field) => !formData[field]);

    if (isAnyFieldEmpty) {
      window.alert('Please fill out all required fields.');
      return;
    }

    try {
      await addProduct(reformatData(formData));
      handleCloseDialog();
      loadProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const reformatData = (formData) => {
    const item = goldData.find(item => item.goldName === formData.material);
    const value = item ? item.goldId : null;
    return {
      ...formData,
      material: value
    };
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    handleOpenDialog();
  };

  useEffect(() => {
    loadProducts();
    loadGold();
    loadDiscount();
  }, []);

  if (loading) return <div>Loading....</div>;

  return (
    <>
    <Box sx={{ backgroundColor: '#333', padding: '10px', margin:'20px', marginBottom:'0px' }}>
              <Typography variant="h6" sx={{ color: '#fff' }}>Manage Products</Typography>
            </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Paper
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',
            overflow: 'hidden',
            padding: '10px'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Button
              onClick={handleOpenDialog} sx={{
                height: '50px', margin: '20px', backgroundColor: '#3baf80',
                color: 'white',
                border: '1px solid #3baf80',
                '&:hover': {
                  backgroundColor: '#3baf80',
                  borderColor: '#3baf80'
                },
              }}
            >
              Add Product
            </Button>
            <TextField
              id="filled-search"
              label="Search"
              type="search"
              variant="filled"
              style={{ width: '300px' }}
              onChange={onSearchTextChange}
            />
          </Box>
          <AddProductDialog
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            onAddProduct={handleAddProduct}
            initialFormData={initialFormData}
            goldData={goldData}
          />
          <ProductTable
            products={products}
            goldData={goldData}
            discountData={discountData}
            onEditProduct={handleEditProduct}
            refreshProducts={loadProducts}
          />
        </Paper>
      </Box>
    </>
  );
};

export default ManageProducts;
