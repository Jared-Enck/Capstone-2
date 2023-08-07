import React, { useContext, useEffect } from 'react';
import {
  Box,
  Grid,
  Modal,
  Stack,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import styled from '@emotion/styled';
import {
  FormBox,
  PrimaryButton,
  CancelButton,
  ErrorSpan,
} from '../common/styled';
import useFields from '../../hooks/useFields';
import UserContext from '../../context/UserContext';
import FormInput from '../common/FormInput';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '800px',
  height: '500px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  margin: 'auto',
}));

const genError = (err, idx) => {
  return <ErrorSpan key={idx}>{err}</ErrorSpan>;
};

export default function EditProfile({ open, setOpen, username }) {
  const { updateUser, userData } = useContext(UserContext);

  const [formData, handleChange, formErrors, setFormErrors, setFormData] =
    useFields(userData);

  const handleClose = () => {
    setFormErrors([]);
    setFormData(userData);
    setOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, imageURL: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const getChanges = (formData, userData) => {
    const formEntries = Object.entries(formData);
    const initialEntries = Object.entries(userData);
    const updateData = {};

    const entries = formEntries.filter(
      ([key, val], idx) => val !== initialEntries[idx][1]
    );

    if (!entries.length) return -1;

    entries.map((entry) => (updateData[entry[0]] = entry[1]));

    return updateData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = getChanges(formData, userData);

    if (updateData === -1) return handleClose();

    const result = await updateUser(updateData, username);

    if (result) {
      setFormErrors(result.msg);
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    setFormData(userData);
  }, [userData, setFormData]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='edit-profile'
      sx={{
        display: 'flex',
      }}
    >
      <StyledBox
        boxShadow={3}
        sx={{
          display: 'flex',
          marginTop: '-10%vh',
        }}
      >
        <FormBox
          component='form'
          onSubmit={handleSubmit}
          autoComplete='off'
          sx={{ width: '100%' }}
        >
          <Stack spacing={3}>
            <Typography
              variant='h5'
              color={'primary.text'}
            >
              Edit Profile
            </Typography>
            <Grid
              container
              direction={'row'}
              justifyContent={'space-between'}
            >
              <Grid item>
                <Avatar
                  src={formData.imageURL}
                  sx={{
                    width: 120,
                    height: 120,
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{ display: 'flex' }}
              >
                <Box sx={{ marginTop: 'auto' }}>
                  <label htmlFor='imageURL'>
                    <Button
                      variant='contained'
                      component='span'
                      className='main-button'
                      sx={{
                        bgcolor: 'primary.light',
                        '&:hover': {
                          bgcolor: 'primary.contrastText',
                          color: 'primary.main',
                        },
                      }}
                    >
                      <PhotoCamera
                        fontSize='small'
                        sx={{ marginRight: 1 }}
                      />
                      Upload Image
                    </Button>
                    <input
                      id='imageURL'
                      accept='image/*'
                      type='file'
                      hidden
                      onChange={handleFileUpload}
                    />
                  </label>
                </Box>
              </Grid>
            </Grid>

            {['username', 'email'].map((i) => (
              <FormInput
                key={i}
                name={i}
                formData={formData}
                handleChange={handleChange}
              />
            ))}

            {formErrors.length
              ? formErrors.map((e, idx) => genError(e, idx))
              : null}
            <Stack
              direction={'row'}
              spacing={2}
            >
              <CancelButton
                variant='outlined'
                onClick={handleClose}
                className='main-button'
              >
                Cancel
              </CancelButton>
              <PrimaryButton
                variant='contained'
                type='submit'
                className='main-button'
              >
                Submit
              </PrimaryButton>
            </Stack>
          </Stack>
        </FormBox>
      </StyledBox>
    </Modal>
  );
}
