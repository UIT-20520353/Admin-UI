import { useState, Fragment, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { TableRow, TableBody, TableCell, IconButton } from '@mui/material';

import productApi from 'src/api/productApi';
import categoryApi from 'src/api/categoryApi';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import AlertModal from 'src/components/alert-modal';

import TableEmptyRows from '../table-empty-rows';
import AddProductModal from '../add-product-modal';
import ProductTableHead from '../product-table-header';
import UpdateProductModal from '../update-product-modal';

export default function ProductsView() {
  const [products, setProducts] = useState({ items: [], total: 0 });
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(undefined);
  const [dataModal, setDataModal] = useState(undefined);

  const handleOpen = () => setOpen(true);

  const getAllCategories = useCallback(async () => {
    const res = await categoryApi.getAllCategories();
    if (res.status === 200) {
      setCategories(res.data);
    }
  }, []);

  const getProducts = useCallback(async () => {
    const res = await productApi.getAllProducts(page);
    if (res.status && res.status === 200) {
      setProducts({ items: res.data, total: Number(res.headers['x-total-count']) });
    }
  }, [page]);

  const handleClose = (refresh) => {
    if (refresh) {
      getProducts();
    }
    setOpen(false);
  };

  const handleCloseUpdate = (refresh) => {
    if (refresh) {
      getProducts();
    }
    setSelectedProduct(false);
  };

  const onUpdateProduct = (product) => {
    if (product.file === null) {
      productApi.updateProduct({ ...product, image: product.imgUrl }).then((res) => {
        if (res.status === 204) {
          handleCloseUpdate(true);
        } else {
          setDataModal({ title: 'Error', message: 'Something went wrong!', type: 'error' });
        }
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Products</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          New Product
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProductTableHead
                headLabel={[
                  { id: 'id', label: 'Id' },
                  { id: 'name', label: 'Name' },
                  { id: 'description', label: 'Description' },
                  { id: 'image', label: 'Image' },
                  { id: 'amount', label: 'Amount' },
                  { id: 'category', label: 'Category' },
                  { id: 'action', label: 'Action' },
                ]}
              />
              <TableBody>
                {products.total === 0 ? (
                  <TableEmptyRows height={77} emptyRows={1} />
                ) : (
                  <>
                    {products.items.map((product) => (
                      <TableRow
                        key={`product-row-${product.id}`}
                        hover
                        tabIndex={-1}
                        role="checkbox"
                      >
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>
                          <img
                            src={product.image}
                            alt="product"
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 10,
                              objectFit: 'cover',
                              objectPosition: 'center',
                            }}
                          />
                        </TableCell>
                        <TableCell>{product.amount}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => setSelectedProduct(product)}>
                            <Iconify icon="material-symbols:edit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <AddProductModal open={open} handleClose={handleClose} categories={categories} />
      <UpdateProductModal
        open={!!selectedProduct}
        handleClose={handleCloseUpdate}
        categories={categories}
        product={selectedProduct ?? {}}
        onUpdate={onUpdateProduct}
      />
      <AlertModal
        open={!!dataModal}
        handleClose={() => setDataModal(undefined)}
        title={dataModal?.title || ''}
        message={dataModal?.message || ''}
        type={dataModal?.type || 'success'}
        onOk={dataModal?.onOk}
      />
    </Container>
  );
}
