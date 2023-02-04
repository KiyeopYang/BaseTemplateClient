import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

const SignInIsNeeded = () => (
  <Stack
    sx={{ width: '100%', height: '100%' }}
    justifyContent="center"
    alignItems="center"
  >
    <Typography>Sign-In is needed</Typography>
  </Stack>
);

export default SignInIsNeeded;
