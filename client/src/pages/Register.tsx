import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  alpha,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

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
        background: `radial-gradient(circle, ${alpha('#2563EB', 0.08)} 0%, transparent 70%)`,
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

// ========================================================

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
  backgroundDeep: '#F5F9FF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textLight: '#94A3B8',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
};

const radius = {
  card: 8,
  button: 4,
  pill: 20,
};

const NUM_BUBBLES = 15;

const Register: React.FC = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register({ name, email, password, confirmPassword });
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        bgcolor: '#ffffff',
      }}
    >
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
            top: '20%',
            right: '10%',
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
            inset: 0,
            opacity: 0.02,
            mixBlendMode: 'overlay',
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Bubbles */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(100vh) scale(0.3); opacity: 0; }
          20% { opacity: 0.4; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-200px) scale(1.2); opacity: 0; }
        }
        @keyframes floatSideways {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(173, 216, 230, 0.8), rgba(135, 206, 235, 0.3));
          box-shadow: inset -3px -3px 10px rgba(255,255,255,0.8), inset 3px 3px 15px rgba(255,255,255,0.9);
          animation: floatUp linear infinite, floatSideways ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      {Array.from({ length: NUM_BUBBLES }).map((_, i) => {
        const size = 30 + Math.random() * 90;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = 12 + Math.random() * 18;
        const sidewayDuration = 5 + Math.random() * 8;
        const sidewayDelay = Math.random() * 5;
        const opacity = 0.1 + Math.random() * 0.3;

        return (
          <Box
            key={i}
            className="bubble"
            sx={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: '-200px',
              animationDuration: `${duration}s, ${sidewayDuration}s`,
              animationDelay: `${delay}s, ${sidewayDelay}s`,
              background: `radial-gradient(circle at 30% 30%, rgba(173, 216, 230, ${opacity + 0.3}), rgba(135, 206, 235, ${opacity}))`,
              zIndex: -5,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '20%',
                height: '20%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 80%)',
                borderRadius: '50%',
              },
            }}
          />
        );
      })}

      {/* Glass Card */}
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            p: 5,
            borderRadius: radius.card,
            bgcolor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: `0 20px 40px ${alpha(colors.primary, 0.08)}`,
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeInUp 0.8s ease-out',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 50% 0%, ${alpha(colors.primary, 0.1)} 0%, transparent 70%)`,
              pointerEvents: 'none',
            },
          }}
        >
          <Typography variant="h5" align="center" sx={{ fontWeight: 700, mb: 3, color: colors.textPrimary }}>
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: radius.button,
                  backgroundColor: 'transparent',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: radius.button,
                  backgroundColor: 'transparent',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: radius.button,
                  backgroundColor: 'transparent',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
                },
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              variant="outlined"
              InputProps={{
                sx: {
                  borderRadius: radius.button,
                  backgroundColor: 'transparent',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 4,
                py: 1.6,
                bgcolor: colors.primary,
                borderRadius: radius.button,
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: `0 8px 20px ${alpha(colors.primary, 0.3)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: colors.primaryDark,
                  boxShadow: `0 12px 28px ${alpha(colors.primary, 0.4)}`,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign Up'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link component={RouterLink} to="/login" sx={{ color: colors.primary, fontWeight: 500 }}>
                Already have an account? Login
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>

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
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Register;