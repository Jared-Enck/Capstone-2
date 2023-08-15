import React, { useContext, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  FormControl,
  Box,
} from '@mui/material';
import {
  FormTextField,
  PrimaryButton,
  CancelButton,
  ErrorSpan,
} from '../styled';
import useFields from '../../hooks/useFields';
import UserContext from '../../context/UserContext';
import EditAvatar from './EditAvatar';

export default function EditProfile({ open, setOpen, username }) {
  const { updateUser, userData } = useContext(UserContext);

  const [formData, handleChange, formErrors, setFormErrors, setFormData] =
    useFields(userData);

  // handle closing of dialog box
  const handleClose = () => {
    setFormErrors([]);
    setFormData(userData);
    setOpen(false);
  };

  // handle file uploading of imageURL
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, imageURL: reader.result });
    };

    reader.readAsDataURL(file);
  };

  /** Check for changes in edit form
   *
   * @param {*} formData { username, email, imageURL }
   * @param {*} userData { username, email, imageURL }
   * @returns {*} { username: 'newUser' }
   *
   * maps entries of formData and compare values
   *  against userData values
   *
   * if no changes, return -1
   *
   * example --
   *
   * userData = { username: 'testUser', email: 'me@me.com', imageURL: 'someImageURL' }
   *
   * formData = { username: 'newUser', email: 'me@me.com', imageURL: 'someImageURL' }
   */
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

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check for any changes
    const updateData = getChanges(formData, userData);

    if (updateData === -1) return handleClose();

    // Patch request with updated data
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
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiPaper-root': {
          bottom: '5rem',
          bgcolor: 'primary.main',
          width: 600,
          padding: '0rem 4rem 1rem 4rem',
        },
      }}
    >
      <DialogTitle
        fontSize={'1.5rem'}
        sx={{ color: 'primary.text', paddingBottom: 0 }}
      >
        Edit Profile
      </DialogTitle>
      <DialogContent>
        <Box sx={{ height: 24, width: 400, marginBottom: '.4rem' }}>
          {typeof formErrors[0] === 'string' ? (
            <ErrorSpan>{formErrors[0]}</ErrorSpan>
          ) : null}
        </Box>
        <Stack spacing={3}>
          <EditAvatar
            imageURL={formData.imageURL}
            handleFileUpload={handleFileUpload}
          />
          {['username', 'email'].map((name) => {
            const firstLetter = name[0].toUpperCase();
            const label = firstLetter.concat(name.slice(1));

            return (
              <FormControl key={name}>
                <FormTextField
                  variant='outlined'
                  label={label}
                  type={'text'}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  helperText={
                    formErrors.length && typeof formErrors[0] !== 'string' ? (
                      <ErrorSpan>{formErrors[0][name]}</ErrorSpan>
                    ) : null
                  }
                />
              </FormControl>
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ marginRight: 'auto', padding: '5px 0px 0px 24px' }}>
        <CancelButton
          variant='outlined'
          onClick={handleClose}
          className='main-button'
        >
          Cancel
        </CancelButton>
        <PrimaryButton
          variant='contained'
          onClick={handleSubmit}
          className='main-button'
        >
          Submit
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
}
