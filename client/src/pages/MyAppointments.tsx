import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Tabs,
  Tab,
  alpha,
  Divider,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Cancel as CancelIcon,
  Refresh as RescheduleIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import HoverGlow, { colors, radius } from '../components/HoverGlow';

interface Appointment {
  id: number;
  professional: string;
  service: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

const mockAppointments: Appointment[] = [
  { id: 1, professional: 'Dr. Smith', service: 'Dental Checkup', date: '2025-03-15', time: '10:00 AM', status: 'upcoming' },
  { id: 2, professional: 'Jane', service: 'Haircut', date: '2025-03-16', time: '2:30 PM', status: 'upcoming' },
  { id: 3, professional: 'Dr. Johnson', service: 'General Consultation', date: '2025-03-10', time: '11:00 AM', status: 'completed' },
  { id: 4, professional: 'Mike', service: 'Massage', date: '2025-03-08', time: '3:00 PM', status: 'cancelled' },
];

const statusColors = {
  upcoming: colors.primary,
  completed: colors.success,
  cancelled: colors.error,
};

const MyAppointments: React.FC = () => {
  const [tab, setTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const filteredAppointments = mockAppointments.filter((apt) => {
    if (tab === 0) return apt.status === 'upcoming';
    if (tab === 1) return apt.status === 'completed';
    return apt.status === 'cancelled';
  });

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, color: colors.textPrimary, mb: 1 }}>
        My Appointments
      </Typography>
      <Typography variant="body1" color={colors.textSecondary} sx={{ mb: 3 }}>
        View and manage all your appointments.
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 3,
          borderRadius: radius.card, // now 8
          bgcolor: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
        }}
      >
        <Tabs value={tab} onChange={handleChange} variant="fullWidth" sx={{ '& .MuiTab-root': { fontWeight: 600 } }}>
          <Tab label="Upcoming" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {filteredAppointments.map((apt) => (
          <Grid item xs={12} md={6} key={apt.id}>
            <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
              <Card
                sx={{
                  borderRadius: radius.card, // now 8
                  bgcolor: 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
                  transition: 'all 0.3s',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
                        {apt.service}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 16, color: colors.textSecondary }} />
                        <Typography variant="body2" color={colors.textSecondary}>
                          {apt.professional}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={apt.status}
                      size="small"
                      sx={{
                        bgcolor: alpha(statusColors[apt.status], 0.1),
                        color: statusColors[apt.status],
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarIcon sx={{ fontSize: 16, color: colors.primary }} />
                      <Typography variant="body2" color={colors.textPrimary}>
                        {apt.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: colors.primary }} />
                      <Typography variant="body2" color={colors.textPrimary}>
                        {apt.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    {apt.status === 'upcoming' && (
                      <>
                        <Button
                          size="small"
                          startIcon={<CancelIcon />}
                          sx={{ color: colors.error, '&:hover': { bgcolor: alpha(colors.error, 0.1) } }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="small"
                          startIcon={<RescheduleIcon />}
                          sx={{ color: colors.primary, '&:hover': { bgcolor: alpha(colors.primary, 0.1) } }}
                        >
                          Reschedule
                        </Button>
                      </>
                    )}
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      sx={{ color: colors.textSecondary, '&:hover': { bgcolor: alpha(colors.textSecondary, 0.1) } }}
                    >
                      View Details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </HoverGlow>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyAppointments;