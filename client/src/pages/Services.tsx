import React, { useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
  Rating,
  alpha,
  SxProps,
  Theme,
} from '@mui/material';
import {
  MedicalServices as MedicalServicesIcon,
  DesignServices as DesignServicesIcon,
  FitnessCenter as FitnessCenterIcon,
  School as SchoolIcon,
  Computer as ComputerIcon,
  Spa as SpaIcon,
} from '@mui/icons-material';

// ========== Color palette (matching Home) ==========
const colors = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  primaryLight: '#3B82F6',
  accent: '#0EA5E9',
  accentLight: '#38BDF8',
  success: '#10B981',
  error: '#DC2626',
  background: '#FFFFFF',
  backgroundAlt: '#F8FAFC',
  backgroundLight: '#F1F5F9',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  cardShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
};

const radius = {
  card: 8,
  button: 4,
  pill: 20,
};

// ========== Hover Glow Wrapper (identical to Home, with sx prop) ==========
interface HoverGlowProps {
  children: React.ReactNode;
  color?: string;
  borderRadius?: number | string;
  lift?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

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
        transition: lift ? 'transform 0.2s, box-shadow 0.2s' : 'none',
        '&:hover': {
          transform: lift ? 'translateY(-2px)' : 'none',
          boxShadow: lift ? colors.cardShadowHover : 'none',
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
          transition: 'opacity 0.3s',
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
// ======================================================

// Service data (unchanged)
const services = [
  {
    id: 1,
    name: 'Medical Consultation',
    description: 'Professional medical consultation with certified doctors.',
    category: 'Health',
    duration: '30 min',
    price: '$75',
    rating: 4.8,
    icon: <MedicalServicesIcon />,
    color: '#e3f2fd',
  },
  {
    id: 2,
    name: 'Design Services',
    description: 'Graphic design and branding consultation.',
    category: 'Creative',
    duration: '60 min',
    price: '$120',
    rating: 4.9,
    icon: <DesignServicesIcon />,
    color: '#f3e5f5',
  },
  {
    id: 3,
    name: 'Fitness Training',
    description: 'Personal training and fitness consultation.',
    category: 'Fitness',
    duration: '45 min',
    price: '$65',
    rating: 4.7,
    icon: <FitnessCenterIcon />,
    color: '#e8f5e9',
  },
  {
    id: 4,
    name: 'Tutoring',
    description: 'Academic tutoring and subject consultation.',
    category: 'Education',
    duration: '60 min',
    price: '$55',
    rating: 4.6,
    icon: <SchoolIcon />,
    color: '#fff3e0',
  },
  {
    id: 5,
    name: 'IT Support',
    description: 'Technical consultation and IT troubleshooting.',
    category: 'Technology',
    duration: '45 min',
    price: '$90',
    rating: 4.5,
    icon: <ComputerIcon />,
    color: '#e0f7fa',
  },
  {
    id: 6,
    name: 'Spa & Wellness',
    description: 'Wellness consultation and spa treatments.',
    category: 'Wellness',
    duration: '90 min',
    price: '$150',
    rating: 4.9,
    icon: <SpaIcon />,
    color: '#fce4ec',
  },
];

const Services: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: colors.textPrimary }}>
        Available Services
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Browse and book from our wide range of professional services
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {services.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={4}>
            {/* Card wrapper: inner glow only, no outer shadow */}
            <HoverGlow
              borderRadius={radius.card}
              color={colors.primary}
              lift
              sx={{
                '&:hover': {
                  boxShadow: 'none', // 🔥 remove outer shadow from card
                },
              }}
            >
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: radius.card,
                  bgcolor: 'white',
                  border: `1px solid ${colors.border}`,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        mr: 2,
                        borderRadius: 1,
                        backgroundColor: service.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                        {service.name}
                      </Typography>
                      <Chip label={service.category} size="small" sx={{ mt: 0.5 }} />
                    </Box>
                  </Box>

                  <Typography color={colors.textSecondary} paragraph sx={{ lineHeight: 1.7 }}>
                    {service.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={service.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color={colors.textSecondary} sx={{ ml: 1 }}>
                      {service.rating}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="body2" color={colors.textSecondary}>
                      Duration: {service.duration}
                    </Typography>
                    <Typography variant="h6" sx={{ color: colors.primary, fontWeight: 600 }}>
                      {service.price}
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions>
                  {/* Button wrapper: inner glow + lift, but NO outer shadow */}
                  <HoverGlow
                    borderRadius={radius.button}
                    color={colors.primary}
                    lift
                    sx={{
                      '&:hover': {
                        boxShadow: 'none', // 🔥 remove outer shadow from button
                      },
                    }}
                  >
                    <Button
                      component={RouterLink}
                      to={`/book/${service.id}`}
                      variant="contained"
                      fullWidth
                      disableRipple
                      sx={{
                        bgcolor: colors.primary,
                        borderRadius: radius.button,
                        py: 1,
                        fontWeight: 600,
                        overflow: 'hidden',
                        '&:hover': {
                          bgcolor: colors.primaryDark,
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </HoverGlow>
                </CardActions>
              </Card>
            </HoverGlow>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;