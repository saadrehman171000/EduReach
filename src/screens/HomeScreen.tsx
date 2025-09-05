import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation();
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const quickActions = [
    { title: 'View Attendance', icon: '📊', color: theme.colors.primary, screen: 'Attendance' },
    { title: 'View Salary', icon: '💰', color: theme.colors.accent, screen: 'Salary' },
    { title: 'Add Visit', icon: '📍', color: theme.colors.secondary, screen: 'Visits' },
    { title: 'Add Order', icon: '📋', color: theme.colors.info, screen: 'Orders' },
    { title: 'Odometer', icon: '🚗', color: theme.colors.warning, screen: 'Odometer' },
    { title: 'GPS Logs', icon: '🗺️', color: theme.colors.success, screen: 'GpsLogs' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.userName}>John Doe</Text>
              <Text style={styles.date}>{today}</Text>
            </View>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile' as any)}
            >
              <Text style={styles.profileButtonText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Duty Status Card */}
        <View style={styles.dutyStatusCard}>
          <View style={styles.dutyStatusContent}>
            <Text style={styles.dutyStatusIcon}>🟢</Text>
            <View style={styles.dutyStatusText}>
              <Text style={styles.dutyStatusTitle}>Your duty is started</Text>
              <Text style={styles.dutyStatusSubtitle}>Attendance and duty are managed by Admin.</Text>
            </View>
          </View>
        </View>

        {/* Status Cards */}
        <View style={styles.cardsSection}>
          {/* Today's Status Card */}
          <View style={styles.statusCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Today's Status</Text>
              <View style={[styles.statusBadge, { backgroundColor: theme.colors.success }]}>
                <Text style={styles.statusText}>Present</Text>
              </View>
            </View>
            <Text style={styles.cardSubtitle}>Marked by Admin</Text>
          </View>

          {/* Last Location Card */}
          <View style={styles.locationCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Last Location</Text>
              <Text style={styles.locationTime}>2 hours ago</Text>
            </View>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapIcon}>🗺️</Text>
              <Text style={styles.mapText}>Central School, Downtown</Text>
            </View>
          </View>

          {/* Today's Distance Card */}
          <View style={styles.distanceCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Today's Distance</Text>
              <Text style={styles.distanceIcon}>🚶‍♂️</Text>
            </View>
            <Text style={styles.distanceValue}>12.5 km</Text>
            <Text style={styles.distanceSubtitle}>Total distance covered</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.quickActionCard}
                onPress={() => navigation.navigate(action.screen as any)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.quickActionIconText}>{action.icon}</Text>
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
              </TouchableOpacity>
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

  // Header Styles
  header: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    ...theme.shadows.sm,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  userName: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  date: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  profileButtonText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.white,
  },

  // Duty Status Card
  dutyStatusCard: {
    backgroundColor: theme.colors.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
  },
  dutyStatusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dutyStatusIcon: {
    fontSize: theme.typography.fontSize['2xl'],
    marginRight: theme.spacing.md,
  },
  dutyStatusText: {
    flex: 1,
  },
  dutyStatusTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  dutyStatusSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Cards Section
  cardsSection: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  statusCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  locationCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  distanceCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  cardSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  statusText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
  },
  locationTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  mapPlaceholder: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  mapIcon: {
    fontSize: theme.typography.fontSize['3xl'],
    marginBottom: theme.spacing.sm,
  },
  mapText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    fontWeight: '500' as const,
  },
  distanceIcon: {
    fontSize: theme.typography.fontSize.xl,
  },
  distanceValue: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: '700' as const,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  distanceSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Quick Actions
  section: {
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  quickActionCard: {
    width: '47%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  quickActionIconText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.white,
  },
  quickActionTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
});
