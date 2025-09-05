import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
  shadow?: keyof typeof theme.shadows;
}

export default function Card({ 
  children, 
  style, 
  padding = 'lg',
  shadow = 'sm' 
}: CardProps) {
  return (
    <View style={[
      styles.card,
      {
        padding: theme.spacing[padding],
        ...theme.shadows[shadow],
      },
      style,
    ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
  },
});
