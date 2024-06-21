import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

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

export default function UpdateCategoryModal({ handleClose, open, onOk, category }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (open) setName(category.name);
  }, [open, category]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            Update category
          </Typography>

          <Stack spacing={3}>
            <TextField
              autoComplete="off"
              name="name"
              label="Name"
              value={name}
              onChange={(e) => {
                e.preventDefault();
                setName(e.target.value);
              }}
              error={!name}
            />

            <Stack direction="row" spacing={2}>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                className="w-full"
                color="success"
                onClick={() => onOk({ id: category.id, name })}
                disabled={!name}
              >
                Save
              </LoadingButton>
              <Button
                variant="contained"
                size="large"
                className="w-full"
                color="error"
                onClick={handleClose}
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

UpdateCategoryModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};
