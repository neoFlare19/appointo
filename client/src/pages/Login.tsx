import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { LoginCredentials } from '../types';

// Liquid glass wrapper component
const LiquidGlassWrapper: React.FC<{
  children: React.ReactNode;
  borderRadius?: number;
}> = ({ children, borderRadius = 12 }) => {
  return (
    <Box
      className="liquid-glass"
      sx={{
        borderRadius: borderRadius,
        transition: 'all 0.3s ease',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required')
});

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: LoginCredentials) => {
      try {
        setError('');
        await login(values);
        navigate('/dashboard');
      } catch (err) {
        setError('Invalid email or password. Use "user@example.com" with password "password" for demo.');
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      {/* Liquid glass styles */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ===== Liquid Glass Base ===== */
        .liquid-glass {
          position: relative;
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          overflow: hidden;
        }

        /* Soft inner shine */
        .liquid-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0.4),
            rgba(255,255,255,0.05)
          );
          opacity: 0.4;
          pointer-events: none;
        }

        /* Hover depth */
        .liquid-glass:hover {
          transform: translateY(-3px);
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
        }
      `}</style>

      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <LiquidGlassWrapper borderRadius={12}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              width: '100%',
              bgcolor: 'transparent',
              boxShadow: 'none',
              borderRadius: 0, // handled by wrapper
            }}
          >
            <Typography component="h1" variant="h5" align="center" gutterBottom>
              Sign In to Appointo
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(4px)',
                  }
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                disabled={loading}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(4px)',
                  }
                }}
              />

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <LiquidGlassWrapper borderRadius={8}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="text"
                    disabled={loading}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      color: '#0F172A',
                      textTransform: 'none',
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                  </Button>
                </LiquidGlassWrapper>
              </Box>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Box>

              <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  Demo Credentials:
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  User: user@example.com / password: password
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Admin: admin@example.com / password: password
                </Typography>
              </Box>
            </Box>
          </Paper>
        </LiquidGlassWrapper>
      </Box>
    </Container>
  );
};

export default Login;