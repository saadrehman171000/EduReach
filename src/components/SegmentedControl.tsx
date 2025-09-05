import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme';

interface SegmentedControlProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  style?: any;
  size?: 'sm' | 'md' | 'lg';
}

export default function SegmentedControl({
  options,
  selected,
  onSelect,
  style,
  size = 'md',
}: SegmentedControlProps) {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          container: styles.smContainer,
          button: styles.smButton,
          text: styles.smText,
        };
      case 'lg':
        return {
          container: styles.lgContainer,
          button: styles.lgButton,
          text: styles.lgText,
        };
      case 'md':
      default:
        return {
          container: styles.mdContainer,
          button: styles.mdButton,
          text: styles.mdText,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[styles.container, sizeStyles.container, style]}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            sizeStyles.button,
            selected === option && styles.activeButton,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={[
            styles.text,
            sizeStyles.text,
            selected === option && styles.activeText,
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.lg,
    padding: 2,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.lg,
  },
  activeButton: {
    backgroundColor: theme.colors.primary,
  },
  text: {
    fontWeight: '500' as const,
  },
  activeText: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  // Size variants
  smContainer: {
    padding: 1,
  },
  smButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },
  smText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  mdContainer: {
    padding: 2,
  },
  mdButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  mdText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  lgContainer: {
    padding: 3,
  },
  lgButton: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  lgText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
});
