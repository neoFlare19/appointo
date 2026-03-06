import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  alpha,
} from '@mui/material';
import {
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import HoverGlow, { colors, radius } from '../components/HoverGlow';

// ========== MINI CHART ==========
const MiniChart: React.FC = () => {
  const points = [10, 15, 8, 12, 18, 14, 20];
  const max = Math.max(...points);
  const width = 100;
  const height = 30;
  const step = width / (points.length - 1);
  const path = points.map((p, i) => `${i * step},${height - (p / max) * height}`).join(' L ');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline
        points={path}
        fill="none"
        stroke={colors.primary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ========== COUNTDOWN TIMER ==========
const CountdownTimer: React.FC<{ targetDate: string; targetTime: string }> = ({ targetDate, targetTime }) => {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date(`${targetDate}T${targetTime}`);
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('Now');
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [targetDate, targetTime]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <AccessTimeIcon fontSize="small" sx={{ color: colors.primary }} />
      <Typography variant="body2" color={colors.textPrimary}>
        {timeLeft}
      </Typography>
    </Box>
  );
};

// ========== MINI CALENDAR ==========
const MiniCalendar: React.FC<{ appointments: Array<{ date: string }> }> = ({ appointments }) => {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  const appointmentDays = appointments.map(apt => new Date(apt.date).getDate());

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle2" align="center" sx={{ mb: 1, fontWeight: 600, color: colors.textPrimary }}>
        {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
      </Typography>
      <Grid container spacing={1}>
        {days.map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography variant="caption" align="center" sx={{ display: 'block', color: colors.textSecondary }}>
              {day}
            </Typography>
          </Grid>
        ))}
        {Array.from({ length: startOffset }).map((_, i) => (
          <Grid item xs={12 / 7} key={`empty-${i}`}>
            <Box sx={{ height: 30 }} />
          </Grid>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isToday = day === currentDate.getDate();
          const hasAppointment = appointmentDays.includes(day);
          return (
            <Grid item xs={12 / 7} key={day}>
              <Box
                sx={{
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: radius.pill,
                  bgcolor: isToday ? alpha(colors.primary, 0.1) : 'transparent',
                  color: isToday ? colors.primary : colors.textPrimary,
                  fontWeight: isToday ? 600 : 400,
                  cursor: 'default',
                  position: 'relative',
                }}
              >
                {day}
                {hasAppointment && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 2,
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: colors.primary,
                      boxShadow: `0 0 8px ${colors.primary}`,
                    }}
                  />
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// ========== MAIN DASHBOARD HOME ==========
const DashboardHome: React.FC = () => {
  const upcomingAppointments = [
    { id: 1, title: 'Dental Checkup', date: '2025-03-15', time: '10:00 AM', status: 'confirmed', professional: 'Dr. Smith' },
    { id: 2, title: 'Haircut', date: '2025-03-16', time: '2:30 PM', status: 'confirmed', professional: 'Jane' },
    { id: 3, title: 'Meeting with Client', date: '2025-03-17', time: '11:00 AM', status: 'pending', professional: 'John' },
  ];

  const recentActivity = [
    { id: 1, action: 'Booked appointment', service: 'Haircut', date: '2025-03-10', time: '2 days ago' },
    { id: 2, action: 'Cancelled appointment', service: 'Massage', date: '2025-03-09', time: '3 days ago' },
    { id: 3, action: 'Updated profile', service: '', date: '2025-03-08', time: '4 days ago' },
  ];

  const stats = {
    upcoming: 3,
    completed: 12,
    pending: 1,
    nextAppointment: upcomingAppointments[0],
  };

  return (
    <Box>
      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Next Appointment Card */}
        <Grid item xs={12} md={4}>
          <Box className="fadeUp" sx={{ animationDelay: '0.1s' }}>
            <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: radius.card,
                  bgcolor: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
                    animation: 'borderGlow 3s infinite',
                  },
                }}
              >
                <Typography variant="subtitle2" color={colors.textSecondary} gutterBottom>
                  Next Appointment
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                  {stats.nextAppointment.title}
                </Typography>
                <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 1 }}>
                  with {stats.nextAppointment.professional}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EventIcon fontSize="small" sx={{ color: colors.primary }} />
                    <Typography variant="body2" color={colors.textPrimary}>
                      {stats.nextAppointment.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon fontSize="small" sx={{ color: colors.primary }} />
                    <Typography variant="body2" color={colors.textPrimary}>
                      {stats.nextAppointment.time}
                    </Typography>
                  </Box>
                  <CountdownTimer targetDate={stats.nextAppointment.date} targetTime={stats.nextAppointment.time} />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: colors.primary,
                    borderRadius: radius.button,
                    py: 1,
                    fontWeight: 600,
                    boxShadow: `0 8px 20px ${alpha(colors.primary, 0.3)}`,
                    transition: 'all 0.3s',
                    '&:hover': {
                      bgcolor: colors.primaryDark,
                      boxShadow: `0 12px 28px ${alpha(colors.primary, 0.4)}`,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  View Details
                </Button>
              </Paper>
            </HoverGlow>
          </Box>
        </Grid>

        {/* Total Appointments Card */}
        <Grid item xs={6} md={4}>
          <Box className="fadeUp" sx={{ animationDelay: '0.2s' }}>
            <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: radius.card,
                  bgcolor: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Typography variant="subtitle2" color={colors.textSecondary} gutterBottom>
                  Total Appointments
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: colors.primary,
                    textShadow: `0 0 20px ${alpha(colors.primary, 0.5)}`,
                    animation: 'counterPop 1s ease-out',
                  }}
                >
                  {stats.completed + stats.upcoming + stats.pending}
                </Typography>
                <MiniChart />
              </Paper>
            </HoverGlow>
          </Box>
        </Grid>

        {/* Completed Sessions Card */}
        <Grid item xs={6} md={4}>
          <Box className="fadeUp" sx={{ animationDelay: '0.3s' }}>
            <HoverGlow borderRadius={radius.card} color={colors.success} lift>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: radius.card,
                  bgcolor: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: `0 8px 20px ${alpha(colors.success, 0.08)}`,
                }}
              >
                <Typography variant="subtitle2" color={colors.textSecondary} gutterBottom>
                  Completed Sessions
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, color: colors.success, mb: 1 }}>
                  {stats.completed}
                </Typography>
                <MiniChart />
              </Paper>
            </HoverGlow>
          </Box>
        </Grid>
      </Grid>

      {/* Calendar + Recent Activity Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box className="fadeUp" sx={{ animationDelay: '0.4s' }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: radius.card,
                bgcolor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                Calendar
              </Typography>
              <MiniCalendar appointments={upcomingAppointments} />
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button variant="text" sx={{ color: colors.primary, fontWeight: 600 }}>
                  View Full Calendar
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={5}>
          <Box className="fadeUp" sx={{ animationDelay: '0.5s' }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: radius.card,
                bgcolor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity, idx) => (
                  <ListItem key={activity.id} sx={{ px: 0, animation: `zoomIn 0.5s ease-out ${0.5 + idx * 0.1}s forwards`, opacity: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: alpha(colors.primary, 0.1), color: colors.primary }}>
                        {activity.action.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.service ? `${activity.service} • ${activity.time}` : activity.time}
                      primaryTypographyProps={{ color: colors.textPrimary }}
                      secondaryTypographyProps={{ color: colors.textSecondary }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Grid>

        {/* Quick Actions + Insight */}
        <Grid item xs={12} md={3}>
          <Box className="fadeUp" sx={{ animationDelay: '0.6s' }}>
            <Paper
              sx={{
                p: 2,
                borderRadius: radius.card,
                bgcolor: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.5)',
                boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 2 }}>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <HoverGlow borderRadius={radius.button} color={colors.primary} lift>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<EventIcon />}
                    sx={{ bgcolor: colors.primary, borderRadius: radius.button, py: 1.5 }}
                  >
                    Book New
                  </Button>
                </HoverGlow>
                <HoverGlow borderRadius={radius.button} color={colors.accent} lift>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<EventIcon />}
                    sx={{ borderColor: colors.accent, color: colors.accent, borderRadius: radius.button, py: 1.5 }}
                  >
                    View All
                  </Button>
                </HoverGlow>
                <HoverGlow borderRadius={radius.button} color={colors.primaryLight} lift>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PersonIcon />}
                    sx={{ borderColor: colors.primaryLight, color: colors.primaryLight, borderRadius: radius.button, py: 1.5 }}
                  >
                    Contact Support
                  </Button>
                </HoverGlow>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1 }}>
                Personal Insight
              </Typography>
              <Typography variant="body2" color={colors.textSecondary}>
                You usually book appointments on Mondays. Want to schedule one?
              </Typography>
              <Button variant="text" sx={{ mt: 1, color: colors.primary, fontWeight: 600 }}>
                Yes, show me
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Animation keyframes */}
      <style>{`
        @keyframes counterPop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes zoomIn {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
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
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default DashboardHome;