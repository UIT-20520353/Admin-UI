import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Stack, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Iconify from './iconify';

export default function AlertModal({ open, handleClose, title, message, type, onOk }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <Iconify
              onClick={handleClose}
              icon={type === 'error' ? 'ic:baseline-error' : 'ep:success-filled'}
              style={{ color: type === 'error' ? '#bf1d1d' : '#1dbf38' }}
              width={24}
              height={24}
            />
            <Typography color={type === 'error' ? '#bf1d1d' : '#1dbf38'} variant="h6">
              {title}
            </Typography>
          </Stack>
          <Iconify onClick={handleClose} icon="material-symbols:close" className="cursor-pointer" />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Button
            onClick={() => {
              onOk();
              handleClose();
            }}
            variant="contained"
            size="medium"
            style={{ width: 130 }}
          >
            OK
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
};

AlertModal.defaultProps = {
  title: '',
  type: 'error',
  onOk: () => {},
};
