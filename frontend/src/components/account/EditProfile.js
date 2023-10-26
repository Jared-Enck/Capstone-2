import React, { useContext, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Stack, Box } from '@mui/material';
import {
  FormTextField,
  PrimaryButton,
  CancelButton,
  ErrorSpan,
} from '../styled';
import useFields from '../../hooks/useFields';
import UserContext from '../../context/UserContext';
import DataContext from '../../context/DataContext';
import EditAvatar from './EditAvatar';

export default function EditProfile({ open, setOpen, username, avatarSize }) {
  const { updateUser, userData } = useContext(UserContext);
  const { isSmallScreen } = useContext(DataContext);

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
    const changes = {};

    const entries = formEntries.filter(
      ([key, val], idx) => val !== initialEntries[idx][1]
    );

    if (!entries.length) return -1;

    entries.map((entry) => (changes[entry[0]] = entry[1]));

    return changes;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // check for any changes
    const changes = getChanges(formData, userData);

    if (changes === -1) return handleClose();

    // Patch request with updated data
    const result = await updateUser(changes, username);

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
      fullScreen={isSmallScreen}
      open={open}
      onClose={handleClose}
      fullWidth={true}
      maxWidth='sm'
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'primary.main',
          padding: isSmallScreen ? 1 : '0rem 4rem 1rem 4rem',
          bottom: isSmallScreen ? 'none' : '20%',
        },
      }}
      aria-label='edit-profile'
    >
      <DialogTitle
        fontSize={isSmallScreen ? '1.2rem' : '1.5rem'}
        sx={{ color: 'primary.text' }}
      >
        Edit Profile
      </DialogTitle>
      <DialogContent>
        <Box sx={{ marginBottom: '.4rem' }}>
          {typeof formErrors[0] === 'string' ? (
            <ErrorSpan>{formErrors[0]}</ErrorSpan>
          ) : null}
        </Box>
        <Stack spacing={3}>
          <EditAvatar
            imageURL={formData.imageURL}
            handleFileUpload={handleFileUpload}
            avatarSize={avatarSize}
            isSmallScreen={isSmallScreen}
          />

          {['username', 'email'].map((name) => {
            const firstLetter = name[0].toUpperCase();
            const label = firstLetter.concat(name.slice(1));

            return (
              <FormTextField
                key={name}
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
            );
          })}

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
              onClick={handleSubmit}
              className='main-button'
            >
              Submit
            </PrimaryButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
