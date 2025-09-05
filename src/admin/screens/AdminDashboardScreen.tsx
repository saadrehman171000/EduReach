import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

const { width } = Dimensions.get('window');

export default function AdminDashboardScreen() {
  const navigation = useNavigation();

  // Mock KPI data
  const kpiData = [
    { title: 'Workers Online', value: '12', icon: '👥', color: theme.colors.success },
    { title: 'Present Today', value: '18', icon: '✅', color: theme.colors.success },
    { title: 'Absent Today', value: '3', icon: '❌', color: theme.colors.error },
    { title: 'Active Visits', value: '8', icon: '📍', color: theme.colors.info },
    { title: 'Pending Orders', value: '5', icon: '📋', color: theme.colors.warning },
    { title: 'Total Distance', value: '156.2 km', icon: '🚗', color: theme.colors.accent },
  ];

  // Mock recent activity data
  const recentActivity = [
    { id: 1, time: '9:05 AM', description: 'Ali checked in at Central School', type: 'checkin' },
    { id: 2, time: '8:45 AM', description: 'Order placed by XYZ School', type: 'order' },
    { id: 3, time: '8:30 AM', description: 'Sarah completed visit at Downtown Primary', type: 'visit' },
    { id: 4, time: '8:15 AM', description: 'Ahmed marked absent', type: 'attendance' },
  ];

  const quickLinks = [
    { title: 'Workers List', icon: '👥', screen: 'WorkersList', color: theme.colors.primary },
    { title: 'Live Map', icon: '🗺️', screen: 'Map', color: theme.colors.info },
    { title: 'Reports', icon: '📊', screen: 'Reports', color: theme.colors.accent },
    { title: 'Settings', icon: '⚙️', screen: 'Settings', color: theme.colors.textSecondary },
  ];

  const KpiCard = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => (
    <View style={styles.kpiCard}>
      <View style={styles.kpiHeader}>
        <Text style={styles.kpiIcon}>{icon}</Text>
        <Text style={styles.kpiValue}>{value}</Text>
      </View>
      <Text style={styles.kpiTitle}>{title}</Text>
    </View>
  );

  const QuickLinkCard = ({ title, icon, screen, color }: { title: string; icon: string; screen: string; color: string }) => (
    <TouchableOpacity 
      style={styles.quickLinkCard}
      onPress={() => (navigation as any).navigate(screen)}
    >
      <View style={[styles.quickLinkIcon, { backgroundColor: color }]}>
        <Text style={styles.quickLinkIconText}>{icon}</Text>
      </View>
      <Text style={styles.quickLinkTitle}>{title}</Text>
    </TouchableOpacity>
  );

  const ActivityItem = ({ time, description, type }: { time: string; description: string; type: string }) => (
    <View style={styles.activityItem}>
      <View style={styles.activityTime}>
        <Text style={styles.activityTimeText}>{time}</Text>
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityDescription}>{description}</Text>
        <View style={[styles.activityBadge, { backgroundColor: getActivityColor(type) }]}>
          <Text style={styles.activityBadgeText}>{getActivityType(type)}</Text>
        </View>
      </View>
    </View>
  );

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'checkin': return theme.colors.success;
      case 'order': return theme.colors.info;
      case 'visit': return theme.colors.accent;
      case 'attendance': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  const getActivityType = (type: string) => {
    switch (type) {
      case 'checkin': return 'Check-in';
      case 'order': return 'Order';
      case 'visit': return 'Visit';
      case 'attendance': return 'Attendance';
      default: return 'Activity';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Overview of workforce activity</Text>
        </View>

        {/* KPI Cards */}
        <View style={styles.kpiSection}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.kpiGrid}>
            {kpiData.map((kpi, index) => (
              <KpiCard
                key={index}
                title={kpi.title}
                value={kpi.value}
                icon={kpi.icon}
                color={kpi.color}
              />
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksSection}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => (
              <QuickLinkCard
                key={index}
                title={link.title}
                icon={link.icon}
                screen={link.screen}
                color={link.color}
              />
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            {recentActivity.map((activity) => (
              <ActivityItem
                key={activity.id}
                time={activity.time}
                description={activity.description}
                type={activity.type}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    ...theme.shadows.sm,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },

  // KPI Section
  kpiSection: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  kpiCard: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.md) / 2,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  kpiIcon: {
    fontSize: theme.typography.fontSize.xl,
  },
  kpiValue: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
  },
  kpiTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },

  // Quick Links Section
  quickLinksSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  quickLinksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  quickLinkCard: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.md) / 2,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  quickLinkIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  quickLinkIconText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.white,
  },
  quickLinkTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },

  // Activity Section
  activitySection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  activityCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  activityTime: {
    width: 80,
    alignItems: 'center',
  },
  activityTimeText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  activityContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDescription: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  activityBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginLeft: theme.spacing.sm,
  },
  activityBadgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600' as const,
  },
});
