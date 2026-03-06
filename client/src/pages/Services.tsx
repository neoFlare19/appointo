import React, { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Rating,
  alpha,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  AccessTime as AccessTimeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { motion, Variants } from 'framer-motion';
import HoverGlow, { colors, radius } from '../components/HoverGlow';

// ========== PREMIUM CURSOR GLOW ==========
const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Box
      ref={glowRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(colors.primary, 0.08)} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.02s',
      }}
    />
  );
};

// ========== MOTION VARIANTS ==========
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ========== SERVICES DATA ==========
const services = [
  {
    id: 1,
    title: 'Medical Consultation',
    category: 'Health',
    description: 'Professional medical consultation with certified doctors.',
    rating: 4.8,
    duration: '30 min',
    icon: '🏥',
  },
  {
    id: 2,
    title: 'Design Services',
    category: 'Creative',
    description: 'Graphic design and branding consultation.',
    rating: 4.9,
    duration: '60 min',
    icon: '🎨',
  },
  {
    id: 3,
    title: 'Fitness Training',
    category: 'Fitness',
    description: 'Personal training and fitness consultation.',
    rating: 4.7,
    duration: '45 min',
    icon: '💪',
  },
  {
    id: 4,
    title: 'Tutoring',
    category: 'Education',
    description: 'Academic tutoring and subject consultation.',
    rating: 4.6,
    duration: '60 min',
    icon: '📚',
  },
  {
    id: 5,
    title: 'IT Support',
    category: 'Technology',
    description: 'Technical consultation and IT troubleshooting.',
    rating: 4.5,
    duration: '45 min',
    icon: '💻',
  },
  {
    id: 6,
    title: 'Spa & Wellness',
    category: 'Wellness',
    description: 'Wellness consultation and spa treatments.',
    rating: 4.9,
    duration: '90 min',
    icon: '🧖',
  },
];

const Services: React.FC = () => {
  const textureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0,
      y = 0,
      frame: number;
    const animate = () => {
      x += 0.05;
      y += 0.03;
      if (textureRef.current) {
        textureRef.current.style.backgroundPosition = `${x}px ${y}px`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', bgcolor: '#ffffff' }}>
      <CursorGlow />

      {/* Background layers */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: -10 }}>
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: '#ffffff' }} />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, ${alpha(colors.primary, 0.03)} 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, ${alpha(colors.accent, 0.02)} 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, ${alpha(colors.primaryLight, 0.04)} 0%, transparent 60%)
            `,
            backgroundSize: '200% 200%',
            animation: 'gradientMesh 30s ease infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '40vw',
            height: '40vw',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(colors.primary, 0.1)} 0%, transparent 70%)`,
            filter: 'blur(120px)',
            animation: 'floatBlob 25s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(colors.accent, 0.08)} 0%, transparent 70%)`,
            filter: 'blur(150px)',
            animation: 'floatBlob 30s ease-in-out infinite reverse',
          }}
        />
        <Box
          ref={textureRef}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Header */}
      <AppBar
        position="absolute"
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontWeight: 700,
                color: colors.textPrimary,
                textDecoration: 'none',
                letterSpacing: '-0.5px',
              }}
            >
              Appointo
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              <Button
                component={RouterLink}
                to="/services"
                sx={{ color: colors.textPrimary, fontWeight: 500 }}
              >
                Services
              </Button>
              <Button
                component={RouterLink}
                to="/dashboard"
                sx={{ color: colors.textPrimary, fontWeight: 500 }}
              >
                Dashboard
              </Button>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{ borderColor: colors.primary, color: colors.primary }}
              >
                Sign In
              </Button>
            </Box>
            <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: colors.textPrimary }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pt: { xs: 16, md: 20 }, pb: 8 }}>
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3rem' },
              color: colors.textPrimary,
              mb: 2,
            }}
          >
            Available Services
          </Typography>
          <Typography variant="h6" color={colors.textSecondary} sx={{ fontWeight: 400 }}>
            Browse and book from our wide range of professional services
          </Typography>
        </Box>

        {/* Services Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} md={4} key={service.id}>
                <motion.div variants={fadeUp}>
                  <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
                    <Card
                      sx={{
                        borderRadius: radius.card,
                        bgcolor: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
                        transition: 'all 0.3s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        {/* Icon */}
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            bgcolor: alpha(colors.primary, 0.1),
                            color: colors.primary,
                            fontSize: '2rem',
                            mb: 2,
                          }}
                        >
                          {service.icon}
                        </Avatar>

                        {/* Title & Category */}
                        <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 0.5 }}>
                          {service.title}
                        </Typography>
                        <Chip
                          label={service.category}
                          size="small"
                          sx={{
                            bgcolor: alpha(colors.primary, 0.1),
                            color: colors.primary,
                            fontWeight: 600,
                            mb: 2,
                          }}
                        />

                        {/* Description */}
                        <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 2 }}>
                          {service.description}
                        </Typography>

                        {/* Rating */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Rating value={service.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" color={colors.textSecondary}>
                            {service.rating}
                          </Typography>
                        </Box>

                        {/* Duration */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                          <AccessTimeIcon sx={{ fontSize: 18, color: colors.primary }} />
                          <Typography variant="body2" color={colors.textPrimary}>
                            Duration: {service.duration}
                          </Typography>
                        </Box>

                        {/* Book Now Button */}
                        <Button
                          variant="contained"
                          fullWidth
                          component={RouterLink}
                          to={`/book-appointment?service=${service.id}`}
                          sx={{
                            bgcolor: colors.primary,
                            borderRadius: radius.button,
                            py: 1,
                            fontWeight: 600,
                            boxShadow: `0 8px 20px ${alpha(colors.primary, 0.3)}`,
                            '&:hover': {
                              bgcolor: colors.primaryDark,
                              boxShadow: `0 12px 28px ${alpha(colors.primary, 0.4)}`,
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  </HoverGlow>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Animation keyframes */}
      <style>{`
        @keyframes gradientMesh {
          0% { background-position: 0% 0%; transform: scale(1); }
          50% { background-position: 100% 100%; transform: scale(1.02); }
          100% { background-position: 0% 0%; transform: scale(1); }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
      `}</style>
    </Box>
  );
};

export default Services;