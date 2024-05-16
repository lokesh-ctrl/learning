import { Link, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm';

const ResetPassword = () => {
  return (
    <>
    <Stack spacing={2} sx={{mb:5, position:'relative'}}>
        Reset password
    </Stack>
    </>
  )
}

export default ResetPassword