import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Card, EmptyState, LoadingSkeleton, Breadcrumbs, SearchBar } from '../../components';
import { AdminTable, AdminBadge } from '../components';

const { width } = Dimensions.get('window');

export default function WorkersListScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [teamFilter, setTeamFilter] = useState('All Teams');
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock worker data
  const workersData = [
    {
      id: '1',
      name: 'Ali Ahmed',
      phone: '+92 300 1234567',
      team: 'Oxford Publishers',
      todayStatus: 'Present',
      lastSeen: '10:15 AM • Central School',
      kmsMTD: '156.2 km',
      salaryMTD: 'PKR 28,500',
    },
    {
      id: '2',
      name: 'Sarah Khan',
      phone: '+92 301 2345678',
      team: 'Cambridge Press',
      todayStatus: 'Absent',
      lastSeen: 'Yesterday 5:30 PM • Downtown Office',
      kmsMTD: '89.7 km',
      salaryMTD: 'PKR 15,200',
    },
    {
      id: '3',
      name: 'Ahmed Hassan',
      phone: '+92 302 3456789',
      team: 'Oxford Publishers',
      todayStatus: 'Half-day',
      lastSeen: '9:45 AM • North School',
      kmsMTD: '203.1 km',
      salaryMTD: 'PKR 32,800',
    },
    {
      id: '4',
      name: 'Fatima Ali',
      phone: '+92 303 4567890',
      team: 'Pearson Education',
      todayStatus: 'Present',
      lastSeen: '11:20 AM • East Campus',
      kmsMTD: '134.5 km',
      salaryMTD: 'PKR 24,100',
    },
  ];

  const statusOptions = ['All', 'Present Today', 'Absent Today', 'Late'];
  const teamOptions = ['All Teams', 'Oxford Publishers', 'Cambridge Press', 'Pearson Education'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return theme.colors.success;
      case 'Absent': return theme.colors.error;
      case 'Half-day': return theme.colors.warning;
      default: return theme.colors.textSecondary;
    }
  };

  const toggleWorkerSelection = (workerId: string) => {
    setSelectedWorkers(prev => 
      prev.includes(workerId) 
        ? prev.filter(id => id !== workerId)
        : [...prev, workerId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setTeamFilter('All Teams');
  };

  const FilterDropdown = ({ options, selected, onSelect, placeholder }: {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
    placeholder: string;
  }) => (
    <TouchableOpacity style={styles.dropdown}>
      <Text style={styles.dropdownText}>{selected}</Text>
      <Text style={styles.dropdownIcon}>▼</Text>
    </TouchableOpacity>
  );

  const WorkerCard = ({ worker }: { worker: any }) => (
    <Card style={styles.workerCard}>
      <View style={styles.workerHeader}>
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{worker.name}</Text>
          <Text style={styles.workerPhone}>{worker.phone}</Text>
          <Text style={styles.workerTeam}>{worker.team}</Text>
        </View>
        <View style={styles.workerActions}>
          <View style={[styles.statusChip, { backgroundColor: getStatusColor(worker.todayStatus) }]}>
            <Text style={styles.statusChipText}>{worker.todayStatus}</Text>
          </View>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => (navigation as any).navigate('WorkerDetail', { workerId: worker.id })}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.workerDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Last Seen:</Text>
          <Text style={styles.detailValue}>{worker.lastSeen}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>KMs (MTD):</Text>
          <Text style={styles.detailValue}>{worker.kmsMTD}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Salary (MTD):</Text>
          <Text style={styles.detailValue}>{worker.salaryMTD}</Text>
        </View>
      </View>
    </Card>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Workers</Text>
          <Text style={styles.subtitle}>Manage attendance, salary, and activity</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <LoadingSkeleton.SkeletonList count={4} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Breadcrumbs
            items={[
              { label: 'Home', onPress: () => (navigation as any).navigate('AdminDashboard') },
              { label: 'Workers', isActive: true },
            ]}
          />
          <Text style={styles.title}>Workers</Text>
          <Text style={styles.subtitle}>Manage attendance, salary, and activity</Text>
        </View>
        <SearchBar
          placeholder="Search workers..."
          variant="inline"
          onSearch={(query) => {
            console.log('Searching workers:', query);
            // Mock search functionality
          }}
        />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Filters Row */}
        <View style={styles.filtersSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or phone"
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          
          <View style={styles.filtersRow}>
            <FilterDropdown
              options={statusOptions}
              selected={statusFilter}
              onSelect={setStatusFilter}
              placeholder="Status"
            />
            <FilterDropdown
              options={teamOptions}
              selected={teamFilter}
              onSelect={setTeamFilter}
              placeholder="Team"
            />
            <TouchableOpacity style={styles.dateButton}>
              <Text style={styles.dateButtonText}>📅 Date Range</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.clearFiltersButton} onPress={clearFilters}>
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Workers Table */}
        <View style={styles.workersSection}>
          <Text style={styles.sectionTitle}>
            {workersData.length} Workers Found
          </Text>
          
          <AdminTable
            columns={[
              { key: 'name', title: 'Worker', sortable: true, align: 'left' },
              { key: 'status', title: 'Status', sortable: true, align: 'center' },
              { key: 'lastSeen', title: 'Last Seen', sortable: true, align: 'center' },
              { key: 'kmsMTD', title: 'KMs (MTD)', sortable: true, align: 'right' },
              { key: 'salaryMTD', title: 'Salary (MTD)', sortable: true, align: 'right' },
              { key: 'actions', title: 'Actions', sortable: false, align: 'center' },
            ]}
            data={workersData.map(worker => ({
              ...worker,
              status: <AdminBadge 
                label={worker.todayStatus} 
                variant={worker.todayStatus.toLowerCase().replace(' ', '-') as any}
                size="sm"
              />,
              actions: (
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => (navigation as any).navigate('WorkerDetail', { workerId: worker.id })}
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              ),
            }))}
            emptyMessage="No workers found"
            onSort={(column) => {
              console.log('Sort by:', column);
              // Mock sorting
            }}
          />
        </View>

        {/* Bulk Actions Bar */}
        {selectedWorkers.length > 0 && (
          <View style={styles.bulkActionsBar}>
            <Text style={styles.bulkActionsText}>
              {selectedWorkers.length} selected
            </Text>
            <View style={styles.bulkActionsButtons}>
              <TouchableOpacity style={styles.bulkActionButton}>
                <Text style={styles.bulkActionButtonText}>Mark Present</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bulkActionButton}>
                <Text style={styles.bulkActionButtonText}>Mark Absent</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bulkActionButton}>
                <Text style={styles.bulkActionButtonText}>Send Notice</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  headerContent: {
    flex: 1,
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

  // Filters Section
  filtersSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
    marginBottom: theme.spacing.md,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
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
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  clearFiltersButton: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  clearFiltersText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.error,
    fontWeight: '500' as const,
  },

  // Workers Section
  workersSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  workerCard: {
    padding: theme.spacing.lg,
  },
  workerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  workerPhone: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  workerTeam: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.accent,
    fontWeight: '500' as const,
  },
  workerActions: {
    alignItems: 'flex-end',
  },
  statusChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  statusChipText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600' as const,
  },
  viewButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  viewButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
  },
  workerDetails: {
    gap: theme.spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  separator: {
    height: theme.spacing.sm,
  },

  // Bulk Actions
  bulkActionsBar: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
  },
  bulkActionsText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  bulkActionsButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  bulkActionButton: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  bulkActionButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '500' as const,
  },
});
