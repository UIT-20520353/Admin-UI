import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import storage from 'src/config/firebaseConfig';

import Iconify from 'src/components/iconify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '0.5px solid #000',
  borderRadius: 1.5,
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UpdateProductModal({ handleClose, open, categories, product, onUpdate }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    file: null,
    amount: 0,
    cateId: undefined,
    imgUrl: '',
  });
  const [errors, setErrors] = useState({ name: false, description: false });
  const [isLoading, setLoading] = useState(false);

  const isDisableSubmit = useMemo(
    () => !form.name || !form.description || !form.cateId || form.amount <= 0,
    [form]
  );

  const onChangeTextValue = (e, key) => {
    if (key === 'amount') {
      const value = e.target.value.trim();
      if (value.length === 0 || Number.isNaN(Number(value))) {
        setErrors((prev) => ({ ...prev, [key]: true }));
      } else {
        if (Number(value) <= 0) {
          setErrors((prev) => ({ ...prev, [key]: true }));
        } else {
          setErrors((prev) => ({ ...prev, [key]: false }));
        }
        setForm((prev) => ({ ...prev, [key]: value }));
      }
      return;
    }

    if (e.target.value === '') {
      setErrors((prev) => ({ ...prev, [key]: true }));
    } else {
      setErrors((prev) => ({ ...prev, [key]: false }));
    }
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onSubmit = () => {
    setLoading(true);
    if (form.file === null) {
      onUpdate({ ...form, image: form.imgUrl, id: product.id });
      setLoading(false);
      return;
    }

    const storageRef = ref(storage, `/files/${form.file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, form.file);

    uploadTask.on(
      'state_changed',
      () => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          onUpdate({ ...form, image: url, id: product.id });
          setLoading(false);
        });
      }
    );
  };

  useEffect(() => {
    if (!open) {
      setErrors({ name: false, description: false });
      setLoading(false);
    } else {
      setForm({
        name: product?.name,
        description: product?.description,
        file: null,
        amount: product?.amount,
        cateId: product?.category?.id,
        imgUrl: product?.image,
      });
    }
  }, [open, product]);

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="!mb-4">
            Add new product
          </Typography>

          <Stack spacing={3}>
            <TextField
              autoComplete="off"
              name="name"
              label="Name"
              value={form.name}
              onChange={(e) => onChangeTextValue(e, 'name')}
              error={errors.name}
            />

            <TextField
              autoComplete="off"
              name="description"
              label="Description"
              value={form.description}
              onChange={(e) => onChangeTextValue(e, 'description')}
              multiline
              maxRows={4}
              error={errors.description}
            />

            <TextField
              autoComplete="off"
              name="amount"
              label="Amount"
              value={form.amount}
              onChange={(e) => onChangeTextValue(e, 'amount')}
              error={errors.amount}
            />

            <FormControl fullWidth>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={form.cateId}
                label="Category"
                onChange={(e) => setForm((prev) => ({ ...prev, cateId: e.target.value }))}
              >
                {categories.map((category) => (
                  <MenuItem key={`menu-item-${category.id}`} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stack spacing={1}>
              {!form.file ? (
                <img
                  src={form.imgUrl}
                  alt="product"
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <Typography variant="subtitle2" className="!mb-2">
                  {form.file?.name}
                </Typography>
              )}
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<Iconify icon="material-symbols:upload" />}
                size="large"
              >
                Upload image
                <VisuallyHiddenInput
                  multiple={false}
                  type="file"
                  // value={form.file}
                  onChange={(e) => setForm((prev) => ({ ...prev, file: e.target.files[0] }))}
                  accept=".png, .jpg, .jpeg"
                />
              </Button>
            </Stack>

            <Stack direction="row" spacing={2}>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                className="w-full"
                color="success"
                onClick={onSubmit}
                disabled={isDisableSubmit}
                loading={isLoading}
              >
                Save
              </LoadingButton>
              <Button
                variant="contained"
                size="large"
                className="w-full"
                color="error"
                onClick={() => handleClose(false)}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

UpdateProductModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  product: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
