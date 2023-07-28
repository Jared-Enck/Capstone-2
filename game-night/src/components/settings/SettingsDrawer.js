import React from 'react';
import UserContext from '../context/UserContext';
import { Drawer, Switch } from '@mui/material';
import styled from '@emotion/styled';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiButtonBase-root': {
    color: theme.palette.primary.contrastText,
  },
}));

export default function SettingsDrawer() {
  const { isDark, handleThemeToggle } = useContext(UserContext);
  const [checked, setChecked] = useState(isDark);

  const handleChange = () => {
    handleThemeToggle();
    setChecked(!checked);
  };

  return (
    <Drawer>
      <StyledSwitch
        checked={checked}
        onChange={handleChange}
      />
    </Drawer>
  );
}
