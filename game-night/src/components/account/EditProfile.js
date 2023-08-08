import React, { useContext, useEffect } from 'react';
import { Box, Modal, Stack, Typography, FormControl } from '@mui/material';
import styled from '@emotion/styled';
import {
  FormBox,
  FormTextField,
  PrimaryButton,
  CancelButton,
  ErrorSpan,
} from '../common/styled';
import useFields from '../../hooks/useFields';
import UserContext from '../../context/UserContext';
import EditAvatar from './EditAvatar';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '800px',
  height: '500px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  margin: 'auto',
}));

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

            <EditAvatar
              imageURL={formData.imageURL}
              handleFileUpload={handleFileUpload}
            />

            {['username', 'email'].map((name) => {
              const firstLetter = name[0].toUpperCase();
              const label = firstLetter.concat(name.slice(1));

              return (
                <FormControl
                  key={name}
                  variant='outlined'
                >
                  <FormTextField
                    label={label}
                    type={'text'}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                </FormControl>
              );
            })}

            {formErrors.length
              ? formErrors.map((e, idx) => <ErrorSpan key={idx}>{e}</ErrorSpan>)
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
