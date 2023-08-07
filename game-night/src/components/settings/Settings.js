import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsList from '../settings/SettingsList';
import { StyledIcon } from '../common/styled';

export default function Settings() {
  return (
    <Accordion
      sx={{
        border: 'none',
        boxShadow: 'none',
        '&: hover': {
          backgroundColor: alpha('rgb(0,0,0)', 0.05),
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: 'primary.text' }} />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        sx={{
          '& .MuiAccordionSummary-content': {
            marginTop: '20px',
            marginBottom: '20px',
          },
        }}
      >
        <StyledIcon sx={{ marginRight: '-1.2rem' }}>
          <SettingsIcon />
        </StyledIcon>
        Settings
      </AccordionSummary>
      <AccordionDetails>
        <SettingsList />
      </AccordionDetails>
    </Accordion>
  );
}
