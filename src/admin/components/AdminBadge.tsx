import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';

type AttendanceVariant = 'present' | 'absent' | 'half-day' | 'leave' | 'off';
type PaymentVariant = 'cash' | 'pending' | 'cheque' | 'cheque-cleared' | 'cheque-bounced';
type WorkerStateVariant = 'online' | 'offline' | 'late';

type BadgeVariant = AttendanceVariant | PaymentVariant | WorkerStateVariant;

interface AdminBadgeProps {
  label: string;
  variant: BadgeVariant;
  size?: 'sm' | 'md';
  icon?: string;
}

export default function AdminBadge({ 
  label, 
  variant, 
  size = 'md', 
  icon 
}: AdminBadgeProps) {
  const getBadgeStyle = () => {
    const baseStyle = {
      backgroundColor: theme.colors.gray200,
      textColor: theme.colors.textSecondary,
      borderColor: theme.colors.gray300,
    };

    switch (variant) {
      // Attendance variants
      case 'present':
        return {
          backgroundColor: theme.colors.success,
          textColor: theme.colors.white,
          borderColor: theme.colors.success,
        };
      case 'absent':
        return {
          backgroundColor: theme.colors.error,
          textColor: theme.colors.white,
          borderColor: theme.colors.error,
        };
      case 'half-day':
        return {
          backgroundColor: theme.colors.warning,
          textColor: theme.colors.white,
          borderColor: theme.colors.warning,
        };
      case 'leave':
        return {
          backgroundColor: theme.colors.info,
          textColor: theme.colors.white,
          borderColor: theme.colors.info,
        };
      case 'off':
        return {
          backgroundColor: theme.colors.gray400,
          textColor: theme.colors.white,
          borderColor: theme.colors.gray400,
        };

      // Payment variants
      case 'cash':
        return {
          backgroundColor: theme.colors.success,
          textColor: theme.colors.white,
          borderColor: theme.colors.success,
        };
      case 'pending':
        return {
          backgroundColor: theme.colors.warning,
          textColor: theme.colors.white,
          borderColor: theme.colors.warning,
        };
      case 'cheque':
        return {
          backgroundColor: theme.colors.info,
          textColor: theme.colors.white,
          borderColor: theme.colors.info,
        };
      case 'cheque-cleared':
        return {
          backgroundColor: theme.colors.white,
          textColor: theme.colors.success,
          borderColor: theme.colors.success,
        };
      case 'cheque-bounced':
        return {
          backgroundColor: theme.colors.white,
          textColor: theme.colors.error,
          borderColor: theme.colors.error,
        };

      // Worker state variants
      case 'online':
        return {
          backgroundColor: theme.colors.success,
          textColor: theme.colors.white,
          borderColor: theme.colors.success,
        };
      case 'offline':
        return {
          backgroundColor: theme.colors.gray400,
          textColor: theme.colors.white,
          borderColor: theme.colors.gray400,
        };
      case 'late':
        return {
          backgroundColor: theme.colors.error,
          textColor: theme.colors.white,
          borderColor: theme.colors.error,
        };

      default:
        return baseStyle;
    }
  };

  const badgeStyle = getBadgeStyle();
  const sizeStyles = size === 'sm' ? styles.sm : styles.md;

  return (
    <View style={[
      styles.badge,
      sizeStyles,
      {
        backgroundColor: badgeStyle.backgroundColor,
        borderColor: badgeStyle.borderColor,
      }
    ]}>
      {icon && (
        <Text style={[styles.icon, { color: badgeStyle.textColor }]}>
          {icon}
        </Text>
      )}
      <Text style={[
        styles.text,
        sizeStyles.text,
        { color: badgeStyle.textColor }
      ]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: theme.typography.fontSize.xs,
    marginRight: theme.spacing.xs,
  },
  text: {
    fontWeight: '600' as const,
  },
  sm: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    text: {
      fontSize: theme.typography.fontSize.xs,
    },
  },
  md: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    text: {
      fontSize: theme.typography.fontSize.sm,
    },
  },
});
