import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  TextField,
  alpha,
  SxProps,
  Theme,
  Avatar,
  Rating,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useMediaQuery,
  useTheme,
  Alert,
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
  ExpandMore as ExpandMoreIcon,
  Lock as LockIcon,
  MedicalServices as MedicalServicesIcon,
  School as SchoolIcon,
  FitnessCenter as FitnessCenterIcon,
  Menu as MenuIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import GlassModal from '../components/GlassModal';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAuth } from '../contexts/AuthContext';

// ========== PREMIUM IMPORTS ==========
import { motion, useInView, Variants } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

// ========== COLOR PALETTE ==========
const colors = {
  primary: '#2F6BFF',
  primaryDark: '#1E4FD9',
  primaryLight: '#5EA8FF',
  accent: '#0EA5E9',
  accentLight: '#38BDF8',
  success: '#10B981',
  error: '#DC2626',
  background: '#FFFFFF',
  backgroundAlt: '#F8FAFC',
  backgroundLight: '#F1F5F9',
  backgroundDeep: '#F5F9FF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textLight: '#94A3B8',
  border: '#E6F0FF',
  borderDark: '#CBD5E1',
  cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  cardShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
};

const radius = {
  card: 8,
  button: 12,
  pill: 20,
};

// ========== TYPING EFFECT HOOK ==========
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

// ================= PREMIUM ENHANCEMENTS =================
const useParallax = (layerRef: React.RefObject<HTMLElement>, speed: number) => {
  useEffect(() => {
    const handleScroll = () => {
      if (layerRef.current) {
        const scrollY = window.scrollY;
        layerRef.current.style.transform = `translateY(${scrollY * speed}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [layerRef, speed]);
};

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

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: 2,
        background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
        zIndex: 10000,
        transition: 'width 0.1s ease',
      }}
    />
  );
};

// ========== TILT CARD COMPONENT ==========
const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const calc = (x: number, y: number) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1.02,
  ];

  const [{ xys }, api] = useSpring(() => ({ xys: [0, 0, 1] }));

  const bind = useGesture({
    onHover: ({ hovering }) => {
      api({ xys: hovering ? [0, 0, 1.02] : [0, 0, 1] });
    },
    onMove: ({ xy }) => {
      const [px, py] = xy;
      api({ xys: calc(px, py) });
    },
  });

  return (
    <animated.div
      {...bind()}
      style={{
        transform: xys.to(
          (x: number, y: number, s: number) =>
            `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        ),
      }}
    >
      {children}
    </animated.div>
  );
};

// ========== MOTION VARIANTS ==========
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
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
    <motion.div whileHover={{ scale: 1.02, rotate: 0.5, transition: { type: 'spring', stiffness: 300 } }}>
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
    </motion.div>
  );
};

// ========== FOOTER COMPONENT ==========
const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#F6F9FF',
        position: 'relative',
        overflow: 'hidden',
        pt: 8,
        pb: 4,
        mt: 8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          background: `linear-gradient(180deg, ${alpha(colors.primary, 0.03)} 0%, transparent 100%)`,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${alpha(colors.primary, 0.05)} 0%, transparent 70%)`,
          filter: 'blur(50px)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CalendarIcon sx={{ color: colors.primary, fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: colors.primary }}>
                Appointo
              </Typography>
            </Box>
            <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 3, maxWidth: 300 }}>
              Appointo is a modern appointment scheduling platform designed to simplify booking and schedule management for professionals and institutions.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: colors.textSecondary,
                  '&:hover': { color: colors.primary, transform: 'scale(1.1)' },
                }}
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: colors.textSecondary,
                  '&:hover': { color: colors.primary, transform: 'scale(1.1)' },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: colors.textSecondary,
                  '&:hover': { color: colors.primary, transform: 'scale(1.1)' },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: colors.textSecondary,
                  '&:hover': { color: colors.primary, transform: 'scale(1.1)' },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Product Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
              Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Features', 'Pricing', 'How It Works', 'Security'].map((item) => (
                <Typography
                  key={item}
                  component={RouterLink}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  sx={{
                    color: colors.textSecondary,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    '&:hover': { color: colors.primary },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Resources Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Blog', 'Help Center', 'Documentation', 'API'].map((item) => (
                <Typography
                  key={item}
                  component={RouterLink}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  sx={{
                    color: colors.textSecondary,
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    '&:hover': { color: colors.primary },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Contact Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 18, color: colors.primary }} />
                <Typography variant="body2" color={colors.textSecondary}>
                  support@appointo.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, color: colors.primary }} />
                <Typography variant="body2" color={colors.textSecondary}>
                  +1 (800) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon sx={{ fontSize: 18, color: colors.primary }} />
                <Typography variant="body2" color={colors.textSecondary}>
                  123 SaaS Street, San Francisco, CA
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: colors.border }} />

        {/* Bottom Bar */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color={colors.textSecondary}>
            © 2026 Appointo. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography
              component={RouterLink}
              to="/privacy"
              sx={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: colors.primary } }}
            >
              Privacy Policy
            </Typography>
            <Typography
              component={RouterLink}
              to="/terms"
              sx={{ color: colors.textSecondary, textDecoration: 'none', fontSize: '0.9rem', '&:hover': { color: colors.primary } }}
            >
              Terms of Service
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// ========== COUNT-UP ANIMATION COMPONENT ==========
const CountUp: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ 
  end, 
  suffix = '', 
  duration = 2000 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let frame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return (
    <Typography variant="h3" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
      {count}{suffix}
    </Typography>
  );
};

// ========== MAIN HOME COMPONENT ==========
const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Refs for sections
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Initialize scroll reveal
  useScrollReveal();

  // Parallax layers refs
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useParallax(layer1Ref, 0.1);
  useParallax(layer2Ref, 0.2);
  useParallax(layer3Ref, 0.05);

  // GSAP gradient animation
  useEffect(() => {
    if (layer1Ref.current) {
      gsap.to(layer1Ref.current, {
        backgroundPosition: '100% 100%',
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-80px 0px 0px 0px' }
    );

    const sections = [featuresRef, howItWorksRef, pricingRef, contactRef].map(ref => ref.current).filter(Boolean);
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const originalHero = {
    headline: 'Welcome to Appointo',
    subtext:
      'Streamline your appointment scheduling process. Book, manage, and track appointments with ease using our modern scheduling system.',
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

  // Texture animation ref
  const textureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0;
    let y = 0;
    let animationFrame: number;

    const animate = () => {
      x += 0.05;
      y += 0.03;

      if (textureRef.current) {
        textureRef.current.style.backgroundPosition = `${x}px ${y}px`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Confetti trigger for testimonials
  const testimonialRef = useRef(null);
  const isTestimonialInView = useInView(testimonialRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isTestimonialInView) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [colors.primary, colors.accent],
      });
    }
  }, [isTestimonialInView]);

  // ========== HERO IMAGE CAROUSEL ==========
  const heroImages = ['/hero1.jpg', '/hero2.jpg', '/hero3.jpg', '/hero4.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Features', ref: featuresRef, id: 'features' },
    { label: 'How It Works', ref: howItWorksRef, id: 'how-it-works' },
    { label: 'Pricing', ref: pricingRef, id: 'pricing' },
    { label: 'Contact', ref: contactRef, id: 'contact' },
  ];

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      await login({ email: loginEmail, password: loginPassword });
      setOpenLogin(false);
      navigate('/dashboard');
    } catch (error) {
      setLoginError('Invalid email or password. Use "user@example.com" with password "password" for demo.');
    }
  };

  // Register handler
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }
    try {
      await register({
        name: registerName,
        email: registerEmail,
        password: registerPassword,
        confirmPassword: registerConfirmPassword,
      });
      setOpenRegister(false);
      navigate('/dashboard');
    } catch (error) {
      setRegisterError('Registration failed. Please try again.');
    }
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <ScrollProgress />
      <CursorGlow />

      {/* Global premium background system */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: -10 }}>
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: '#ffffff' }} />
        <Box
          ref={layer1Ref}
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at 20% 30%, ${alpha(colors.primary, 0.03)} 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, ${alpha(colors.accent, 0.02)} 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, ${alpha(colors.primaryLight, 0.04)} 0%, transparent 60%)
            `,
            backgroundSize: '200% 200%',
          }}
        />
        <Box
          ref={layer2Ref}
          sx={{
            position: 'absolute',
            inset: 0,
            '& > div': {
              position: 'absolute',
              borderRadius: '50%',
              filter: 'blur(120px)',
              animation: 'floatBlob 30s ease-in-out infinite',
            },
          }}
        >
          <Box sx={{ top: '10%', left: '10%', width: 600, height: 600, background: alpha(colors.primary, 0.1) }} />
          <Box sx={{ bottom: '10%', right: '10%', width: 800, height: 800, background: alpha(colors.accent, 0.08) }} />
        </Box>
        <Box
          ref={layer3Ref}
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10 Q 50 0, 90 10' stroke='%23${colors.primary.slice(1)}' fill='none' stroke-width='0.5' /%3E%3Cpath d='M20 20 Q 60 10, 80 20' stroke='%23${colors.accent.slice(1)}' fill='none' stroke-width='0.5' /%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.02,
            mixBlendMode: 'overlay',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <Box sx={{ position: 'absolute', top: '20%', left: '50%', width: '80vw', height: '80vw', background: `radial-gradient(circle, ${alpha(colors.primary, 0.08)} 0%, transparent 70%)`, filter: 'blur(100px)', transform: 'translateX(-50%)' }} />
          <Box sx={{ position: 'absolute', bottom: '30%', left: '30%', width: '60vw', height: '60vw', background: `radial-gradient(circle, ${alpha(colors.accent, 0.06)} 0%, transparent 70%)`, filter: 'blur(120px)' }} />
        </Box>
      </Box>

      {/* ========== HEADER ========== */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          height: 72,
          bgcolor: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: scrolled ? '0px 6px 20px rgba(0,0,0,0.04)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="lg" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            {/* Logo */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  '& .logo-glow': {
                    opacity: 1,
                  },
                },
              }}
            >
              <CalendarIcon sx={{ color: colors.primary, fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: colors.primary,
                  letterSpacing: '-0.5px',
                  fontFamily: '"Inter", "Sora", "Manrope", sans-serif',
                }}
              >
                Appointo
              </Typography>
              <Box
                className="logo-glow"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle, ${alpha(colors.primary, 0.2)} 0%, transparent 70%)`,
                  filter: 'blur(10px)',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
              />
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 4 }}>
                {navItems.map((item) => (
                  <Typography
                    key={item.label}
                    onClick={() => scrollToSection(item.ref)}
                    sx={{
                      color: activeSection === item.id ? colors.primary : colors.textSecondary,
                      fontSize: '1rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -4,
                        left: 0,
                        width: activeSection === item.id ? '100%' : 0,
                        height: 2,
                        bgcolor: colors.primary,
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        color: colors.primary,
                        '&::after': {
                          width: '100%',
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Right Actions - Login & Sign Up */}
            {!isMobile ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => setOpenLogin(true)}
                  sx={{
                    borderColor: colors.primary,
                    color: colors.primary,
                    borderRadius: radius.button,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#F1F6FF',
                      borderColor: colors.primaryDark,
                      color: colors.primaryDark,
                    },
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setOpenRegister(true)}
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                    borderRadius: radius.button,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    boxShadow: `0 6px 16px ${alpha(colors.primary, 0.25)}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.primaryDark}, ${colors.primary})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 20px ${alpha(colors.primary, 0.35)}`,
                    },
                  }}
                >
                  Sign up
                </Button>
              </Box>
            ) : (
              <IconButton onClick={() => setMobileMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Container>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 280,
              height: '100vh',
              bgcolor: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 1200,
              p: 3,
              boxShadow: `-4px 0 20px rgba(0,0,0,0.1)`,
              animation: 'slideIn 0.3s ease',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <IconButton onClick={() => setMobileMenuOpen(false)}>
                <CancelIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navItems.map((item) => (
                <Typography
                  key={item.label}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setMobileMenuOpen(false);
                  }}
                  sx={{ color: colors.textPrimary, fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  {item.label}
                </Typography>
              ))}
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  setOpenLogin(true);
                  setMobileMenuOpen(false);
                }}
                sx={{ mt: 2, borderColor: colors.primary, color: colors.primary }}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  setOpenRegister(true);
                  setMobileMenuOpen(false);
                }}
                sx={{ bgcolor: colors.primary }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* ========== HERO SECTION ========== */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: { xs: 0, md: '30px' },
          maxWidth: { md: '1600px' },
          mx: { md: 'auto' },
          px: { xs: 2, md: 4 },
          pt: { xs: 8, md: 12 },
          pb: { xs: 12, md: 16 },
          mb: 6,
        }}
      >
        {/* Sliding Image Carousel */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <Box
            sx={{
              display: 'flex',
              height: '100%',
              width: `${heroImages.length * 100}%`,
              transform: `translateX(-${(currentImageIndex * 100) / heroImages.length}%)`,
              transition: 'transform 1s ease-in-out',
            }}
          >
            {heroImages.map((src, idx) => (
              <Box
                key={idx}
                sx={{
                  flex: '0 0 auto',
                  width: `${100 / heroImages.length}%`,
                  height: '100%',
                  backgroundImage: `url(${src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            ))}
          </Box>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(
                to right,
                rgba(0,0,0,0.65) 0%,
                rgba(0,0,0,0.45) 40%,
                rgba(0,0,0,0.25) 70%,
                rgba(0,0,0,0.1) 100%
              )`,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </Box>

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left column – text */}
            <Grid item xs={12} md={7} lg={8}>
              <motion.div variants={fadeUp} initial="hidden" animate="visible">
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '3rem', md: '3.75rem', lg: '4.5rem' },
                    letterSpacing: '-0.02em',
                    color: '#FFFFFF',
                    textShadow: '0px 4px 20px rgba(0,0,0,0.35)',
                    mb: 2,
                    fontFamily: '"Satoshi", sans-serif',
                  }}
                >
                  Welcome{' '}
                  <Box component="span" sx={{ color: '#3B82F6' }}>
                    to
                  </Box>{' '}
                  Appointo
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.125rem',
                    color: '#E5E7EB',
                    textShadow: '0px 2px 10px rgba(0,0,0,0.25)',
                    mb: 4,
                    maxWidth: 600,
                  }}
                >
                  {typedSubtext}
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1.2em',
                      backgroundColor: '#FFFFFF',
                      ml: 0.5,
                      animation: 'blink 1s step-end infinite',
                    }}
                  />
                </Typography>
              </motion.div>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {/* BOOK AN APPOINTMENT */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <HoverGlow borderRadius={radius.button} color={colors.primary} lift>
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
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#FFFFFF',
                        textTransform: 'uppercase',
                        width: '100%',
                        boxShadow: `0 8px 20px ${alpha(colors.primary, 0.3)}`,
                        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        '&:hover': {
                          bgcolor: colors.primaryDark,
                          boxShadow: `0 16px 28px ${alpha(colors.primary, 0.4)}`,
                        },
                      }}
                    >
                      BOOK AN APPOINTMENT
                    </Button>
                  </HoverGlow>
                </motion.div>

                {/* JOIN AS PROFESSIONAL */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <HoverGlow borderRadius={radius.button} color="#FFFFFF" lift>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<PersonIcon />}
                      onClick={() => setOpenRegister(true)}
                      disableRipple
                      sx={{
                        borderColor: '#FFFFFF',
                        color: '#FFFFFF',
                        borderRadius: radius.button,
                        px: 4,
                        py: 1.5,
                        fontWeight: 700,
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        width: '100%',
                        bgcolor: 'transparent',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                          borderColor: '#FFFFFF',
                          color: '#FFFFFF',
                          transform: 'translateY(-2px)',
                          boxShadow: `0 12px 24px rgba(255,255,255,0.2)`,
                        },
                      }}
                    >
                      JOIN AS PROFESSIONAL
                    </Button>
                  </HoverGlow>
                </motion.div>
              </Box>
            </Grid>

            {/* Right column – floating mockup */}
            <Grid item xs={12} md={5} lg={4}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
              >
                <TiltCard>
                  <Box sx={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 8,
                        bgcolor: 'rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        boxShadow: `0 20px 40px ${alpha(colors.primary, 0.08)}`,
                        animation: 'float 6s ease-in-out infinite',
                        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        position: 'relative',
                        zIndex: 1,
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
                                bgcolor: 'rgba(255,255,255,0.5)',
                                borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.5)',
                                transition: 'all 0.3s',
                                '&:hover': {
                                  bgcolor: alpha(colors.primary, 0.04),
                                  transform: 'scale(1.01)',
                                },
                              }}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="subtitle2" fontWeight={600} color={colors.textPrimary}>
                                  Consultation {i}
                                </Typography>
                                <Chip
                                  label="Confirmed"
                                  size="small"
                                  sx={{ bgcolor: colors.success, color: 'white', fontWeight: 600, fontSize: '0.75rem' }}
                                />
                              </Box>
                              <Typography variant="body2" color={colors.textSecondary} sx={{ mt: 0.5 }}>
                                Today at {9 + i}:00 AM
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Box>
                </TiltCard>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Appointo? */}
      <Container maxWidth="lg" sx={{ py: 8, bgcolor: '#ffffff' }} className="reveal-up">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Typography variant="h2" align="center" sx={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em', mb: 5 }}>
            Why Choose Appointo?
          </Typography>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Grid container spacing={4}>
            {originalFeatures.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={childVariants}>
                  <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        p: 4,
                        borderRadius: radius.card,
                        bgcolor: 'rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        '&:hover': {
                          transform: 'translateY(-4px) scale(1.02)',
                          boxShadow: `0 20px 30px ${alpha(colors.primary, 0.1)}`,
                        },
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
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Features Section (Problem → Solution) */}
      <Box ref={featuresRef} id="features" sx={{ bgcolor: '#f9fbff', py: 8 }} className="reveal-up">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6} style={{ transitionDelay: '0s' }}>
              <HoverGlow borderRadius={radius.card} color={colors.error} lift>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    bgcolor: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: radius.card,
                    border: '1px solid rgba(255,255,255,0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at 30% 50%, ${alpha(colors.error, 0.1)} 0%, transparent 70%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                    '&:hover': {
                      transform: 'translateX(-2px)',
                    },
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
                    bgcolor: 'rgba(255,255,255,0.6)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: radius.card,
                    border: '1px solid rgba(255,255,255,0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at 70% 50%, ${alpha(colors.success, 0.1)} 0%, transparent 70%)`,
                      opacity: 0,
                      transition: 'opacity 0.3s',
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                    '&:hover': {
                      transform: 'translateX(2px)',
                    },
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
          <Divider
            sx={{
              my: 4,
              background: `linear-gradient(90deg, transparent, ${colors.primaryLight}, transparent)`,
              height: 2,
              border: 'none',
            }}
          />
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container ref={howItWorksRef} id="how-it-works" maxWidth="lg" sx={{ py: 8, bgcolor: '#ffffff' }} className="reveal-up">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Typography variant="h2" align="center" sx={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em', mb: 5 }}>
            How It Works
          </Typography>
        </motion.div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Grid container spacing={4}>
            {howItWorks.map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div variants={childVariants}>
                  <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        p: 4,
                        borderRadius: radius.card,
                        bgcolor: 'rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        '&:hover': {
                          transform: 'translateY(-4px) scale(1.02)',
                          boxShadow: `0 20px 30px ${alpha(colors.primary, 0.1)}`,
                        },
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
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Pricing Section */}
      <Container ref={pricingRef} id="pricing" maxWidth="lg" sx={{ py: 8, bgcolor: '#f5f9ff' }} className="reveal-up">
        <Typography variant="h2" align="center" sx={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em', mb: 5 }}>
          Simple, Transparent Pricing
        </Typography>
        <Grid container spacing={4} alignItems="flex-end">
          {['Starter', 'Professional', 'Enterprise'].map((plan, idx) => {
            const price = idx === 0 ? '3,500' : idx === 1 ? '7,000' : '12,000';
            return (
              <Grid item xs={12} md={4} key={idx} style={{ transitionDelay: `${idx * 0.2}s` }}>
                <Paper
                  sx={{
                    p: 4,
                    bgcolor: idx === 1 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: radius.card,
                    border: idx === 1 ? `2px solid ${colors.primary}` : '1px solid rgba(255,255,255,0.5)',
                    boxShadow: idx === 1 ? `0 20px 40px ${alpha(colors.primary, 0.2)}` : 'none',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 20px 30px ${alpha(colors.primary, 0.15)}`,
                    },
                    position: 'relative',
                    overflow: 'hidden',
                    ...(idx === 1 && {
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                        animation: 'gradientMove 3s infinite',
                      },
                    }),
                  }}
                >
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {plan}
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: colors.primary, mb: 2 }}>
                    ৳{price}<Typography component="span" variant="body2" color={colors.textLight}>/mo</Typography>
                  </Typography>
                  <List>
                    {['Feature 1', 'Feature 2', 'Feature 3'].map((f, i) => (
                      <ListItem key={i} sx={{ px: 0, py: 0.5 }}>
                        <CheckIcon sx={{ color: colors.success, mr: 1, fontSize: 18 }} />
                        <Typography variant="body2">{f}</Typography>
                      </ListItem>
                    ))}
                  </List>
                  <Button variant={idx === 1 ? 'contained' : 'outlined'} fullWidth sx={{ mt: 3 }}>
                    Choose Plan
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Use Cases */}
      <Container maxWidth="lg" sx={{ py: 8, bgcolor: '#f5f9ff' }} className="reveal-up">
        <Typography variant="h2" align="center" sx={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em', mb: 5 }}>
          Use Cases
        </Typography>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Grid container spacing={4}>
            {[
              { title: 'Healthcare', icon: <MedicalServicesIcon />, desc: 'Manage patient appointments seamlessly.' },
              { title: 'Education', icon: <SchoolIcon />, desc: 'Schedule tutoring sessions and office hours.' },
              { title: 'Consulting', icon: <PersonIcon />, desc: 'Book client consultations with ease.' },
              { title: 'Fitness', icon: <FitnessCenterIcon />, desc: 'Personal training and class scheduling.' },
            ].map((item, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <motion.div variants={childVariants}>
                  <TiltCard>
                    <Card
                      sx={{
                        height: '100%',
                        p: 3,
                        borderRadius: radius.card,
                        bgcolor: 'rgba(255,255,255,0.4)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.5)',
                        transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                        '&:hover': {
                          transform: 'translateY(-4px) scale(1.02)',
                          boxShadow: `0 20px 30px ${alpha(colors.primary, 0.15)}`,
                        },
                      }}
                    >
                      <Box sx={{ color: colors.primary, fontSize: 48, mb: 2 }}>{item.icon}</Box>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography color={colors.textSecondary}>{item.desc}</Typography>
                    </Card>
                  </TiltCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Statistics */}
      <Container maxWidth="lg" sx={{ py: 8, bgcolor: '#ffffff' }} className="reveal-up">
        <Grid container spacing={4} justifyContent="center">
          {(() => {
  const stats = [
    { number: 10, suffix: 'K+', label: 'Appointments' },
    { number: 98, suffix: '%', label: 'Satisfaction' },
    { display: '24/7', label: 'Support' },
    { number: 50, suffix: '+', label: 'Integrations' },
  ];

  return stats.map((stat, idx) => (
    <Grid item xs={6} sm={3} key={idx} style={{ transitionDelay: `${idx * 0.1}s` }}>
      <Paper
        sx={{
          p: 3,
          textAlign: 'center',
          bgcolor: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(8px)',
          borderRadius: radius.card,
          border: '1px solid rgba(255,255,255,0.5)',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 20px 30px ${alpha(colors.primary, 0.1)}`,
          },
        }}
      >
        {'display' in stat ? (
          <Typography variant="h3" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
            {stat.display}
          </Typography>
        ) : (
          <CountUp end={stat.number} suffix={stat.suffix} />
        )}
        <Typography color={colors.textSecondary}>{stat.label}</Typography>
      </Paper>
    </Grid>
  ));
})()}
        </Grid>
      </Container>

      {/* Security */}
      <Box sx={{ bgcolor: '#f8fbff', py: 8 }} className="reveal-up">
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <LockIcon sx={{ fontSize: 80, color: colors.primary }} />
                <Box
                  sx={{
                    position: 'absolute',
                    top: -10,
                    left: -10,
                    right: -10,
                    bottom: -10,
                    borderRadius: '50%',
                    border: `2px solid ${colors.primaryLight}`,
                    opacity: 0.5,
                    animation: 'ripple 2s infinite',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, fontSize: '2rem', letterSpacing: '-0.01em' }}>
                Enterprise‑Grade Security
              </Typography>
              <Typography variant="h6" color={colors.textSecondary} paragraph>
                Your data is encrypted and protected with the highest standards.
              </Typography>
              <Button variant="contained" sx={{ bgcolor: colors.primary }}>
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials with confetti */}
      <Container maxWidth="lg" sx={{ py: 8, bgcolor: '#ffffff' }} className="reveal-up" ref={testimonialRef}>
        <Typography variant="h2" align="center" sx={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em', mb: 5 }}>
          What Our Clients Say
        </Typography>
        <Grid container spacing={4}>
          {[1, 2, 3].map((_, idx) => (
            <Grid item xs={12} md={4} key={idx} style={{ transitionDelay: `${idx * 0.2}s` }}>
              <Paper
                sx={{
                  p: 4,
                  bgcolor: 'rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: radius.card,
                  border: '1px solid rgba(255,255,255,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  '&:hover': {
                    transform: 'rotateY(2deg) translateY(-4px)',
                    boxShadow: `0 20px 30px ${alpha(colors.primary, 0.1)}`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: colors.primary }}>JD</Avatar>
                  <Box>
                    <Typography fontWeight={600}>John Doe</Typography>
                    <Typography variant="body2" color={colors.textLight}>CEO, Company</Typography>
                  </Box>
                </Box>
                <Typography color={colors.textSecondary} paragraph>
                  “Appointo transformed how we manage appointments. Incredible experience.”
                </Typography>
                <Rating value={5} readOnly size="small" />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ */}
      <Container maxWidth="md" sx={{ py: 8, bgcolor: '#ffffff' }} className="reveal-up">
        <Typography variant="h2" align="center" sx={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.01em', mb: 5 }}>
          Frequently Asked Questions
        </Typography>
        {['How does scheduling work?', 'Can I cancel anytime?', 'Is there a free trial?'].map((question, idx) => (
          <Accordion
            key={idx}
            sx={{
              mb: 2,
              borderRadius: `${radius.card}px !important`,
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.5)',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color={colors.textSecondary}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Final CTA */}
      <Box sx={{ bgcolor: '#f9fbff', py: 8 }} className="reveal-up">
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 6, md: 8 },
              textAlign: 'center',
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: radius.card,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at 50% 0%, ${alpha(colors.primary, 0.15)} 0%, transparent 70%)`,
                pointerEvents: 'none',
              },
            }}
          >
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-0.01em', mb: 2 }}>
              Start Managing Your Appointments Today
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, color: colors.textSecondary, fontSize: '1.125rem' }}>
              Join thousands of satisfied users who trust Appointo.
            </Typography>

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
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                overflow: 'hidden',
                boxShadow: `0 8px 20px ${alpha(colors.primary, 0.2)}`,
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
                  transform: 'translateY(-4px) scale(1.02)',
                  boxShadow: `0 20px 30px ${alpha(colors.primary, 0.3)}`,
                },
              }}
            >
              Get Started Now
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box ref={contactRef} id="contact">
        <Footer />
      </Box>

      {/* ========== MODALS ========== */}
      <GlassModal open={openLogin} onClose={() => setOpenLogin(false)}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'white', fontWeight: 600, mb: 3 }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          {loginError && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
              {loginError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            autoComplete="email"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'transparent',
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
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            autoComplete="current-password"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'transparent',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <Button
            type="submit"
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
        <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
          {registerError && (
            <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }}>
              {registerError}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            required
            autoComplete="name"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'transparent',
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
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
            autoComplete="email"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'transparent',
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
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
            autoComplete="new-password"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'transparent',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={registerConfirmPassword}
            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            InputLabelProps={{ sx: { color: 'rgba(255,255,255,0.7)' } }}
            InputProps={{
              sx: {
                color: 'white',
                backgroundColor: 'transparent',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: colors.primaryLight },
              },
            }}
          />
          <Button
            type="submit"
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

      {/* Animation keyframes */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% 0%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes gradientMesh {
          0% { background-position: 0% 0%; transform: scale(1); }
          50% { background-position: 100% 100%; transform: scale(1.02); }
          100% { background-position: 0% 0%; transform: scale(1); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes slowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes sweep {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes pulseWidth {
          0%, 100% { width: 30%; margin-left: 0%; }
          50% { width: 70%; margin-left: 15%; }
        }
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </Box>
  );
};

export default Home;