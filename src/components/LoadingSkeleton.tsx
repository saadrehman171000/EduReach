import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { theme } from '../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

const SkeletonBox = ({ width = '100%', height = 20, borderRadius = theme.borderRadius.sm, style }: SkeletonProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

export const SkeletonText = ({ width = '100%', height = 16 }: { width?: number | string; height?: number }) => (
  <SkeletonBox width={width} height={height} borderRadius={theme.borderRadius.xs} />
);

export const SkeletonTitle = ({ width = '80%' }: { width?: number | string }) => (
  <SkeletonBox width={width} height={20} borderRadius={theme.borderRadius.sm} />
);

export const SkeletonAvatar = ({ size = 40 }: { size?: number }) => (
  <SkeletonBox width={size} height={size} borderRadius={size / 2} />
);

export const SkeletonCard = () => (
  <View style={styles.skeletonCard}>
    <View style={styles.skeletonCardHeader}>
      <SkeletonAvatar size={50} />
      <View style={styles.skeletonCardContent}>
        <SkeletonTitle width="70%" />
        <SkeletonText width="50%" height={14} />
      </View>
    </View>
    <View style={styles.skeletonCardBody}>
      <SkeletonText width="100%" height={16} />
      <SkeletonText width="85%" height={16} />
      <SkeletonText width="60%" height={16} />
    </View>
  </View>
);

export const SkeletonCalendar = () => (
  <View style={styles.skeletonCalendar}>
    <View style={styles.skeletonCalendarHeader}>
      {Array.from({ length: 7 }).map((_, index) => (
        <SkeletonText key={index} width="100%" height={14} />
      ))}
    </View>
    <View style={styles.skeletonCalendarGrid}>
      {Array.from({ length: 35 }).map((_, index) => (
        <View key={index} style={styles.skeletonCalendarCell}>
          <SkeletonText width="100%" height={12} />
          <SkeletonBox width="100%" height={8} borderRadius={theme.borderRadius.xs} />
        </View>
      ))}
    </View>
  </View>
);

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <View style={styles.skeletonList}>
    {Array.from({ length: count }).map((_, index) => (
      <View key={index} style={styles.skeletonListItem}>
        <SkeletonAvatar size={40} />
        <View style={styles.skeletonListItemContent}>
          <SkeletonTitle width="60%" />
          <SkeletonText width="40%" height={14} />
        </View>
        <SkeletonBox width={20} height={20} borderRadius={theme.borderRadius.sm} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.gray200,
  },
  skeletonCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  skeletonCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  skeletonCardContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  skeletonCardBody: {
    gap: theme.spacing.sm,
  },
  skeletonCalendar: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  skeletonCalendarHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  skeletonCalendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skeletonCalendarCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  skeletonList: {
    gap: theme.spacing.md,
  },
  skeletonListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  skeletonListItemContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
    gap: theme.spacing.sm,
  },
});

export default {
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonCalendar,
  SkeletonList,
};
