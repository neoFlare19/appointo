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
import { RegisterCredentials } from '../types';

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
  name: yup
    .string()
    .required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

const Register: React.FC = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values: RegisterCredentials) => {
      try {
        setError('');
        await register(values);
        navigate('/dashboard');
      } catch (err) {
        setError('Registration failed. Please try again.');
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
              Create Account
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
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="new-password"
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                  </Button>
                </LiquidGlassWrapper>
              </Box>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Box>
            </Box>
          </Paper>
        </LiquidGlassWrapper>
      </Box>
    </Container>
  );
};

export default Register;