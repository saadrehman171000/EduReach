import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { theme } from '../theme';
// Example usage of reusable components:
// import { EmptyState, ErrorState, LoadingSkeleton } from '../components';

export default function GpsLogsScreen() {
  const [selectedFilter, setSelectedFilter] = useState('Today');

  // Mock GPS logs data
  const gpsLogs = [
    { id: 1, time: '10:15', location: 'Central School, Downtown', distance: '+1.2 km since last' },
    { id: 2, time: '10:00', location: 'Main Street, City Center', distance: '+0.8 km since last' },
    { id: 3, time: '09:45', location: 'Green Valley School', distance: '+2.1 km since last' },
    { id: 4, time: '09:30', location: 'Downtown Primary School', distance: '+1.5 km since last' },
    { id: 5, time: '09:15', location: 'Sunshine Elementary', distance: '+0.9 km since last' },
    { id: 6, time: '09:00', location: 'Office Building, Main St', distance: 'Starting point' },
  ];

  const filters = ['Today', 'Yesterday', 'This Week'];

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📍</Text>
      <Text style={styles.emptyStateTitle}>No Location Logs</Text>
      <Text style={styles.emptyStateText}>
        Location data will appear here when captured during duty hours.
      </Text>
    </View>
  );

  const MapPlaceholder = () => (
    <View style={styles.mapPlaceholder}>
      <Text style={styles.mapPlaceholderIcon}>🗺️</Text>
      <Text style={styles.mapPlaceholderText}>Map Preview</Text>
      <Text style={styles.mapPlaceholderCaption}>
        Admin sees full map on dashboard.
      </Text>
    </View>
  );

  const renderLogItem = ({ item }: { item: any }) => (
    <View style={styles.logItem}>
      <View style={styles.logTimeContainer}>
        <Text style={styles.logTime}>{item.time}</Text>
        <View style={styles.logStatusDot} />
      </View>
      <View style={styles.logContent}>
        <Text style={styles.logLocation}>{item.location}</Text>
        <Text style={styles.logDistance}>{item.distance}</Text>
      </View>
    </View>
  );

  const renderHourSection = (hour: string, logs: any[]) => (
    <View key={hour} style={styles.hourSection}>
      <Text style={styles.hourSectionTitle}>{hour}</Text>
      {logs.map((log) => (
        <View key={log.id}>
          {renderLogItem({ item: log })}
        </View>
      ))}
    </View>
  );

  // Group logs by hour for timeline view
  const groupedLogs = gpsLogs.reduce((acc, log) => {
    const hour = log.time.split(':')[0] + ':00';
    if (!acc[hour]) {
      acc[hour] = [];
    }
    acc[hour].push(log);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Location Logs</Text>
          <Text style={styles.subtitle}>Automatically captured ~every 15 minutes during duty.</Text>
        </View>

        {/* Last Seen Card */}
        <View style={styles.lastSeenCard}>
          <View style={styles.lastSeenContent}>
            <Text style={styles.lastSeenMain}>2:05 PM — Central School, Downtown</Text>
            <Text style={styles.lastSeenTime}>15 mins ago</Text>
          </View>
          <MapPlaceholder />
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <View style={styles.filtersTabs}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  selectedFilter === filter && styles.filterTabActive,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    selectedFilter === filter && styles.filterTabTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.calendarButton}>
            <Text style={styles.calendarButtonIcon}>📅</Text>
          </TouchableOpacity>
        </View>

        {/* Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.timelineTitle}>Today's Logs</Text>
          {Object.keys(groupedLogs).length > 0 ? (
            <View style={styles.timelineContainer}>
              {Object.entries(groupedLogs)
                .sort(([a], [b]) => b.localeCompare(a)) // Sort hours descending
                .map(([hour, logs]) => renderHourSection(hour, logs))}
            </View>
          ) : (
            // Example usage of EmptyState component:
            // <EmptyState
            //   icon="📍"
            //   title="No Location Logs"
            //   subtitle="Location data will appear here when captured during duty hours."
            // />
            <EmptyState />
          )}
        </View>

        {/* Map Preview Card */}
        <View style={styles.mapPreviewCard}>
          <Text style={styles.mapPreviewTitle}>Route Overview</Text>
          <MapPlaceholder />
        </View>

        {/* Info Note */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Locations are captured automatically. Only Admin can view full history on the dashboard.
          </Text>
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

  // Last Seen Card
  lastSeenCard: {
    backgroundColor: theme.colors.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  lastSeenContent: {
    marginBottom: theme.spacing.md,
  },
  lastSeenMain: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  lastSeenTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Map Placeholder
  mapPlaceholder: {
    height: 120,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderIcon: {
    fontSize: theme.typography.fontSize['2xl'],
    marginBottom: theme.spacing.sm,
  },
  mapPlaceholderText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  mapPlaceholderCaption: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },

  // Filters
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  filtersTabs: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
    flex: 1,
  },
  filterTab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: theme.colors.primary,
  },
  filterTabText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  filterTabTextActive: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  calendarButton: {
    marginLeft: theme.spacing.md,
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarButtonIcon: {
    fontSize: theme.typography.fontSize.lg,
  },

  // Timeline
  timelineSection: {
    paddingHorizontal: theme.spacing.lg,
  },
  timelineTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  timelineContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  hourSection: {
    marginBottom: theme.spacing.lg,
  },
  hourSectionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  logTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
  },
  logTime: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
  },
  logStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.success,
  },
  logContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  logLocation: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  logDistance: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: theme.spacing['2xl'],
  },
  emptyStateIcon: {
    fontSize: theme.typography.fontSize['3xl'],
    marginBottom: theme.spacing.md,
  },
  emptyStateTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emptyStateText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.sm,
  },

  // Map Preview
  mapPreviewCard: {
    backgroundColor: theme.colors.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  mapPreviewTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },

  // Info Card
  infoCard: {
    backgroundColor: theme.colors.gray100,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: theme.typography.lineHeight.sm,
  },
});
