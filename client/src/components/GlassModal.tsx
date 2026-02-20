import React from 'react';
import { Modal, Box, Fade, Backdrop } from '@mui/material';

interface GlassModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number | string;
}

const GlassModal: React.FC<GlassModalProps> = ({
  open,
  onClose,
  children,
  width = 400,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: width,
            maxWidth: '90vw',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            p: 4,
            color: '#fff',
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default GlassModal;