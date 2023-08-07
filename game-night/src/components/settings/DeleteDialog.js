import React, { useEffect, useContext, useState } from 'react';
import { ErrorSpan } from '../common/styled';
import useFields from '../../hooks/useFields';
import UserContext from '../../context/UserContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  Box,
  Typography,
  TextField,
} from '@mui/material';
import CircularLoading from '../common/CircularLoading';
import styled from '@emotion/styled';
import { CancelButton, DeleteButton } from '../common/styled';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.primary.text,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.primary.contrastText,
  },
}));

export default function DeleteDialog({ open, handleCloseDialog }) {
  const [isLoading, setIsLoading] = useState(false);
  const genError = (err, idx) => {
    return <ErrorSpan key={idx}>{err}</ErrorSpan>;
  };

  const { deleteUser, logout } = useContext(UserContext);

  const initialState = { delete: '' };
  const [formData, handleChange, formErrors, setFormErrors, setFormData] =
    useFields(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.delete.toLowerCase() === 'delete') {
      setIsLoading(true);
      const res = await deleteUser();
      setIsLoading(false);
      if (res.deleted) {
        handleCloseDialog();
        logout();
      } else {
        setFormErrors([res]);
      }
    } else {
      setFormErrors(['Invalid input.']);
    }
  };

  useEffect(() => {
    if (!open) {
      setFormData(initialState);
      setFormErrors([]);
    }
    // eslint-disable-next-line
  }, [open, setFormData, setFormErrors]);

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'primary.light',
        },
      }}
    >
      <DialogTitle sx={{ color: 'primary.contrastText' }}>
        Delete Account?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'primary.text' }}>
          Type 'delete' below and click confirm to delete account.
        </DialogContentText>
        <Stack spacing={2}>
          <StyledTextField
            autoFocus
            margin='dense'
            type='text'
            variant='standard'
            name='delete'
            value={formData.delete}
            onChange={handleChange}
          />
          {formErrors.length
            ? formErrors.map((e, idx) => genError(e, idx))
            : null}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ marginRight: 'auto', paddingLeft: '20px' }}>
        <CancelButton
          variant='outlined'
          onClick={handleCloseDialog}
          className='main-button'
        >
          Cancel
        </CancelButton>
        <DeleteButton
          variant='contained'
          onClick={handleSubmit}
          className='main-button'
        >
          <Typography paddingRight={1}>Confirm Delete</Typography>
          {isLoading ? (
            <CircularLoading
              size='1rem'
              color='white'
            />
          ) : (
            <Box width={'1rem'} />
          )}
        </DeleteButton>
      </DialogActions>
    </Dialog>
  );
}
