import React from 'react';
import {
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  alpha,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsList from '../settings/SettingsList';

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
        <ListItemIcon sx={{ marginRight: '-1.2rem' }}>
          <SettingsIcon />
        </ListItemIcon>
        Settings
      </AccordionSummary>
      <AccordionDetails>
        <SettingsList />
      </AccordionDetails>
    </Accordion>
  );
}
