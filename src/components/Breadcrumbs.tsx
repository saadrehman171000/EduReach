import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme';

interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  style?: any;
}

export default function Breadcrumbs({
  items,
  separator = '›',
  style,
}: BreadcrumbsProps) {
  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <TouchableOpacity
            style={styles.item}
            onPress={item.onPress}
            disabled={item.isActive || !item.onPress}
          >
            <Text style={[
              styles.itemText,
              item.isActive && styles.activeItemText,
              !item.onPress && styles.disabledItemText,
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
          {index < items.length - 1 && (
            <Text style={styles.separator}>{separator}</Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  item: {
    paddingVertical: theme.spacing.xs,
  },
  itemText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  activeItemText: {
    color: theme.colors.textPrimary,
    fontWeight: '600' as const,
  },
  disabledItemText: {
    color: theme.colors.textSecondary,
  },
  separator: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.sm,
    fontWeight: '600' as const,
  },
});
