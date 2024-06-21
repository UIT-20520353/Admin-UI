import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';

import categoryApi from 'src/api/categoryApi';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import AlertModal from 'src/components/alert-modal';

import AddCategoryModal from '../components/add-category-modal';
import UpdateCategoryModal from '../components/update-category-modal';

export default function CategoryView() {
  const [isShowAddModal, setShowAddModal] = useState(false);
  const [dataModal, setDataModal] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  const getAllCategories = useCallback(async () => {
    const res = await categoryApi.getAllCategories();
    if (res.status === 200) {
      setCategories(res.data);
    }
  }, []);

  const onUpdateCategory = useCallback(
    async (category) => {
      setSelectedCategory(undefined);
      const res = await categoryApi.updateCategory(category);
      if (res.status === 200 || res.status === 204) {
        setDataModal({
          title: 'Success',
          message: 'Update category successfully',
          onOk: () => getAllCategories(),
        });
      } else {
        setDataModal({ title: 'Error', message: 'Something went wrong!', type: 'error' });
      }
    },
    [getAllCategories]
  );

  const onCreateCategory = useCallback(
    async (name) => {
      setShowAddModal(false);
      const res = await categoryApi.createCategory(name);
      if (res.status === 200 || res.status === 204) {
        setDataModal({
          title: 'Success',
          message: 'Create category successfully',
          onOk: () => getAllCategories(),
        });
      } else {
        setDataModal({ title: 'Error', message: 'Something went wrong!', type: 'error' });
      }
    },
    [getAllCategories]
  );

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <Container>
      <AddCategoryModal
        onOk={onCreateCategory}
        open={isShowAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      <UpdateCategoryModal
        open={!!selectedCategory}
        handleClose={() => setSelectedCategory(undefined)}
        onOk={onUpdateCategory}
        category={selectedCategory ?? {}}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Categories</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setShowAddModal(true)}
        >
          Add category
        </Button>
      </Stack>

      <Card>
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  {[
                    { id: 'index', label: 'Index' },
                    { id: 'name', label: 'Name' },
                    { id: 'action', label: 'Action' },
                  ].map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.align || 'left'}
                      sx={{ width: headCell.width, minWidth: headCell.minWidth }}
                    >
                      <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow hover tabIndex={-1} role="checkbox" key={`category-row-${category.id}`}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <TableCell align="center">
                          <IconButton onClick={() => setSelectedCategory(category)}>
                            <Iconify icon="material-symbols:edit" />
                          </IconButton>
                        </TableCell>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

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
