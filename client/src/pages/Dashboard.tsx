import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  alpha,
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Badge,
  TextField,
  InputAdornment,
  Avatar,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  ExitToApp as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation, Outlet, Link as RouterLink } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

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

// ========== COLOR PALETTE ==========
const colors = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
  primaryLight: '#3B82F6',
  accent: '#0EA5E9',
  accentLight: '#38BDF8',
  success: '#10B981',
  error: '#DC2626',
  warning: '#ED6C02',
  info: '#0288D1',
  background: '#FFFFFF',
  backgroundAlt: '#F8FAFC',
  backgroundLight: '#F1F5F9',
  backgroundDeep: '#F5F9FF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
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

// ========== NOTIFICATION WIDGET ==========
const NotificationWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(3);

  const handleClick = () => {
    setOpen(!open);
    if (unread > 0) setUnread(0);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton onClick={handleClick} sx={{ position: 'relative' }}>
        <Badge
          badgeContent={unread}
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              animation: unread > 0 ? 'pulse 2s infinite' : 'none',
            },
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {open && (
        <Paper
          sx={{
            position: 'absolute',
            top: 45,
            right: 0,
            width: 280,
            p: 2,
            borderRadius: radius.card,
            bgcolor: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: `0 8px 20px ${alpha(colors.primary, 0.2)}`,
            zIndex: 1000,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Notifications
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Your appointment is tomorrow" secondary="10:00 AM" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Payment confirmed" secondary="2 hours ago" />
            </ListItem>
            <ListItem>
              <ListItemText primary="New message from Dr. Smith" secondary="5 hours ago" />
            </ListItem>
          </List>
        </Paper>
      )}
    </Box>
  );
};

// ========== APPOINTMENT TYPE ==========
interface Appointment {
  _id: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  professional?: {
    name: string;
    profession: string;
  };
  client?: {
    name: string;
    email: string;
  };
}

// ========== MAIN DASHBOARD ==========
const Dashboard: React.FC = () => {
  const { user, logout, token } = useAuth();  // ADDED token here
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const open = Boolean(anchorEl);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Use token from context instead of localStorage
      
      // Choose endpoint based on user role
      const endpoint = user?.role === 'professional' 
        ? 'http://localhost:5000/api/appointments/professional-appointments'
        : 'http://localhost:5000/api/appointments/my-appointments';
      
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${token}`  // USING TOKEN FROM CONTEXT
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAppointments(data.data);
      } else {
        setError('Failed to load appointments');
      }
    } catch (err) {
      setError('Error connecting to server');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    if (token) {  // Only fetch if token exists
      fetchAppointments();
    }
  }, [token]); // ADDED token as dependency

  // Calculate stats
  const upcomingCount = appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleProfile = () => {
    navigate('/dashboard/profile');
    handleMenuClose();
  };

  // Texture animation
  const textureRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = 0, y = 0, frame: number;
    const animate = () => {
      x += 0.05; y += 0.03;
      if (textureRef.current) textureRef.current.style.backgroundPosition = `${x}px ${y}px`;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Sidebar items
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Book Appointment', icon: <AddIcon />, path: '/dashboard/book-appointment' },
    { text: 'My Appointments', icon: <CalendarIcon />, path: '/dashboard/my-appointments' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/dashboard/notifications' },
    { text: 'Profile', icon: <PersonIcon />, path: '/dashboard/profile' },
    { text: 'Logout', icon: <LogoutIcon />, path: 'logout' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.text === 'Logout') {
      logout();
      navigate('/');
    } else {
      navigate(item.path);
    }
  };

  // Sidebar drawer
  const drawer = (
    <Box
      sx={{
        width: 240,
        height: '100%',
        bgcolor: 'rgba(255,255,255,0.4)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.5)',
        boxShadow: `4px 0 20px ${alpha(colors.primary, 0.05)}`,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ fontWeight: 700, color: colors.primary, textDecoration: 'none' }}
        >
          Appointo
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: colors.border }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavClick(item)}
              sx={{
                borderRadius: location.pathname === item.path ? `0 ${radius.pill}px ${radius.pill}px 0` : 0,
                bgcolor: location.pathname === item.path ? alpha(colors.primary, 0.1) : 'transparent',
                '&.Mui-selected': {
                  bgcolor: alpha(colors.primary, 0.1),
                  '&:hover': { bgcolor: alpha(colors.primary, 0.15) },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    bgcolor: colors.primary,
                    boxShadow: `0 0 10px ${alpha(colors.primary, 0.5)}`,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? colors.primary : colors.textSecondary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  color: location.pathname === item.path ? colors.primary : colors.textSecondary,
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex' }}>
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
            opacity: 0.03,
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Sidebar */}
      <Box component="nav" sx={{ width: { md: 240 }, flexShrink: { md: 0 }, display: { xs: 'none', md: 'block' } }}>
        {drawer}
      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 240 } }}
      >
        {drawer}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <Toolbar sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between' }}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ fontWeight: 700, color: colors.primary, textDecoration: 'none' }}
          >
            Appointo
          </Typography>
        </Toolbar>

        {/* Header */}
        <Box
          className="fadeUp"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary }}>
              Welcome back, {user?.name} 👋
            </Typography>
            <Typography variant="body2" color={colors.textSecondary}>
              {location.pathname === '/dashboard'
                ? "Here's what's happening with your appointments today."
                : "Manage your appointments and settings."}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: searchFocused ? colors.primary : colors.textLight }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: radius.pill,
                  bgcolor: 'rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(8px)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: searchFocused ? colors.primary : colors.border,
                  },
                },
              }}
            />
            <IconButton onClick={toggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <NotificationWidget />
            <Avatar
              src={user?.avatar}
              onClick={handleAvatarClick}
              sx={{ bgcolor: colors.primary, cursor: 'pointer' }}
            >
              {user?.name?.[0]}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Dashboard Home Content - Only show when on /dashboard */}
        {location.pathname === '/dashboard' && (
          <>
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            ) : (
              <Box className="fadeUp" sx={{ animationDelay: '0.2s' }}>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 3 }}>
                  {user?.role === 'professional' ? 'Professional' : 'Client'} Dashboard
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {/* Stats Cards */}
                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255,255,255,0.4)', 
                      backdropFilter: 'blur(8px)',
                      borderRadius: radius.card,
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary, mr: 2 }}>
                            <EventIcon />
                          </Avatar>
                          <Typography variant="h6">Upcoming</Typography>
                        </Box>
                        <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: colors.primary }}>
                          {upcomingCount}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255,255,255,0.4)', 
                      backdropFilter: 'blur(8px)',
                      borderRadius: radius.card,
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: alpha(colors.success, 0.1), color: colors.success, mr: 2 }}>
                            <CheckCircleIcon />
                          </Avatar>
                          <Typography variant="h6">Completed</Typography>
                        </Box>
                        <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: colors.success }}>
                          {completedCount}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255,255,255,0.4)', 
                      backdropFilter: 'blur(8px)',
                      borderRadius: radius.card,
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: alpha(colors.warning, 0.1), color: colors.warning, mr: 2 }}>
                            <PendingIcon />
                          </Avatar>
                          <Typography variant="h6">Pending</Typography>
                        </Box>
                        <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: colors.warning }}>
                          {pendingCount}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255,255,255,0.4)', 
                      backdropFilter: 'blur(8px)',
                      borderRadius: radius.card,
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ bgcolor: alpha(colors.accent, 0.1), color: colors.accent, mr: 2 }}>
                            <AccessTimeIcon />
                          </Avatar>
                          <Typography variant="h6">Total</Typography>
                        </Box>
                        <Typography variant="h4" align="center" sx={{ fontWeight: 600, color: colors.accent }}>
                          {appointments.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  {/* Appointments List */}
                  <Grid item xs={12}>
                    <Paper sx={{ 
                      p: 3, 
                      bgcolor: 'rgba(255,255,255,0.4)', 
                      backdropFilter: 'blur(8px)',
                      borderRadius: radius.card,
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}>
                      <Typography variant="h6" gutterBottom>
                        {user?.role === 'professional' ? 'Appointments with You' : 'Your Recent Appointments'}
                      </Typography>
                      
                      {appointments.length === 0 ? (
                        <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                          No appointments found. Book your first appointment!
                        </Typography>
                      ) : (
                        <List>
                          {appointments.slice(0, 5).map((apt) => (
                            <ListItem key={apt._id} divider sx={{ px: 0 }}>
                              <ListItemAvatar>
                                <Avatar sx={{ 
                                  bgcolor: apt.status === 'confirmed' ? alpha(colors.success, 0.2) : 
                                          apt.status === 'pending' ? alpha(colors.warning, 0.2) :
                                          apt.status === 'completed' ? alpha(colors.info, 0.2) :
                                          alpha(colors.error, 0.2)
                                }}>
                                  <EventIcon sx={{ 
                                    color: apt.status === 'confirmed' ? colors.success : 
                                           apt.status === 'pending' ? colors.warning :
                                           apt.status === 'completed' ? colors.info :
                                           colors.error 
                                  }} />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                      {apt.service}
                                    </Typography>
                                    <Chip
                                      label={apt.status}
                                      size="small"
                                      sx={{
                                        bgcolor: 
                                          apt.status === 'confirmed' ? alpha(colors.success, 0.1) :
                                          apt.status === 'pending' ? alpha(colors.warning, 0.1) :
                                          apt.status === 'completed' ? alpha(colors.info, 0.1) :
                                          alpha(colors.error, 0.1),
                                        color: 
                                          apt.status === 'confirmed' ? colors.success :
                                          apt.status === 'pending' ? colors.warning :
                                          apt.status === 'completed' ? colors.info :
                                          colors.error,
                                        fontWeight: 600,
                                      }}
                                    />
                                  </Box>
                                }
                                secondary={
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      Date: {new Date(apt.date).toLocaleDateString()} at {apt.time}
                                    </Typography>
                                    {user?.role === 'client' && apt.professional && (
                                      <Typography variant="body2" color="text.secondary">
                                        Professional: {apt.professional.name} ({apt.professional.profession})
                                      </Typography>
                                    )}
                                    {user?.role === 'professional' && apt.client && (
                                      <Typography variant="body2" color="text.secondary">
                                        Client: {apt.client.name}
                                      </Typography>
                                    )}
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      )}
                      
                      {appointments.length > 5 && (
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                          <Typography 
                            component={RouterLink} 
                            to="/dashboard/my-appointments"
                            sx={{ color: colors.primary, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                          >
                            View all appointments →
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Grid>

                  {/* User Info Card */}
                  <Grid item xs={12}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255,255,255,0.4)', 
                      backdropFilter: 'blur(8px)',
                      borderRadius: radius.card,
                      border: '1px solid rgba(255,255,255,0.5)',
                    }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Account Information</Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                            <Typography variant="body1">{user?.name}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                            <Typography variant="body1">{user?.email}</Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle2" color="text.secondary">Role</Typography>
                            <Chip
                              label={user?.role}
                              color={user?.role === 'professional' ? 'secondary' : 'primary'}
                              size="small"
                            />
                          </Grid>
                          {user?.profession && (
                            <Grid item xs={12} sm={6}>
                              <Typography variant="subtitle2" color="text.secondary">Profession</Typography>
                              <Typography variant="body1">{user.profession}</Typography>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            )}
          </>
        )}

        {/* Nested routes (Profile, My Appointments, etc.) */}
        {location.pathname !== '/dashboard' && <Outlet />}
      </Box>

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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 ${alpha(colors.primary, 0.7)}; }
          70% { transform: scale(1.05); box-shadow: 0 0 0 10px ${alpha(colors.primary, 0)}; }
          100% { transform: scale(1); box-shadow: 0 0 0 0 ${alpha(colors.primary, 0)}; }
        }
        @keyframes borderGlow {
          0% { opacity: 0.5; transform: scaleX(0.3); transform-origin: left; }
          50% { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0.5; transform: scaleX(0.3); transform-origin: right; }
        }
        .fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </Box>
  );
};

export default Dashboard;