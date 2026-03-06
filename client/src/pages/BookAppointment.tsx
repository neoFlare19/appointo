import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
  TextField,
  Chip,
  alpha,
  SxProps,
  Theme,
  IconButton,
  useMediaQuery,
  useTheme,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Person as PersonIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Event as EventIcon,
  Schedule as ScheduleIcon,
  Dashboard as DashboardIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
        background: `radial-gradient(circle, ${alpha('#2F6BFF', 0.08)} 0%, transparent 70%)`,
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

// ========== HOVER GLOW WRAPPER ==========
interface HoverGlowProps {
  children: React.ReactNode;
  color?: string;
  borderRadius?: number | string;
  lift?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

const HoverGlow: React.FC<HoverGlowProps> = ({
  children,
  color = '#2F6BFF',
  borderRadius = 0,
  lift = true,
  className = '',
  sx = {},
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    wrapperRef.current.style.setProperty('--mouse-x', `${x}%`);
    wrapperRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <Box
      ref={wrapperRef}
      className={`hover-glow-wrapper ${className}`}
      sx={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        height: '100%',
        borderRadius: borderRadius,
        overflow: 'hidden',
        transition: lift ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
        '&:hover': {
          transform: lift ? 'translateY(-4px) scale(1.02)' : 'none',
          boxShadow: lift ? `0 20px 30px ${alpha(color, 0.2)}` : 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(
            circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            ${alpha(color, 0.25)} 0%,
            transparent 70%
          )`,
          opacity: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 1,
        },
        '&:hover::after': {
          opacity: 1,
        },
        ...(sx as any),
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={(e) => {
        e.currentTarget.style.removeProperty('--mouse-x');
        e.currentTarget.style.removeProperty('--mouse-y');
      }}
    >
      {children}
    </Box>
  );
};

// ========== COLOR PALETTE ==========
const colors = {
  primary: '#2F6BFF',
  primaryDark: '#1E4FD9',
  primaryLight: '#5EA8FF',
  accent: '#5EA8FF',
  accentLight: '#A3D0FF',
  success: '#10B981',
  error: '#DC2626',
  background: '#F9FBFF',
  backgroundAlt: '#F1F5F9',
  backgroundLight: '#F9FBFF',
  backgroundDeep: '#F0F7FF',
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textLight: '#94A3B8',
  border: '#E6F0FF',
  borderDark: '#CBD5E1',
  cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
  cardShadowHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
};

const radius = {
  card: 8,
  button: 12,
  pill: 40,
};

// ========== STEP ICONS ==========
const stepIcons: { [key: number]: React.ReactNode } = {
  0: <PersonIcon />,
  1: <BusinessIcon />,
  2: <CalendarIcon />,
  3: <AccessTimeIcon />,
  4: <EditIcon />,
  5: <CheckCircleIcon />,
};

// ========== MOCK DATA ==========
const mockServices = [
  {
    id: 1,
    name: 'General Consultation',
    icon: <PersonIcon />,
    duration: '30 min',
    rating: 4.8,
    description: 'Standard consultation with a professional',
    price: '$120',
    category: 'individual',
  },
  {
    id: 2,
    name: 'Specialist Consultation',
    icon: <PersonIcon />,
    duration: '45 min',
    rating: 4.9,
    description: 'In-depth consultation with a specialist',
    price: '$180',
    category: 'individual',
  },
  {
    id: 3,
    name: 'Corporate Training',
    icon: <BusinessIcon />,
    duration: '60 min',
    rating: 4.7,
    description: 'Team training session for organizations',
    price: '$350',
    category: 'institution',
  },
  {
    id: 4,
    name: 'Health Checkup Package',
    icon: <BusinessIcon />,
    duration: '90 min',
    rating: 4.9,
    description: 'Comprehensive health screening',
    price: '$250',
    category: 'institution',
  },
];

const timeSlotData = [
  { time: '09:00 AM', status: 'Available' },
  { time: '09:30 AM', status: 'Available' },
  { time: '10:00 AM', status: 'Limited' },
  { time: '10:30 AM', status: 'Available' },
  { time: '11:00 AM', status: 'Booked' },
  { time: '11:30 AM', status: 'Available' },
  { time: '12:00 PM', status: 'Available' },
  { time: '12:30 PM', status: 'Limited' },
  { time: '01:00 PM', status: 'Booked' },
  { time: '01:30 PM', status: 'Available' },
];

// ========== CUSTOM STEP ICON ==========
const CustomStepIcon: React.FC<StepIconProps> = (props) => {
  const { active, completed, icon } = props;
  const stepIndex = typeof icon === 'number' ? icon - 1 : 0;

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: active
          ? colors.primary
          : completed
          ? alpha(colors.primary, 0.2)
          : alpha(colors.border, 0.5),
        color: active ? '#fff' : completed ? colors.primary : colors.textSecondary,
        boxShadow: active ? `0 0 20px ${alpha(colors.primary, 0.5)}` : 'none',
        transition: 'all 0.3s ease',
        '& svg': {
          fontSize: 20,
        },
      }}
    >
      {completed ? <CheckCircleIcon /> : stepIcons[stepIndex] || stepIcons[0]}
    </Box>
  );
};

// ========== STEP 1: SELECT MODE ==========
interface ModeCardProps {
  type: 'individual' | 'institution';
  selected: boolean;
  onClick: () => void;
}

const ModeCard: React.FC<ModeCardProps> = ({ type, selected, onClick }) => {
  const isIndividual = type === 'individual';
  const title = isIndividual ? 'Individual Professional' : 'Institution';
  const description = isIndividual
    ? 'Book directly with a professional such as a doctor, lawyer, tutor, or consultant.'
    : 'Book services offered by organizations such as hospitals, universities, or offices.';
  const Icon = isIndividual ? PersonIcon : BusinessIcon;

  return (
    <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
      <Card
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          borderRadius: radius.card,
          bgcolor: selected
            ? alpha(colors.primary, 0.1)
            : 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          border: selected ? `2px solid ${colors.primary}` : '1px solid rgba(255,255,255,0.5)',
          boxShadow: selected ? `0 20px 30px ${alpha(colors.primary, 0.2)}` : colors.cardShadow,
          transition: 'all 0.3s ease',
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          '&:hover': {
            bgcolor: selected ? alpha(colors.primary, 0.15) : 'rgba(255,255,255,0.8)',
          },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: alpha(colors.primary, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Icon sx={{ fontSize: 40, color: colors.primary }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color={colors.textSecondary}>
          {description}
        </Typography>
      </Card>
    </HoverGlow>
  );
};

// ========== STEP 2: SELECT SERVICE ==========
interface ServiceCardProps {
  service: typeof mockServices[0];
  selected: boolean;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, selected, onClick }) => {
  return (
    <HoverGlow borderRadius={radius.card} color={colors.primary} lift>
      <Card
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          borderRadius: radius.card,
          bgcolor: selected
            ? alpha(colors.primary, 0.1)
            : 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          border: selected ? `2px solid ${colors.primary}` : '1px solid rgba(255,255,255,0.5)',
          boxShadow: selected ? `0 20px 30px ${alpha(colors.primary, 0.2)}` : colors.cardShadow,
          transition: 'all 0.3s ease',
          p: 3,
          height: '100%',
          '&:hover': {
            bgcolor: selected ? alpha(colors.primary, 0.15) : 'rgba(255,255,255,0.8)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: alpha(colors.primary, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {service.icon}
          </Box>
          {service.price && (
            <Chip
              label={service.price}
              size="small"
              sx={{
                bgcolor: alpha(colors.primary, 0.1),
                color: colors.primary,
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 1 }}>
          {service.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Rating value={service.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color={colors.textSecondary}>
            {service.rating}
          </Typography>
        </Box>
        <Typography variant="body2" color={colors.textSecondary} sx={{ mb: 2 }}>
          {service.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon sx={{ fontSize: 16, color: colors.primary }} />
          <Typography variant="body2" color={colors.textPrimary}>
            {service.duration}
          </Typography>
        </Box>
      </Card>
    </HoverGlow>
  );
};

// ========== STEP 3: SELECT DATE ==========
interface CalendarProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    date.setHours(0, 0, 0, 0);
    return date < today || (date.getDay() === 0 || date.getDay() === 6);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth.getMonth() &&
      selectedDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  const isToday = (day: number) => {
    const todayDate = new Date();
    return (
      todayDate.getDate() === day &&
      todayDate.getMonth() === currentMonth.getMonth() &&
      todayDate.getFullYear() === currentMonth.getFullYear()
    );
  };

  return (
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary }}>
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      <Grid container spacing={1}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Typography variant="body2" align="center" color={colors.textSecondary}>
              {day}
            </Typography>
          </Grid>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <Grid item xs={12 / 7} key={`empty-${i}`}>
            <Box sx={{ height: 40 }} />
          </Grid>
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDateDisabled(day);
          const selected = isSelected(day);
          const todayHighlight = isToday(day);

          return (
            <Grid item xs={12 / 7} key={day}>
              <Box
                onClick={() => !disabled && onSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                sx={{
                  width: 40,
                  height: 40,
                  mx: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  bgcolor: selected ? colors.primary : 'transparent',
                  color: selected ? '#fff' : disabled ? colors.textLight : colors.textPrimary,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  border: todayHighlight && !selected ? `2px solid ${colors.primary}` : 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: disabled ? 'transparent' : alpha(colors.primary, 0.1),
                    transform: disabled ? 'none' : 'scale(1.1)',
                  },
                }}
              >
                {day}
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color={colors.textSecondary}>
          Available booking window: 9:00 AM – 5:00 PM
        </Typography>
      </Box>
    </Paper>
  );
};

// ========== STEP 4: SELECT TIME SLOT ==========
interface TimeSlotProps {
  time: string;
  status: string;
  selected: boolean;
  onClick: () => void;
}

const TimeSlotButton: React.FC<TimeSlotProps> = ({ time, status, selected, onClick }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Available':
        return colors.success;
      case 'Limited':
        return '#F59E0B'; // orange
      case 'Booked':
        return colors.error;
      default:
        return colors.textLight;
    }
  };

  const isDisabled = status === 'Booked';

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      sx={{
        borderRadius: radius.pill,
        py: 1.5,
        px: 2,
        bgcolor: selected ? colors.primary : 'rgba(255,255,255,0.8)',
        color: selected ? '#fff' : colors.textPrimary,
        border: selected ? 'none' : `1px solid ${colors.border}`,
        boxShadow: selected ? `0 8px 16px ${alpha(colors.primary, 0.3)}` : 'none',
        '&:hover': {
          bgcolor: selected ? colors.primaryDark : alpha(colors.primary, 0.05),
          transform: 'scale(1.02)',
        },
        '&.Mui-disabled': {
          bgcolor: alpha(colors.textLight, 0.1),
          color: colors.textLight,
        },
        width: '100%',
        justifyContent: 'flex-start',
        transition: 'all 0.2s ease',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScheduleIcon sx={{ fontSize: 18 }} />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {time}
          </Typography>
        </Box>
        <Chip
          label={status}
          size="small"
          sx={{
            bgcolor: alpha(getStatusColor(), 0.1),
            color: getStatusColor(),
            fontWeight: 600,
            fontSize: '0.7rem',
          }}
        />
      </Box>
    </Button>
  );
};

// ========== STEP 5: ENTER DETAILS ==========
interface DetailsFormProps {
  details: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  onChange: (field: string, value: string) => void;
  summary: {
    service?: typeof mockServices[0];
    date?: Date | null;
    time?: string;
  };
}

const DetailsForm: React.FC<DetailsFormProps> = ({ details, onChange, summary }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
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
          <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 3 }}>
            Your Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                value={details.name}
                onChange={(e) => onChange('name', e.target.value)}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: radius.button,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.border,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary,
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={details.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: <PhoneIcon sx={{ color: colors.textLight, mr: 1, fontSize: 20 }} />,
                  sx: {
                    borderRadius: radius.button,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.border,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                value={details.email}
                onChange={(e) => onChange('email', e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: <EmailIcon sx={{ color: colors.textLight, mr: 1, fontSize: 20 }} />,
                  sx: {
                    borderRadius: radius.button,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.border,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Optional notes / reason for appointment"
                value={details.notes}
                onChange={(e) => onChange('notes', e.target.value)}
                multiline
                rows={4}
                variant="outlined"
                InputProps={{
                  sx: {
                    borderRadius: radius.button,
                    bgcolor: 'rgba(255,255,255,0.8)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.border,
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
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
            Appointment Summary
          </Typography>
          <List>
            {summary.service && (
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <EventIcon sx={{ color: colors.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary="Service"
                  secondary={summary.service.name}
                  primaryTypographyProps={{ color: colors.textSecondary, variant: 'body2' }}
                  secondaryTypographyProps={{ color: colors.textPrimary, variant: 'body1', fontWeight: 500 }}
                />
              </ListItem>
            )}
            {summary.date && (
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CalendarIcon sx={{ color: colors.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary="Date"
                  secondary={summary.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  primaryTypographyProps={{ color: colors.textSecondary, variant: 'body2' }}
                  secondaryTypographyProps={{ color: colors.textPrimary, variant: 'body1', fontWeight: 500 }}
                />
              </ListItem>
            )}
            {summary.time && (
              <ListItem sx={{ px: 0, py: 1 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AccessTimeIcon sx={{ color: colors.primary }} />
                </ListItemIcon>
                <ListItemText
                  primary="Time"
                  secondary={summary.time}
                  primaryTypographyProps={{ color: colors.textSecondary, variant: 'body2' }}
                  secondaryTypographyProps={{ color: colors.textPrimary, variant: 'body1', fontWeight: 500 }}
                />
              </ListItem>
            )}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color={colors.textSecondary}>
            You'll receive a confirmation email with all details.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

// ========== STEP 6: CONFIRMATION ==========
interface ConfirmationProps {
  details: {
    name: string;
    phone: string;
    email: string;
    notes: string;
  };
  summary: {
    mode?: 'individual' | 'institution';
    service?: typeof mockServices[0];
    date?: Date | null;
    time?: string;
  };
  onAddToCalendar: () => void;
  onReturnDashboard: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ details, summary, onAddToCalendar, onReturnDashboard }) => {
  const bookingId = `APT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: alpha(colors.success, 0.2),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
          animation: 'bounceIn 0.6s ease',
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 48, color: colors.success, filter: `drop-shadow(0 0 20px ${alpha(colors.success, 0.5)})` }} />
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, color: colors.textPrimary, mb: 2 }}>
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" color={colors.textSecondary} sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
        Your appointment has been successfully scheduled. A confirmation email has been sent to {details.email}.
      </Typography>

      <Paper
        sx={{
          p: 4,
          borderRadius: radius.card,
          bgcolor: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: `0 20px 30px ${alpha(colors.primary, 0.1)}`,
          mb: 4,
          maxWidth: 500,
          mx: 'auto',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 3 }}>
          Appointment Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.textSecondary}>
              Booking ID
            </Typography>
            <Typography variant="body1" color={colors.textPrimary} sx={{ fontWeight: 600 }}>
              {bookingId}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.textSecondary}>
              Name
            </Typography>
            <Typography variant="body1" color={colors.textPrimary}>
              {details.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.textSecondary}>
              Service
            </Typography>
            <Typography variant="body1" color={colors.textPrimary}>
              {summary.service?.name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.textSecondary}>
              Professional/Institution
            </Typography>
            <Typography variant="body1" color={colors.textPrimary}>
              {summary.mode === 'individual' ? 'Individual' : 'Institution'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.textSecondary}>
              Date
            </Typography>
            <Typography variant="body1" color={colors.textPrimary}>
              {summary.date?.toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color={colors.textSecondary}>
              Time
            </Typography>
            <Typography variant="body1" color={colors.textPrimary}>
              {summary.time}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<EventIcon />}
          onClick={onAddToCalendar}
          sx={{
            bgcolor: colors.primary,
            borderRadius: radius.button,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            boxShadow: `0 8px 20px ${alpha(colors.primary, 0.3)}`,
            '&:hover': {
              bgcolor: colors.primaryDark,
              transform: 'translateY(-2px)',
              boxShadow: `0 12px 28px ${alpha(colors.primary, 0.4)}`,
            },
          }}
        >
          Add to Calendar
        </Button>
        <Button
          variant="outlined"
          startIcon={<DashboardIcon />}
          onClick={onReturnDashboard}
          sx={{
            borderColor: colors.primary,
            color: colors.primary,
            borderRadius: radius.button,
            px: 4,
            py: 1.5,
            fontWeight: 600,
            '&:hover': {
              borderColor: colors.primaryDark,
              bgcolor: alpha(colors.primary, 0.05),
            },
          }}
        >
          Return to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

// ========== MAIN BOOK APPOINTMENT PAGE ==========
const BookAppointment: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // State
  const [activeStep, setActiveStep] = useState(0);
  const [mode, setMode] = useState<'individual' | 'institution' | null>(null);
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [details, setDetails] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const timeSlotStatus = timeSlotData;

  // Texture animation ref
  const textureRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let x = 0,
      y = 0,
      frame: number;
    const animate = () => {
      x += 0.05;
      y += 0.03;
      if (textureRef.current) textureRef.current.style.backgroundPosition = `${x}px ${y}px`;
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  const steps = ['Select Mode', 'Choose Service', 'Select Date', 'Pick Time', 'Enter Details', 'Confirmation'];

  const handleNext = () => {
    if (activeStep === 0 && !mode) return;
    if (activeStep === 1 && !selectedService) return;
    if (activeStep === 2 && !selectedDate) return;
    if (activeStep === 3 && !selectedTime) return;
    if (activeStep === 4 && (!details.name || !details.phone || !details.email)) return;

    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleModeSelect = (selected: 'individual' | 'institution') => {
    setMode(selected);
  };

  const handleServiceSelect = (service: typeof mockServices[0]) => {
    setSelectedService(service);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleDetailsChange = (field: string, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddToCalendar = () => {
    alert('Appointment added to calendar (demo)');
  };

  const handleReturnDashboard = () => {
    navigate('/dashboard');
  };

  const isNextDisabled = () => {
    if (activeStep === 0 && !mode) return true;
    if (activeStep === 1 && !selectedService) return true;
    if (activeStep === 2 && !selectedDate) return true;
    if (activeStep === 3 && !selectedTime) return true;
    if (activeStep === 4 && (!details.name || !details.phone || !details.email)) return true;
    return false;
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', bgcolor: colors.background }}>
      <CursorGlow />

      {/* Background layers */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: -10 }}>
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: colors.background }} />
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

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: colors.textPrimary, mb: 1 }}>
            Book an Appointment
          </Typography>
          <Typography variant="body1" color={colors.textSecondary}>
            Complete the steps below to schedule your appointment.
          </Typography>
        </Box>

        {/* Progress Stepper */}
        <Paper
          sx={{
            p: 2,
            mb: 4,
            borderRadius: radius.card,
            bgcolor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: `0 8px 20px ${alpha(colors.primary, 0.08)}`,
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel={!isMobile}
            orientation={isMobile ? 'vertical' : 'horizontal'}
            connector={null}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={CustomStepIcon}
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: index === activeStep ? colors.primary : colors.textSecondary,
                      fontWeight: index === activeStep ? 600 : 400,
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* Step Content */}
        <Paper
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: radius.card,
            bgcolor: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: `0 20px 30px ${alpha(colors.primary, 0.1)}`,
            transition: 'all 0.3s ease',
          }}
        >
          {/* Step 1: Select Mode */}
          {activeStep === 0 && (
            <Box sx={{ minHeight: 400 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 4 }}>
                How would you like to book?
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <ModeCard
                    type="individual"
                    selected={mode === 'individual'}
                    onClick={() => handleModeSelect('individual')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ModeCard
                    type="institution"
                    selected={mode === 'institution'}
                    onClick={() => handleModeSelect('institution')}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 2: Select Service */}
          {activeStep === 1 && (
            <Box sx={{ minHeight: 400 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 4 }}>
                Choose a Service
              </Typography>
              <Grid container spacing={3}>
                {mockServices
                  .filter((s) => (mode ? s.category === mode : true))
                  .map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                      <ServiceCard
                        service={service}
                        selected={selectedService?.id === service.id}
                        onClick={() => handleServiceSelect(service)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          )}

          {/* Step 3: Select Date */}
          {activeStep === 2 && (
            <Box sx={{ minHeight: 400 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 4 }}>
                Select a Date
              </Typography>
              <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} />
            </Box>
          )}

          {/* Step 4: Select Time */}
          {activeStep === 3 && (
            <Box sx={{ minHeight: 400 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 4 }}>
                Pick a Time Slot
              </Typography>
              <Grid container spacing={2}>
                {timeSlotStatus.map((slot) => (
                  <Grid item xs={12} sm={6} md={4} key={slot.time}>
                    <TimeSlotButton
                      time={slot.time}
                      status={slot.status}
                      selected={selectedTime === slot.time}
                      onClick={() => handleTimeSelect(slot.time)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Step 5: Enter Details */}
          {activeStep === 4 && (
            <Box sx={{ minHeight: 400 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: colors.textPrimary, mb: 4 }}>
                Your Information
              </Typography>
              <DetailsForm
                details={details}
                onChange={handleDetailsChange}
                summary={{
                  service: selectedService || undefined,
                  date: selectedDate,
                  time: selectedTime || undefined,
                }}
              />
            </Box>
          )}

          {/* Step 6: Confirmation */}
          {activeStep === 5 && (
            <Box sx={{ minHeight: 400 }}>
              <Confirmation
                details={details}
                summary={{
                  mode: mode || undefined,
                  service: selectedService || undefined,
                  date: selectedDate,
                  time: selectedTime || undefined,
                }}
                onAddToCalendar={handleAddToCalendar}
                onReturnDashboard={handleReturnDashboard}
              />
            </Box>
          )}

          {/* Navigation Buttons */}
          {activeStep < 5 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0}
                startIcon={<ArrowBackIcon />}
                sx={{
                  borderColor: colors.border,
                  color: colors.textPrimary,
                  borderRadius: radius.button,
                  px: 3,
                  py: 1,
                  '&:hover': {
                    borderColor: colors.primary,
                    bgcolor: alpha(colors.primary, 0.05),
                  },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={isNextDisabled()}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: colors.primary,
                  borderRadius: radius.button,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  boxShadow: `0 8px 20px ${alpha(colors.primary, 0.3)}`,
                  '&:hover': {
                    bgcolor: colors.primaryDark,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 28px ${alpha(colors.primary, 0.4)}`,
                  },
                }}
              >
                {activeStep === 4 ? 'Confirm Booking' : 'Continue'}
              </Button>
            </Box>
          )}
        </Paper>
      </Container>

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
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default BookAppointment;