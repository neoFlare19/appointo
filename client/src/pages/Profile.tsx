import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  TextField,
  Divider,
  Switch,
  alpha,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const colors = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  primaryLight: '#3B82F6',
  accent: '#0EA5E9',
  success: '#10B981',
  error: '#DC2626',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  border: '#E2E8F0',
};

const radius = {
  card: 8,    
  button: 8,
  pill: 20,
};

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 234 567 890',
    password: '',
  });

  const stats = {
    total: 47,
    completed: 42,
    cancelled: 5,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Save logic
    setEditMode(false);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: colors.textPrimary, mb: 1 }}>
        Profile Settings
      </Typography>
      <Typography variant="body1" color={colors.textSecondary} sx={{ mb: 4 }}>
        Manage your account information and preferences.
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              borderRadius: radius.card,
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
              textAlign: 'center',
            }}
          >
            <Avatar
              src={user?.avatar}
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2, bgcolor: colors.primary }}
            >
              {user?.name?.[0]}
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
              {user?.name}
            </Typography>
            <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 2 }}>
              {user?.email}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(!editMode)}
              sx={{
                borderColor: colors.primary,
                color: colors.primary,
                borderRadius: radius.button,
                '&:hover': { borderColor: colors.primaryDark, bgcolor: alpha(colors.primary, 0.05) },
              }}
            >
              Edit Profile
            </Button>
          </Paper>
        </Grid>

        {/* Account Information */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              borderRadius: radius.card,
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
              Account Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: radius.button,
                      bgcolor: 'rgba(255,255,255,0.8)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: radius.button,
                      bgcolor: 'rgba(255,255,255,0.8)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: radius.button,
                      bgcolor: 'rgba(255,255,255,0.8)',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!editMode}
                  placeholder="••••••••"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      borderRadius: radius.button,
                      bgcolor: 'rgba(255,255,255,0.8)',
                    },
                  }}
                />
              </Grid>
            </Grid>
            {editMode && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{
                    bgcolor: colors.primary,
                    borderRadius: radius.button,
                    '&:hover': { bgcolor: colors.primaryDark },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            )}
          </Paper>

          {/* Security Section */}
          <Paper
            sx={{
              p: 3,
              mt: 3,
              borderRadius: radius.card,
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
              Security
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SecurityIcon sx={{ color: colors.primary }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, color: colors.textPrimary }}>
                    Two-Factor Authentication
                  </Typography>
                  <Typography variant="body2" color={colors.textSecondary}>
                    Add an extra layer of security to your account.
                  </Typography>
                </Box>
              </Box>
              <Switch color="primary" />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Button
              variant="outlined"
              startIcon={<LockIcon />}
              sx={{ borderColor: colors.primary, color: colors.primary, borderRadius: radius.button }}
            >
              Change Password
            </Button>
          </Paper>
        </Grid>

        {/* Account Statistics */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: radius.card,
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.5)',
              boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
              Account Statistics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: alpha(colors.primary, 0.05), borderRadius: radius.card, boxShadow: 'none' }}>
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
                      {stats.total}
                    </Typography>
                    <Typography variant="body2" color={colors.textSecondary}>
                      Total Bookings
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: alpha(colors.success, 0.05), borderRadius: radius.card, boxShadow: 'none' }}>
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: colors.success, mb: 1 }}>
                      {stats.completed}
                    </Typography>
                    <Typography variant="body2" color={colors.textSecondary}>
                      Completed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: alpha(colors.error, 0.05), borderRadius: radius.card, boxShadow: 'none' }}>
                  <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: colors.error, mb: 1 }}>
                      {stats.cancelled}
                    </Typography>
                    <Typography variant="body2" color={colors.textSecondary}>
                      Cancelled
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;