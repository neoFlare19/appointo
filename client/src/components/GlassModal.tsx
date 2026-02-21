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
  width = 440,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 400,
          sx: {
            backdropFilter: 'blur(14px)',
            background:
              'radial-gradient(circle at center, rgba(10,20,40,0.35), rgba(10,20,40,0.65))',
          },
        },
      }}
    >
      <Fade in={open} timeout={400}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: open
              ? 'translate(-50%, -50%) scale(1)'
              : 'translate(-50%, -50%) scale(0.96)',
            transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',

            width,
            maxWidth: '92vw',

            borderRadius: '64px',

            // Liquid gradient layer
            background: `
              linear-gradient(
                135deg,
                rgba(255,255,255,0.25),
                rgba(255,255,255,0.08)
              )
            `,

            backdropFilter: 'blur(30px) saturate(160%)',
            WebkitBackdropFilter: 'blur(30px) saturate(160%)',

            // Soft glowing edge
            border: '1px solid rgba(255,255,255,0.18)',

            boxShadow: `
              0 30px 80px rgba(0,0,0,0.35),
              inset 0 1px 0 rgba(255,255,255,0.4),
              inset 0 -1px 0 rgba(255,255,255,0.1)
            `,

            p: 5,
            color: '#ffffff',
            overflow: 'hidden',

            // Top liquid shine
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              background: `
                radial-gradient(
                  circle at 50% 0%,
                  rgba(255,255,255,0.5),
                  transparent 70%
                )
              `,
              opacity: 0.6,
              pointerEvents: 'none',
            },

            // Bottom depth fade
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '40%',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.15), transparent)',
              pointerEvents: 'none',
            },
          }}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default GlassModal;