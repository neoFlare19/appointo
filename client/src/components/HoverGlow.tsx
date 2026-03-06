import React, { useRef } from 'react';
import { Box, alpha, SxProps, Theme } from '@mui/material';

export interface HoverGlowProps {
  children: React.ReactNode;
  color?: string;
  borderRadius?: number | string;
  lift?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

export const colors = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  primaryLight: '#3B82F6',
  accent: '#0EA5E9',
  accentLight: '#38BDF8',
  success: '#10B981',
  error: '#DC2626',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textLight: '#94A3B8',
  border: '#E2E8F0',
};

export const radius = {
  card: 8,
  button: 4,
  pill: 20,
};

const HoverGlow: React.FC<HoverGlowProps> = ({
  children,
  color = colors.primary,
  borderRadius = 0,
  lift = true,
  className = '',
  sx = {},
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    wrapperRef.current.style.setProperty('--mouse-x', `${x}%`);
    wrapperRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <Box
      ref={wrapperRef}
      className={`hover-glow-wrapper ${className}`}
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        borderRadius: borderRadius,
        overflow: 'hidden',
        transition: lift ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
        '&:hover': {
          transform: lift ? 'translateY(-4px) scale(1.02)' : 'none',
          boxShadow: lift ? `0 20px 30px ${alpha(color, 0.2)}` : 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            ${alpha(color, 0.25)} 0%,
            transparent 70%
          )`,
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&:hover::after': {
          opacity: 1,
        },
        ...(sx as any),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        e.currentTarget.style.removeProperty('--mouse-x');
        e.currentTarget.style.removeProperty('--mouse-y');
      }}
    >
      {children}
    </Box>
  );
};

export default HoverGlow;