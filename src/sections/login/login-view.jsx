import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { setLocalStorage } from 'src/utils/sessionStorage';

import customerApi from 'src/api/customer';
import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import AlertModal from 'src/components/alert-modal';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [dataModal, setDataModal] = useState(undefined);

  const handleClick = async () => {
    const res = await customerApi.login(form);
    if (!res.status || res.status !== 200) {
      setDataModal({ title: 'Error', message: res.data.message });
    } else {
      setLocalStorage('capstone_admin_1', res.data.accessToken);
      router.push('/');
    }
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={form.email}
          onChange={handleChangeEmail}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={form.password}
          onChange={handleChangePassword}
        />
      </Stack>

      <LoadingButton
        sx={{ my: 3 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" className="!mb-4">
            Login Admin Dashboard
          </Typography>

          {renderForm}

          <AlertModal
            open={!!dataModal}
            handleClose={() => setDataModal(undefined)}
            title={dataModal?.title || ''}
            message={dataModal?.message || ''}
          />
        </Card>
      </Stack>
    </Box>
  );
}
