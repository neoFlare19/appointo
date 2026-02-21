import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  TextField,
  alpha,
  SxProps,
  Theme,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Schedule as ScheduleIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  Analytics as AnalyticsIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import GlassModal from '../components/GlassModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Custom hook for typing effect
const useTypingEffect = (text: string, speed: number = 40) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayedText;
};

// Color palette
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

// ========== HOVER GLOW WRAPPER ==========
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
// ==========================================

const Home: React.FC = () => {
  // Modal state
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  // Initialize scroll reveal (observes .reveal-up)
  useScrollReveal();

  const originalHero = {
    headline: 'Welcome to Appointo',
    subtext:
      'Sttreamline your appointment scheduling process. Book, manage, and track appointments with ease using our modern scheduling system.',
  };
  const typedSubtext = useTypingEffect(originalHero.subtext, 40);

  const originalFeatures = [
    {
      icon: <CalendarIcon sx={{ fontSize: 48 }} />,
      title: 'Easy Scheduling',
      description: 'Book appointments effortlessly with our intuitive interface.',
    },
    {
      icon: <ScheduleIcon sx={{ fontSize: 48 }} />,
      title: 'Time Management',
      description: 'Efficiently manage your schedule and optimize your time.',
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 48 }} />,
      title: 'Smart Reminders',
      description: 'Never miss an appointment with automated reminders.',
    },
  ];

  const problemSolutionItems = {
    problems: ['Long queues', 'Double booking', 'No reminders', 'Manual scheduling'],
    solutions: ['Real-time availability', 'Automated reminders', 'Smart scheduling', 'Centralized management'],
  };

  const howItWorks = [
    {
      icon: <CalendarIcon sx={{ fontSize: 48 }} />,
      title: 'Select Service',
      description: 'Choose from a wide range of professional services',
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 48 }} />,
      title: 'Pick Date & Time',
      description: 'View real-time availability and select your preferred slot',
    },
    {
      icon: <NotificationsIcon sx={{ fontSize: 48 }} />,
      title: 'Confirm & Get Reminder',
      description: 'Receive instant confirmation and automated reminders',
    },
  ];

  const modes = [
    {
      type: 'professional',
      title: 'For Professionals',
      icon: <PersonIcon sx={{ fontSize: 60, color: colors.primary }} />,
      features: [
        'Manage your own schedule',
        'Set availability',
        'Accept or auto-approve bookings',
        'Client management',
      ],
      color: alpha(colors.primary, 0.08),
      buttonText: 'Join as Professional',
      buttonLink: '/register?role=professional',
    },
    {
      type: 'institution',
      title: 'For Institutions',
      icon: <BusinessIcon sx={{ fontSize: 60, color: colors.accent }} />,
      features: [
        'Multiple service providers',
        'Centralized dashboard',
        'Department-wise scheduling',
        'Analytics & reporting',
      ],
      color: alpha(colors.accent, 0.08),
      buttonText: 'Register Institution',
      buttonLink: '/register?role=institution_admin',
    },
  ];

  const newFeatures = [
    { icon: <AccessTimeIcon />, title: 'Real-time slots', description: 'Live availability updates' },
    { icon: <EmailIcon />, title: 'Email reminders', description: 'Automated notifications' },
    { icon: <DashboardIcon />, title: 'Admin dashboard', description: 'Complete oversight' },
    { icon: <HistoryIcon />, title: 'Booking history', description: 'Track all appointments' },
    { icon: <AnalyticsIcon />, title: 'Analytics', description: 'Insights and reports' },
    { icon: <CheckIcon />, title: 'Easy check-in', description: 'QR code or manual' },
  ];

  return (
    <Box sx={{ bgcolor: colors.background }}>
      {/* Hero Section – no reveal */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${colors.backgroundAlt} 0%, ${colors.backgroundLight} 100%)`,
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7} lg={8}>
              <Typography variant="h2" sx={{ fontWeight: 700, color: colors.textPrimary, mb: 2 }}>
                {originalHero.headline}
              </Typography>
              <Typography variant="h5" sx={{ color: colors.textSecondary, mb: 4, minHeight: '4.5rem', fontWeight: 400, lineHeight: 1.6 }}>
                {typedSubtext}
                <Box component="span" sx={{ display: 'inline-block', width: '2px', height: '1.2em', backgroundColor: colors.primary, ml: 0.5, animation: 'blink 1s step-end infinite' }} />
              </Typography>

              {/* Side-by-side buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <HoverGlow borderRadius={radius.button} color={colors.primary} lift sx={{ width: 'auto' }}>
                  <Button
                    component={RouterLink}
                    to="/services"
                    variant="contained"
                    size="large"
                    startIcon={<CalendarIcon />}
                    disableRipple
                    sx={{
                      bgcolor: colors.primary,
                      borderRadius: radius.button,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      width: '100%',
                      overflow: 'hidden',
                      '&:hover': {
                        bgcolor: colors.primaryDark,
                      },
                    }}
                  >
                    Book an Appointment
                  </Button>
                </HoverGlow>

                {/* Join as Professional – opens register modal */}
                <HoverGlow borderRadius={radius.button} color={colors.primary} lift sx={{ width: 'auto' }}>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PersonIcon />}
                    onClick={() => setOpenRegister(true)}
                    disableRipple
                    sx={{
                      borderColor: colors.primary,
                      color: colors.primary,
                      borderRadius: radius.button,
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      width: '100%',
                      overflow: 'hidden',
                      '&:hover': {
                        borderColor: colors.primaryDark,
                        bgcolor: alpha(colors.primary, 0.04),
                      },
                    }}
                  >
                    Join as Professional
                  </Button>
                </HoverGlow>
              </Box>
            </Grid>

            {/* Right column – animated card */}
            <Grid item xs={12} md={5} lg={4}>
              <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: radius.card,
                    bgcolor: 'white',
                    border: `1px solid ${colors.border}`,
                    animation: 'float 6s ease-in-out infinite',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarIcon sx={{ mr: 1, fontSize: 28, color: colors.primary }} />
                    <Typography variant="h6" fontWeight={600} color={colors.textPrimary}>
                      Upcoming Appointments
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {[1, 2, 3].map((i) => (
                      <Grid item xs={12} key={i}>
                        <Paper
                          sx={{
                            p: 2,
                            bgcolor: colors.backgroundAlt,
                            borderRadius: radius.card / 2,
                            border: `1px solid ${colors.border}`,
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle2" fontWeight={600} color={colors.textPrimary}>
                              Consultation {i}
                            </Typography>
                            <Chip label="Confirmed" size="small" sx={{ bgcolor: colors.success, color: 'white', fontWeight: 600, fontSize: '0.75rem' }} />
                          </Box>
                          <Typography variant="body2" color={colors.textSecondary} sx={{ mt: 0.5 }}>
                            Today at {9 + i}:00 AM
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </HoverGlow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Appointo? – reveal-up with left-to-right stagger */}
      <Container maxWidth="lg" sx={{ py: 8 }} className="reveal-up">
        <Typography variant="h3" align="center" gutterBottom sx={{ color: colors.textPrimary, fontWeight: 700, mb: 5 }}>
          Why Choose Appointo?
        </Typography>
        <Grid container spacing={4}>
          {originalFeatures.map((feature, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 4,
                    borderRadius: radius.card,
                    bgcolor: 'white',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <Box sx={{ color: colors.primary, mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.textPrimary }}>
                    {feature.title}
                  </Typography>
                  <Typography color={colors.textSecondary} sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </Card>
              </HoverGlow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Problem → Solution Section – reveal-up with left-to-right stagger */}
      <Box sx={{ bgcolor: colors.backgroundAlt, py: 8 }} className="reveal-up">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} style={{ transitionDelay: '0s' }}>
              <HoverGlow borderRadius={radius.card} color={colors.error} lift>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'white',
                    borderRadius: radius.card,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <Typography variant="h5" gutterBottom sx={{ color: colors.error, fontWeight: 600, mb: 3 }}>
                    Old Way
                  </Typography>
                  <List>
                    {problemSolutionItems.problems.map((problem) => (
                      <ListItem key={problem} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CancelIcon sx={{ color: colors.error }} />
                        </ListItemIcon>
                        <ListItemText primary={problem} primaryTypographyProps={{ fontWeight: 500, color: colors.textPrimary }} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </HoverGlow>
            </Grid>
            <Grid item xs={12} md={6} style={{ transitionDelay: '0.2s' }}>
              <HoverGlow borderRadius={radius.card} color={colors.success} lift>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'white',
                    borderRadius: radius.card,
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <Typography variant="h5" gutterBottom sx={{ color: colors.success, fontWeight: 600, mb: 3 }}>
                    Appointo Way
                  </Typography>
                  <List>
                    {problemSolutionItems.solutions.map((solution) => (
                      <ListItem key={solution} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <CheckIcon sx={{ color: colors.success }} />
                        </ListItemIcon>
                        <ListItemText primary={solution} primaryTypographyProps={{ fontWeight: 500, color: colors.textPrimary }} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </HoverGlow>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section – reveal-up with left-to-right stagger */}
      <Container maxWidth="lg" sx={{ py: 8 }} className="reveal-up">
        <Typography variant="h3" align="center" gutterBottom sx={{ color: colors.textPrimary, fontWeight: 700, mb: 5 }}>
          How It Works
        </Typography>
        <Grid container spacing={4}>
          {howItWorks.map((step, index) => (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 4,
                    borderRadius: radius.card,
                    bgcolor: 'white',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <Box sx={{ color: colors.primary, mb: 2 }}>{step.icon}</Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: colors.textPrimary }}>
                    {step.title}
                  </Typography>
                  <Typography color={colors.textSecondary} sx={{ lineHeight: 1.7 }}>
                    {step.description}
                  </Typography>
                </Card>
              </HoverGlow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Two Modes Section – reveal-up with left-to-right stagger */}
      <Box sx={{ bgcolor: colors.backgroundAlt, py: 8 }} className="reveal-up">
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ color: colors.textPrimary, fontWeight: 700, mb: 5 }}>
            Choose Your Mode
          </Typography>
          <Grid container spacing={4}>
            {modes.map((mode, index) => (
              <Grid
                item
                xs={12}
                md={6}
                key={mode.type}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <HoverGlow borderRadius={radius.card} color={index === 0 ? colors.primary : colors.accent} lift>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'white',
                      borderRadius: radius.card,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>{mode.icon}</Box>
                      <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600, color: colors.textPrimary, mb: 3 }}>
                        {mode.title}
                      </Typography>
                      <List>
                        {mode.features.map((feature) => (
                          <ListItem key={feature} sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <CheckIcon sx={{ color: index === 0 ? colors.primary : colors.accent }} />
                            </ListItemIcon>
                            <ListItemText primary={feature} primaryTypographyProps={{ fontWeight: 500, color: colors.textPrimary }} />
                          </ListItem>
                        ))}
                      </List>
                      <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <HoverGlow borderRadius={radius.button} color={index === 0 ? colors.primary : colors.accent} lift sx={{ width: 'auto' }}>
                          <Button
                            component={RouterLink}
                            to={mode.buttonLink}
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForwardIcon />}
                            disableRipple
                            sx={{
                              bgcolor: index === 0 ? colors.primary : colors.accent,
                              borderRadius: radius.button,
                              px: 4,
                              py: 1.5,
                              fontWeight: 600,
                              width: '100%',
                              overflow: 'hidden',
                              '&:hover': {
                                bgcolor: index === 0 ? colors.primaryDark : '#0284C7',
                              },
                            }}
                          >
                            {mode.buttonText}
                          </Button>
                        </HoverGlow>
                      </Box>
                    </CardContent>
                  </Card>
                </HoverGlow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Highlight – reveal-up with left-to-right stagger */}
      <Container maxWidth="lg" sx={{ py: 8 }} className="reveal-up">
        <Typography variant="h3" align="center" gutterBottom sx={{ color: colors.textPrimary, fontWeight: 700, mb: 5 }}>
          Powerful Features
        </Typography>
        <Grid container spacing={3}>
          {newFeatures.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={feature.title}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: radius.card,
                    bgcolor: 'white',
                    border: `1px solid ${colors.border}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: colors.primary }}>
                      {feature.icon}
                      <Typography variant="h6" sx={{ ml: 1.5, fontWeight: 600, color: colors.textPrimary }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography color={colors.textSecondary} sx={{ lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </HoverGlow>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call To Action – reveal-up (single item, no delay) */}
      <Box sx={{ bgcolor: colors.backgroundAlt, py: 8 }} className="reveal-up">
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 6, md: 8 },
              textAlign: 'center',
              bgcolor: 'white',
              border: `1px solid ${colors.border}`,
              borderRadius: radius.card,
            }}
          >
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: colors.textPrimary, mb: 2 }}>
              Start Managing Your Appointments Today
            </Typography>
            <Typography variant="h6" paragraph sx={{ mb: 4, color: colors.textSecondary, fontWeight: 400 }}>
              Join thousands of satisfied users who trust Appointo.
            </Typography>

            {/* CTA button – opens login modal */}
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenLogin(true)}
              disableRipple
              sx={{
                position: 'relative',
                display: 'inline-block',
                px: 6,
                py: 2,
                borderRadius: radius.button,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1.1rem',
                color: 'white',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                transition: 'transform 0.3s ease',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 'inherit',
                  background: 'rgba(255, 255, 255, 0.15)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                },
                '&:hover::before': {
                  opacity: 1,
                },
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* ========== MODALS ========== */}
      <GlassModal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
          Sign In
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: colors.primary,
              '&:hover': { bgcolor: colors.primaryDark },
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Don't have an account?{' '}
              <span
                style={{ color: colors.primaryLight, cursor: 'pointer', fontWeight: 600 }}
                onClick={() => {
                  setOpenLogin(false);
                  setOpenRegister(true);
                }}
              >
                Sign Up
              </span>
            </Typography>
          </Box>
        </Box>
      </GlassModal>

      <GlassModal open={openRegister} onClose={() => setOpenRegister(false)}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
          Create Account
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: colors.primary,
              '&:hover': { bgcolor: colors.primaryDark },
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Sign Up
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
              Already have an account?{' '}
              <span
                style={{ color: colors.primaryLight, cursor: 'pointer', fontWeight: 600 }}
                onClick={() => {
                  setOpenRegister(false);
                  setOpenLogin(true);
                }}
              >
                Sign In
              </span>
            </Typography>
          </Box>
        </Box>
      </GlassModal>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  );
};

export default Home;