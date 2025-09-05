import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Card, EmptyState, Breadcrumbs } from '../../components';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const navigation = useNavigation();
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showPresent, setShowPresent] = useState(true);
  const [showAbsent, setShowAbsent] = useState(true);
  const [showLate, setShowLate] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('All Teams');

  // Mock worker location data
  const workersData = [
    {
      id: '1',
      name: 'Ali Ahmed',
      phone: '+92 300 1234567',
      status: 'Present',
      lastSeen: '10:15 AM',
      location: 'Central School',
      distanceToday: '12.5 km',
      position: { x: width * 0.3, y: height * 0.4 },
      initials: 'AA',
    },
    {
      id: '2',
      name: 'Sarah Khan',
      phone: '+92 301 2345678',
      status: 'Absent',
      lastSeen: 'Yesterday 5:30 PM',
      location: 'Downtown Office',
      distanceToday: '0 km',
      position: { x: width * 0.6, y: height * 0.3 },
      initials: 'SK',
    },
    {
      id: '3',
      name: 'Ahmed Hassan',
      phone: '+92 302 3456789',
      status: 'Late',
      lastSeen: '9:45 AM',
      location: 'North School',
      distanceToday: '8.2 km',
      position: { x: width * 0.2, y: height * 0.6 },
      initials: 'AH',
    },
    {
      id: '4',
      name: 'Fatima Ali',
      phone: '+92 303 4567890',
      status: 'Present',
      lastSeen: '11:20 AM',
      location: 'East Campus',
      distanceToday: '15.8 km',
      position: { x: width * 0.7, y: height * 0.5 },
      initials: 'FA',
    },
  ];

  const teamOptions = ['All Teams', 'Oxford Publishers', 'Cambridge Press', 'Pearson Education'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return theme.colors.success;
      case 'Absent': return theme.colors.error;
      case 'Late': return theme.colors.warning;
      default: return theme.colors.textSecondary;
    }
  };

  const filteredWorkers = workersData.filter(worker => {
    if (worker.status === 'Present' && !showPresent) return false;
    if (worker.status === 'Absent' && !showAbsent) return false;
    if (worker.status === 'Late' && !showLate) return false;
    if (selectedTeam !== 'All Teams' && worker.name !== selectedTeam) return false;
    return true;
  });

  const WorkerMarker = ({ worker }: { worker: any }) => (
    <TouchableOpacity
      style={[
        styles.marker,
        { 
          left: worker.position.x - 25,
          top: worker.position.y - 25,
          backgroundColor: getStatusColor(worker.status),
        }
      ]}
      onPress={() => setSelectedWorker(worker)}
    >
      <Text style={styles.markerInitials}>{worker.initials}</Text>
      <View style={styles.markerStatus}>
        <Text style={styles.markerStatusText}>{worker.status.charAt(0)}</Text>
      </View>
    </TouchableOpacity>
  );

  const StatusChip = ({ status, isActive, onPress }: { status: string; isActive: boolean; onPress: () => void }) => {
    const getChipStyle = () => {
      switch (status) {
        case 'Present': return { backgroundColor: isActive ? theme.colors.success : theme.colors.gray200, textColor: isActive ? theme.colors.white : theme.colors.textSecondary };
        case 'Absent': return { backgroundColor: isActive ? theme.colors.gray500 : theme.colors.gray200, textColor: isActive ? theme.colors.white : theme.colors.textSecondary };
        case 'Late': return { backgroundColor: isActive ? theme.colors.warning : theme.colors.gray200, textColor: isActive ? theme.colors.white : theme.colors.textSecondary };
        default: return { backgroundColor: theme.colors.gray200, textColor: theme.colors.textSecondary };
      }
    };

    const chipStyle = getChipStyle();

    return (
      <TouchableOpacity 
        style={[styles.statusChip, { backgroundColor: chipStyle.backgroundColor }]}
        onPress={onPress}
      >
        <Text style={[styles.statusChipText, { color: chipStyle.textColor }]}>{status}</Text>
      </TouchableOpacity>
    );
  };

  const FilterPanel = () => (
    <View style={styles.filterPanel}>
      <Text style={styles.filterTitle}>Filters</Text>
      
      {/* Status Chips */}
      <View style={styles.statusChipsContainer}>
        <StatusChip 
          status="Present" 
          isActive={showPresent} 
          onPress={() => setShowPresent(!showPresent)} 
        />
        <StatusChip 
          status="Absent" 
          isActive={showAbsent} 
          onPress={() => setShowAbsent(!showAbsent)} 
        />
        <StatusChip 
          status="Late" 
          isActive={showLate} 
          onPress={() => setShowLate(!showLate)} 
        />
      </View>

      {/* Team Dropdown */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Team</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{selectedTeam}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Date Range Button */}
      <TouchableOpacity style={styles.dateButton}>
        <Text style={styles.dateButtonText}>📅 Date Range</Text>
      </TouchableOpacity>

      {/* Clear Filters Button */}
      {(!showPresent || !showAbsent || !showLate || selectedTeam !== 'All Teams') && (
        <TouchableOpacity 
          style={styles.clearFiltersButton}
          onPress={() => {
            setShowPresent(true);
            setShowAbsent(true);
            setShowLate(true);
            setSelectedTeam('All Teams');
          }}
        >
          <Text style={styles.clearFiltersText}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const WorkerDetailCard = ({ worker }: { worker: any }) => (
    <Modal
      visible={!!selectedWorker}
      transparent
      animationType="slide"
      onRequestClose={() => setSelectedWorker(null)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.detailCard}>
          <View style={styles.detailHeader}>
            <View style={styles.detailAvatar}>
              <Text style={styles.detailInitials}>{worker.initials}</Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailName}>{worker.name}</Text>
              <Text style={styles.detailPhone}>{worker.phone}</Text>
            </View>
            <View style={[styles.detailStatus, { backgroundColor: getStatusColor(worker.status) }]}>
              <Text style={styles.detailStatusText}>{worker.status}</Text>
            </View>
          </View>

          <View style={styles.detailContent}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last Seen:</Text>
              <Text style={styles.detailValue}>{worker.lastSeen} • {worker.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Distance Today:</Text>
              <Text style={styles.detailValue}>{worker.distanceToday}</Text>
            </View>
          </View>

          <View style={styles.detailActions}>
            <TouchableOpacity 
              style={styles.viewWorkerButton}
              onPress={() => {
                setSelectedWorker(null);
                (navigation as any).navigate('WorkerDetail', { workerId: worker.id });
              }}
            >
              <Text style={styles.viewWorkerButtonText}>View Worker Detail</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setSelectedWorker(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Breadcrumbs
          items={[
            { label: 'Home', onPress: () => (navigation as any).navigate('AdminDashboard') },
            { label: 'Map', isActive: true },
          ]}
        />
        <Text style={styles.title}>Live Map</Text>
        <Text style={styles.subtitle}>Workers' last known locations (~15 min updates)</Text>
      </View>

      {/* Map Area */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          {filteredWorkers.length > 0 ? (
            <>
              <Text style={styles.mapTitle}>🗺️ Live Map View</Text>
              <Text style={styles.mapSubtitle}>
                {filteredWorkers.length} workers visible
              </Text>
              
              {/* Worker Markers */}
              {filteredWorkers.map((worker) => (
                <WorkerMarker key={worker.id} worker={worker} />
              ))}
            </>
          ) : (
            <View style={styles.emptyMapState}>
              <EmptyState
                icon="🗺️"
                title="No workers match these filters"
                subtitle="Try adjusting your filter settings to see worker locations"
                buttonText="Clear Filters"
                onButtonPress={() => {
                  setShowPresent(true);
                  setShowAbsent(true);
                  setShowLate(true);
                  setSelectedTeam('All Teams');
                }}
              />
            </View>
          )}
        </View>

        {/* Filter Panel */}
        <FilterPanel />
      </View>

      {/* Footer Note */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Locations are approximate and refreshed every ~15 minutes.
        </Text>
      </View>

      {/* Worker Detail Modal */}
      {selectedWorker && <WorkerDetailCard worker={selectedWorker} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundSecondary,
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

  // Map Container
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#e8f4fd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  mapSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Worker Markers
  marker: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  markerInitials: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.white,
  },
  markerStatus: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  markerStatusText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
  },

  // Filter Panel
  filterPanel: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
    width: 220,
    maxHeight: height * 0.6,
  },
  filterTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  statusChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  statusChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    minWidth: 60,
    alignItems: 'center',
  },
  statusChipText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
  filterSection: {
    marginBottom: theme.spacing.md,
  },
  filterLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  dropdownIcon: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  clearFiltersButton: {
    backgroundColor: theme.colors.error,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  clearFiltersText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
  emptyMapState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },

  // Footer
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Worker Detail Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  detailCard: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius['2xl'],
    borderTopRightRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  detailAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  detailInitials: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.white,
  },
  detailInfo: {
    flex: 1,
  },
  detailName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  detailPhone: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  detailStatus: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  detailStatusText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600' as const,
  },
  detailContent: {
    marginBottom: theme.spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  detailLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  detailValue: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: '500' as const,
    flex: 1,
    textAlign: 'right',
  },
  detailActions: {
    gap: theme.spacing.md,
  },
  viewWorkerButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  viewWorkerButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },
  closeButton: {
    backgroundColor: theme.colors.gray200,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500' as const,
  },
});
