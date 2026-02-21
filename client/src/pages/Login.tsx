import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
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

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required')
});

const NUM_BUBBLES = 15;

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values: LoginCredentials) => {
      try {
        setError('');
        await login(values);
        navigate('/dashboard');
      } catch {
        setError(
          'Invalid email or password. Use "user@example.com" with password "password" for demo.'
        );
      }
    }
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Animated Baby Blue Bubbles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) scale(0.3);
            opacity: 0;
          }
          20% {
            opacity: 0.4;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-200px) scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes floatSideways {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(30px);
          }
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
        const size = 30 + Math.random() * 90; // 30px to 120px
        const left = Math.random() * 100; // percent
        const delay = Math.random() * 20; // seconds
        const duration = 12 + Math.random() * 18; // seconds
        const sidewayDuration = 5 + Math.random() * 8; // seconds
        const sidewayDelay = Math.random() * 5; // seconds
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
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '20%',
                height: '20%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 80%)',
                borderRadius: '50%',
              }
            }}
          />
        );
      })}

      {/* Login Card - Exactly the same as original */}
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            p: 5,
            borderRadius: '32px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%)',
            color: '#0f172a'
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 600, mb: 3 }}
          >
            Log in to Appointo
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 4,
                borderRadius: '999px',
                py: 1.6,
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Login'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link component={RouterLink} to="/register" sx={{ color: '#3b82f6' }}>
                Don’t have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;