import React, { useEffect, useContext, useState } from 'react';
import { ErrorSpan } from '../styled';
import useFields from '../../hooks/useFields';
import UserContext from '../../context/UserContext';
import DataContext from '../../context/DataContext';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
  Box,
  TextField,
} from '@mui/material';
import CircularLoading from '../common/CircularLoading';
import styled from '@emotion/styled';
import { CancelButton, DeleteButton } from '../styled';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.primary.text,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.secondary.main,
  },
}));

export default function DeleteDialog({ open, handleCloseDialog }) {
  const [isLoading, setIsLoading] = useState(false);

  const { deleteUser, logout } = useContext(UserContext);
  const { isSmallScreen } = useContext(DataContext);

  const initialState = { delete: '' };
  const [formData, handleChange, formErrors, setFormErrors, setFormData] =
    useFields(initialState);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.delete.toLowerCase() === 'delete') {
      setIsLoading(true);
      // DELETE request to server
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
      fullScreen={isSmallScreen}
      open={open}
      onClose={handleCloseDialog}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'primary.dark',
        },
      }}
    >
      <DialogTitle sx={{ color: 'secondary.main' }}>
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
            helperText={<ErrorSpan>{formErrors[0]}</ErrorSpan>}
            sx={{ marginBottom: '20px' }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ marginRight: 'auto', padding: '0px 0px 10px 20px' }}>
        <CancelButton
          variant='outlined'
          onClick={handleCloseDialog}
          className='main-button'
        >
          Cancel
        </CancelButton>
        <DeleteButton
          variant={'contained'}
          onClick={handleSubmit}
          className='main-button'
        >
          Confirm Delete
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
