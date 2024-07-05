import React, { useContext, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { modalStyle, backgroundStyle } from './style';

type ModalProps = {
  question: string;
  answer: (answer: boolean) => any;
};

export default function Confirmation({ question, answer }: ModalProps) {
  return (
    <div style={modalStyle}>
      <Box sx={backgroundStyle}>
        <Typography variant="h6">{question}</Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 5,
            mt: 5,
          }}
        >
          <Button onClick={() => answer(true)} variant="outlined" color="success">
            Yes
          </Button>

          <Button onClick={() => answer(false)} variant="outlined" color="warning">
            No
          </Button>
        </Box>
      </Box>
    </div>
  );
}
