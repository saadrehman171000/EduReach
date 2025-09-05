import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { Card, EmptyState, LoadingSkeleton, Breadcrumbs, SegmentedControl } from '../../components';
import { AdminBadge } from '../components';

const { width } = Dimensions.get('window');

export default function WorkerDetailScreen() {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = useState('September 2024');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [inTime, setInTime] = useState('09:00');
  const [outTime, setOutTime] = useState('17:00');
  const [notes, setNotes] = useState('');
  const [baseSalary, setBaseSalary] = useState('40000');
  const [activeTab, setActiveTab] = useState('Visits');

  // Mock worker data
  const workerData = {
    id: '1',
    name: 'Ali Ahmed',
    phone: '+92 300 1234567',
    team: 'Oxford Publishers',
    attendanceMTD: { present: 18, absent: 2, halfDay: 1, leave: 0 },
    salaryMTD: 'PKR 28,500',
    kmsMTD: '156.2 km',
    lastSeen: '10:15 AM • Central School',
  };

  // Mock attendance calendar data
  const attendanceData = [
    { day: 1, status: 'P' }, { day: 2, status: 'P' }, { day: 3, status: 'OFF' },
    { day: 4, status: 'P' }, { day: 5, status: 'P' }, { day: 6, status: 'P' },
    { day: 7, status: 'OFF' }, { day: 8, status: 'P' }, { day: 9, status: 'A' },
    { day: 10, status: 'OFF' }, { day: 11, status: 'P' }, { day: 12, status: 'H' },
    { day: 13, status: 'OFF' }, { day: 14, status: 'P' }, { day: 15, status: 'P' },
    { day: 16, status: 'OFF' }, { day: 17, status: 'P' }, { day: 18, status: 'P' },
    { day: 19, status: 'OFF' }, { day: 20, status: 'P' }, { day: 21, status: 'P' },
    { day: 22, status: 'OFF' }, { day: 23, status: 'P' }, { day: 24, status: 'P' },
    { day: 25, status: 'OFF' }, { day: 26, status: 'P' }, { day: 27, status: 'P' },
    { day: 28, status: 'OFF' }, { day: 29, status: 'P' }, { day: 30, status: 'P' },
  ];

  // Mock visits data
  const visitsData = [
    { id: 1, school: 'Central School', samples: 5, status: 'Approved', date: 'Sep 25' },
    { id: 2, school: 'North Primary', samples: 3, status: 'Sample Given', date: 'Sep 24' },
    { id: 3, school: 'East Campus', samples: 8, status: 'Rejected', date: 'Sep 23' },
  ];

  // Mock orders data
  const ordersData = [
    { id: 1, school: 'Central School', quantity: 50, payment: 'Cash', status: 'Completed', date: 'Sep 25' },
    { id: 2, school: 'North Primary', quantity: 30, payment: 'Cheque', chequeStatus: 'Cleared', date: 'Sep 24' },
    { id: 3, school: 'East Campus', quantity: 25, payment: 'Pending', status: 'Pending', date: 'Sep 23' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'P': return theme.colors.success;
      case 'A': return theme.colors.error;
      case 'H': return theme.colors.warning;
      case 'L': return theme.colors.info;
      case 'OFF': return theme.colors.textSecondary;
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'P': return 'Present';
      case 'A': return 'Absent';
      case 'H': return 'Half-day';
      case 'L': return 'Leave';
      case 'OFF': return 'OFF';
      default: return status;
    }
  };

  const getPaymentColor = (payment: string) => {
    switch (payment) {
      case 'Cash': return theme.colors.success;
      case 'Cheque': return theme.colors.info;
      case 'Pending': return theme.colors.warning;
      default: return theme.colors.textSecondary;
    }
  };

  const CalendarDay = ({ day, status }: { day: number; status: string }) => (
    <View style={styles.calendarDay}>
      <Text style={styles.calendarDayNumber}>{day}</Text>
      <View style={[styles.statusDot, { backgroundColor: getStatusColor(status) }]}>
        <Text style={styles.statusDotText}>{status}</Text>
      </View>
    </View>
  );

  const SummaryCard = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => (
    <Card style={styles.summaryCard}>
      <Text style={styles.summaryIcon}>{icon}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryTitle}>{title}</Text>
    </Card>
  );

  const SegmentedButton = ({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (value: string) => void }) => (
    <View style={styles.segmentedContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.segmentedButton,
            selected === option && styles.segmentedButtonActive
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={[
            styles.segmentedButtonText,
            selected === option && styles.segmentedButtonTextActive
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header / Breadcrumb */}
        <View style={styles.header}>
          <Breadcrumbs
            items={[
              { label: 'Home', onPress: () => (navigation as any).navigate('AdminDashboard') },
              { label: 'Workers', onPress: () => (navigation as any).navigate('WorkersList') },
              { label: workerData.name, isActive: true },
            ]}
          />
          <Text style={styles.title}>Worker Details</Text>
          <Text style={styles.subtitle}>{workerData.phone} • {workerData.team}</Text>
        </View>

        {/* Summary Row */}
        <View style={styles.summarySection}>
          <SummaryCard title="Present Days" value={workerData.attendanceMTD.present.toString()} icon="✅" color={theme.colors.success} />
          <SummaryCard title="Absent Days" value={workerData.attendanceMTD.absent.toString()} icon="❌" color={theme.colors.error} />
          <SummaryCard title="Salary (MTD)" value={workerData.salaryMTD} icon="💰" color={theme.colors.accent} />
          <SummaryCard title="KMs (MTD)" value={workerData.kmsMTD} icon="🚗" color={theme.colors.info} />
        </View>

        {/* Attendance Card */}
        <Card style={styles.attendanceCard}>
          <Text style={styles.cardTitle}>Attendance Management</Text>
          
          {/* Month Switcher */}
          <View style={styles.monthSwitcher}>
            <TouchableOpacity style={styles.monthButton}>
              <Text style={styles.monthButtonText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{selectedMonth}</Text>
            <TouchableOpacity style={styles.monthButton}>
              <Text style={styles.monthButtonText}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.attendanceContent}>
            {/* Calendar Grid */}
            <View style={styles.calendarGrid}>
              {attendanceData.map((item, index) => (
                <CalendarDay key={index} day={item.day} status={item.status} />
              ))}
            </View>

            {/* Control Panel */}
            <View style={styles.controlPanel}>
              <Text style={styles.controlTitle}>Mark Today</Text>
              <SegmentedControl
                options={['Present', 'Absent', 'Half-day', 'Leave']}
                selected={attendanceStatus}
                onSelect={setAttendanceStatus}
                size="sm"
              />

              <View style={styles.timeInputs}>
                <View style={styles.timeInput}>
                  <Text style={styles.timeLabel}>In Time</Text>
                  <TextInput
                    style={styles.timeInputField}
                    value={inTime}
                    onChangeText={setInTime}
                    placeholder="09:00"
                  />
                </View>
                <View style={styles.timeInput}>
                  <Text style={styles.timeLabel}>Out Time</Text>
                  <TextInput
                    style={styles.timeInputField}
                    value={outTime}
                    onChangeText={setOutTime}
                    placeholder="17:00"
                  />
                </View>
              </View>

              <View style={styles.workedHours}>
                <Text style={styles.workedHoursLabel}>Worked Hours: 8h</Text>
              </View>

              <TextInput
                style={styles.notesInput}
                placeholder="Add notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>

              <Text style={styles.disclaimer}>
                Changes are visual only for design. No data is saved.
              </Text>
            </View>
          </View>
        </Card>

        {/* Salary & Policy Card */}
        <Card style={styles.salaryCard}>
          <Text style={styles.cardTitle}>Salary & Policy</Text>
          
          <View style={styles.salaryContent}>
            <View style={styles.salaryInput}>
              <Text style={styles.salaryLabel}>Base Salary</Text>
              <TextInput
                style={styles.salaryInputField}
                value={baseSalary}
                onChangeText={setBaseSalary}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.policyInfo}>
              <Text style={styles.policyTitle}>Policy Highlights</Text>
              <Text style={styles.policyText}>• Sundays are OFF (no deduction)</Text>
              <Text style={styles.policyText}>• Per-day rate: PKR {Math.round(parseInt(baseSalary) / 26)}</Text>
              <Text style={styles.policyText}>• Late arrival: PKR 500 per hour deduction</Text>
            </View>

            <View style={styles.salaryActions}>
              <TouchableOpacity style={styles.salaryActionButton}>
                <Text style={styles.salaryActionButtonText}>Preview Payroll</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.salaryActionButton}>
                <Text style={styles.salaryActionButtonText}>Export CSV</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* GPS & Activity Card */}
        <Card style={styles.gpsCard}>
          <Text style={styles.cardTitle}>GPS & Activity</Text>
          
          <View style={styles.gpsContent}>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapPlaceholderText}>🗺️ Map View</Text>
              <Text style={styles.mapPlaceholderSubtext}>Last known location</Text>
            </View>
            
            <View style={styles.activityTimeline}>
              <Text style={styles.timelineTitle}>Today's Activity</Text>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineTime}>10:15 AM</Text>
                <Text style={styles.timelineLocation}>Central School</Text>
                <Text style={styles.timelineDistance}>+2.1 km</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineTime}>09:30 AM</Text>
                <Text style={styles.timelineLocation}>North Office</Text>
                <Text style={styles.timelineDistance}>+1.5 km</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.mapButton}
              onPress={() => (navigation as any).navigate('Map')}
            >
              <Text style={styles.mapButtonText}>Open Full Map</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Visits & Orders Card */}
        <Card style={styles.visitsCard}>
          <Text style={styles.cardTitle}>Visits & Orders</Text>
          
          {/* Tabs */}
          <SegmentedControl
            options={['Visits', 'Orders']}
            selected={activeTab}
            onSelect={setActiveTab}
            size="sm"
          />

          {/* Tab Content */}
          {activeTab === 'Visits' ? (
            <View style={styles.tabContent}>
              {visitsData.map((visit) => (
                <View key={visit.id} style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{visit.school}</Text>
                    <Text style={styles.listItemSubtitle}>{visit.samples} samples • {visit.date}</Text>
                  </View>
                  <View style={[styles.listItemChip, { backgroundColor: getStatusColor(visit.status === 'Approved' ? 'P' : visit.status === 'Rejected' ? 'A' : 'H') }]}>
                    <Text style={styles.listItemChipText}>{visit.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.tabContent}>
              {ordersData.map((order) => (
                <View key={order.id} style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemTitle}>{order.school}</Text>
                    <Text style={styles.listItemSubtitle}>{order.quantity} qty • {order.payment} • {order.date}</Text>
                    {order.chequeStatus && (
                      <Text style={styles.listItemSubtitle}>Cheque: {order.chequeStatus}</Text>
                    )}
                  </View>
                  <View style={[styles.listItemChip, { backgroundColor: getPaymentColor(order.payment) }]}>
                    <Text style={styles.listItemChipText}>{order.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.visitsActions}>
            <TouchableOpacity style={styles.visitsActionButton}>
              <Text style={styles.visitsActionButtonText}>Approve Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.visitsActionButton}>
              <Text style={styles.visitsActionButtonText}>Add Note</Text>
            </TouchableOpacity>
          </View>
        </Card>
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
  backButton: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  breadcrumb: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Summary Section
  summarySection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  summaryCard: {
    width: (width - theme.spacing.lg * 2 - theme.spacing.md) / 2,
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  summaryIcon: {
    fontSize: theme.typography.fontSize.xl,
    marginBottom: theme.spacing.xs,
  },
  summaryValue: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  summaryTitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },

  // Attendance Card
  attendanceCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  monthSwitcher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  monthButton: {
    padding: theme.spacing.sm,
  },
  monthButtonText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary,
    fontWeight: '600' as const,
  },
  monthLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  attendanceContent: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  calendarGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  calendarDay: {
    width: (width - theme.spacing.lg * 4 - theme.spacing.lg * 2) / 7,
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  calendarDayNumber: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDotText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  controlPanel: {
    width: 200,
    gap: theme.spacing.md,
  },
  controlTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.sm,
    padding: 2,
  },
  segmentedButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  segmentedButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  segmentedButtonText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
  },
  segmentedButtonTextActive: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  timeInputs: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  timeInput: {
    flex: 1,
  },
  timeLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  timeInputField: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  workedHours: {
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.sm,
  },
  workedHoursLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: '600' as const,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
  disclaimer: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Salary Card
  salaryCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  salaryContent: {
    gap: theme.spacing.lg,
  },
  salaryInput: {
    gap: theme.spacing.sm,
  },
  salaryLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  salaryInputField: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  policyInfo: {
    gap: theme.spacing.sm,
  },
  policyTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  policyText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  salaryActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  salaryActionButton: {
    flex: 1,
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  salaryActionButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },

  // GPS Card
  gpsCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  gpsContent: {
    gap: theme.spacing.lg,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: theme.typography.fontSize.lg,
    marginBottom: theme.spacing.xs,
  },
  mapPlaceholderSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  activityTimeline: {
    gap: theme.spacing.sm,
  },
  timelineTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  timelineTime: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    width: 60,
  },
  timelineLocation: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  timelineDistance: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.accent,
    fontWeight: '500' as const,
  },
  mapButton: {
    backgroundColor: theme.colors.info,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  mapButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },

  // Visits Card
  visitsCard: {
    margin: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.sm,
    padding: 2,
    marginBottom: theme.spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  tabText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  tabTextActive: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  tabContent: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  listItemSubtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  listItemChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  listItemChipText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600' as const,
  },
  visitsActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  visitsActionButton: {
    flex: 1,
    backgroundColor: theme.colors.warning,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  visitsActionButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
});
