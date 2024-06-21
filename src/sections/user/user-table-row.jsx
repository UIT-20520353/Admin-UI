import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ email, phone, index, handleClick }) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleView = () => {
    handleCloseMenu();
    handleClick();
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple onChange={handleClick} /> */}
        </TableCell>
        <TableCell>{index + 1}</TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {email}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{phone}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleView}>
          <Iconify icon="mdi:show-outline" sx={{ mr: 2 }} />
          View
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  email: PropTypes.any,
  phone: PropTypes.any,
  index: PropTypes.any,
  handleClick: PropTypes.func,
};
