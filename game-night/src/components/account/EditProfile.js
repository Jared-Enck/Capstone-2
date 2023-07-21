import React, { useContext } from "react";
import {
  Box,
  Modal,
  Stack,
  FormControl,
  Typography,
  Button
} from "@mui/material";
import styled from "@emotion/styled";
import {
  FormBox,
  FormInputLabel,
  FormOutlinedInput,
  ErrorSpan,
  PrimaryButton
} from "./LoginForm";
import useFields from "../../hooks/useFields";
import UserContext from "../../context/UserContext";

const StyledBox = styled(Box)(({ theme }) => ({
  width: '800px',
  height: '500px',
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  margin: 'auto'
}));

const genError = (err, idx) => {
  return (
    <ErrorSpan key={idx}>
      {err}
    </ErrorSpan>
  )
}

export default function EditProfile({ open, setOpen, userData }) {
  const { updateUser, navigate } = useContext(UserContext);
  const [
    formData,
    handleChange,
    formErrors,
    setFormErrors
  ] = useFields(userData);

  const handleClose = () => {
    setFormErrors([]);
    setOpen(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    delete formData.imageURL;
    const result = await updateUser(formData, userData.username);
    if (result.msg === 'success') {
      navigate(`/profile/${formData.username}`);
      handleClose();
    } else {
      setFormErrors(result.msg)
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile"
      sx={{
        display: "flex"
      }}
    >
      <StyledBox
        boxShadow={3}
        sx={{
          display: 'flex',
          marginTop: '-10%vh'
        }}
      >
        <FormBox
          component="form"
          onSubmit={handleSubmit}
          autoComplete="off"
          sx={{ width: "100%" }}
        >
          <Stack spacing={2}>
            <Typography variant="h5" color={"primary.text"}>
              Edit Profile
            </Typography>
            <FormControl key={"username"} sx={{ width: "100%" }}>
              <FormInputLabel htmlFor={"username"}>
                Username
              </FormInputLabel>
              <FormOutlinedInput
                type="text"
                name={"username"}
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl key={"email"} sx={{ width: "100%" }}>
              <FormInputLabel htmlFor={"email"}>
                Email
              </FormInputLabel>
              <FormOutlinedInput
                type="text"
                name={"email"}
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            {
              formErrors.length
                ? formErrors.map((e, idx) => genError(e, idx))
                : null
            }
            <Stack direction={"row"} spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "primary.light",
                  color: "primary.muted",
                  borderRadius: 9999,
                  "&:hover": {
                    borderColor: "primary.text",
                    color: "primary.contrastText"
                  }
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <PrimaryButton
                variant="contained"
                type="submit"
              >
                Submit
              </PrimaryButton>
            </Stack>
          </Stack>
        </FormBox>
      </StyledBox>
    </Modal>
  );
};