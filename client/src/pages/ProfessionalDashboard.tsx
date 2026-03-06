import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Button,
  Chip,
  alpha,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  CheckCircle as CheckIcon,
  AttachMoney as MoneyIcon,
  Today as TodayIcon,
  DateRange as WeekIcon,
  ViewAgenda as AgendaIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// ========== COLOR PALETTE (matching the design) ==========
const colors = {
  primary: '#2F6BFF',
  primaryLight: '#5EA8FF',
  success: '#10B981',
  error: '#DC2626',
  border: '#E6F0FF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  background: '#F9FBFF',
  cardBg: 'rgba(255,255,255,0.7)',
};

const radius = {
  card: 16,
  button: 12,
};

// ========== STATISTICS CARD COMPONENT ==========
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: radius.card,
          bgcolor: colors.cardBg,
          backdropFilter: 'blur(12px)',
          border: `1px solid ${colors.border}`,
          boxShadow: `0 10px 30px ${alpha(colors.primary, 0.06)}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.5)})`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" color={colors.textSecondary} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: colors.textPrimary }}>
              {value}
            </Typography>
            {trend && (
              <Typography variant="caption" sx={{ color: colors.success, mt: 1, display: 'block' }}>
                {trend}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: alpha(color, 0.1),
              color: color,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </Paper>
    </motion.div>
  );
};

// ========== MAIN DASHBOARD COMPONENT ==========
const ProfessionalDashboard: React.FC = () => {
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');

  // Sample data for stats
  const stats = {
    totalAppointments: 128,
    upcomingToday: 8,
    completed: 94,
    earnings: '$4,250',
  };

  // Sample appointments (for calendar demo)
  const appointments = [
    { id: 1, client: 'John Doe', service: 'Consultation', date: '2025-03-15', time: '10:00', status: 'confirmed' },
    { id: 2, client: 'Jane Smith', service: 'Follow-up', date: '2025-03-15', time: '14:00', status: 'completed' },
    { id: 3, client: 'Mike Johnson', service: 'Consultation', date: '2025-03-16', time: '09:30', status: 'cancelled' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return colors.primary;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  return (
    <Box sx={{ bgcolor: colors.background, minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: colors.textPrimary, mb: 1 }}>
            Professional Dashboard
          </Typography>
          <Typography variant="body1" color={colors.textSecondary}>
            Monitor your appointments and manage your schedule efficiently.
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Appointments"
              value={stats.totalAppointments}
              icon={<CalendarIcon />}
              color={colors.primary}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Upcoming Today"
              value={stats.upcomingToday}
              icon={<ClockIcon />}
              color={colors.primaryLight}
              trend="+2 from yesterday"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Completed"
              value={stats.completed}
              icon={<CheckIcon />}
              color={colors.success}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Earnings"
              value={stats.earnings}
              icon={<MoneyIcon />}
              color="#F59E0B"
            />
          </Grid>
        </Grid>

        {/* Calendar Section */}
        <Paper
          sx={{
            p: 3,
            borderRadius: radius.card,
            bgcolor: colors.cardBg,
            backdropFilter: 'blur(12px)',
            border: `1px solid ${colors.border}`,
            boxShadow: `0 10px 30px ${alpha(colors.primary, 0.06)}`,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
              Schedule
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={calendarView === 'month' ? 'contained' : 'outlined'}
                onClick={() => setCalendarView('month')}
                startIcon={<TodayIcon />}
                sx={{
                  borderRadius: radius.button,
                  bgcolor: calendarView === 'month' ? colors.primary : 'transparent',
                  borderColor: colors.primary,
                  color: calendarView === 'month' ? '#fff' : colors.primary,
                  '&:hover': {
                    bgcolor: calendarView === 'month' ? colors.primary : alpha(colors.primary, 0.1),
                  },
                }}
              >
                Month
              </Button>
              <Button
                variant={calendarView === 'week' ? 'contained' : 'outlined'}
                onClick={() => setCalendarView('week')}
                startIcon={<WeekIcon />}
                sx={{
                  borderRadius: radius.button,
                  bgcolor: calendarView === 'week' ? colors.primary : 'transparent',
                  borderColor: colors.primary,
                  color: calendarView === 'week' ? '#fff' : colors.primary,
                  '&:hover': {
                    bgcolor: calendarView === 'week' ? colors.primary : alpha(colors.primary, 0.1),
                  },
                }}
              >
                Week
              </Button>
              <Button
                variant={calendarView === 'day' ? 'contained' : 'outlined'}
                onClick={() => setCalendarView('day')}
                startIcon={<AgendaIcon />}
                sx={{
                  borderRadius: radius.button,
                  bgcolor: calendarView === 'day' ? colors.primary : 'transparent',
                  borderColor: colors.primary,
                  color: calendarView === 'day' ? '#fff' : colors.primary,
                  '&:hover': {
                    bgcolor: calendarView === 'day' ? colors.primary : alpha(colors.primary, 0.1),
                  },
                }}
              >
                Day
              </Button>
            </Box>
          </Box>

          {/* Calendar Placeholder (replace with actual calendar component) */}
          <Box
            sx={{
              bgcolor: alpha(colors.primary, 0.02),
              borderRadius: radius.card,
              p: 4,
              minHeight: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body1" color={colors.textSecondary} sx={{ mb: 2 }}>
              {calendarView === 'month' && 'Monthly Calendar View'}
              {calendarView === 'week' && 'Weekly Calendar View'}
              {calendarView === 'day' && 'Daily Calendar View'}
            </Typography>
            <Typography variant="body2" color={colors.textSecondary}>
              (Integrate a calendar library like `react-big-calendar` or `fullcalendar`)
            </Typography>

            {/* Sample appointments list */}
            <Box sx={{ width: '100%', mt: 3 }}>
              {appointments.map((apt) => (
                <Paper
                  key={apt.id}
                  sx={{
                    p: 2,
                    mb: 1,
                    borderRadius: radius.button,
                    borderLeft: `4px solid ${getStatusColor(apt.status)}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {apt.client} – {apt.service}
                    </Typography>
                    <Typography variant="caption" color={colors.textSecondary}>
                      {apt.date} at {apt.time}
                    </Typography>
                  </Box>
                  <Chip
                    label={apt.status}
                    size="small"
                    sx={{
                      bgcolor: alpha(getStatusColor(apt.status), 0.1),
                      color: getStatusColor(apt.status),
                      fontWeight: 600,
                    }}
                  />
                </Paper>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfessionalDashboard;