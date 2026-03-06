import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  alpha,
  Divider,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Markunread as MarkUnreadIcon,
  DoneAll as DoneAllIcon,
} from '@mui/icons-material';

const colors = {
  primary: '#2563EB',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  border: '#E2E8F0',
};

const radius = {
  card: 8, // reduced from 12 to 8
  pill: 20,
};

interface Notification {
  id: number;
  type: 'success' | 'reminder' | 'reschedule';
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: 1, type: 'success', message: 'Appointment confirmed with Dr. Smith', timestamp: '2 hours ago', read: false },
  { id: 2, type: 'reminder', message: 'Reminder: Dental Checkup tomorrow at 10:00 AM', timestamp: '1 day ago', read: false },
  { id: 3, type: 'reschedule', message: 'Appointment with Jane rescheduled to 2:30 PM', timestamp: '2 days ago', read: true },
  { id: 4, type: 'success', message: 'Payment confirmed for $120', timestamp: '3 days ago', read: true },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon sx={{ color: '#10B981' }} />;
    case 'reminder':
      return <AccessTimeIcon sx={{ color: '#F59E0B' }} />;
    case 'reschedule':
      return <ErrorIcon sx={{ color: '#DC2626' }} />;
    default:
      return <InfoIcon sx={{ color: colors.primary }} />;
  }
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: colors.textPrimary, mb: 1 }}>
            Notifications
          </Typography>
          <Typography variant="body1" color={colors.textSecondary}>
            Stay updated with your appointment activity.
          </Typography>
        </Box>
        {unreadCount > 0 && (
          <Button
            variant="outlined"
            startIcon={<DoneAllIcon />}
            onClick={markAllAsRead}
            sx={{
              borderColor: colors.primary,
              color: colors.primary,
              borderRadius: radius.card,
              '&:hover': { borderColor: colors.primary, bgcolor: alpha(colors.primary, 0.05) },
            }}
          >
            Mark all as read
          </Button>
        )}
      </Box>

      <Paper
        sx={{
          borderRadius: radius.card,
          bgcolor: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
          overflow: 'hidden',
        }}
      >
        <List>
          {notifications.map((notif, index) => (
            <React.Fragment key={notif.id}>
              <ListItem
                sx={{
                  bgcolor: notif.read ? 'transparent' : alpha(colors.primary, 0.05),
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: alpha(colors.primary, 0.02),
                    borderLeft: `4px solid ${colors.primary}`,
                  },
                  cursor: 'pointer',
                }}
                onClick={() => markAsRead(notif.id)}
              >
                <ListItemIcon>{getIcon(notif.type)}</ListItemIcon>
                <ListItemText
                  primary={notif.message}
                  secondary={notif.timestamp}
                  primaryTypographyProps={{
                    fontWeight: notif.read ? 400 : 600,
                    color: notif.read ? colors.textSecondary : colors.textPrimary,
                  }}
                />
                {!notif.read && (
                  <IconButton size="small" onClick={(e) => { e.stopPropagation(); markAsRead(notif.id); }}>
                    <MarkUnreadIcon fontSize="small" />
                  </IconButton>
                )}
              </ListItem>
              {index < notifications.length - 1 && <Divider sx={{ borderColor: colors.border }} />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Notifications;