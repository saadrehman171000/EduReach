import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { theme } from '../theme';

export default function AttendanceScreen() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock calendar data for current month
  const currentMonth = selectedMonth.getMonth();
  const currentYear = selectedMonth.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Mock attendance data
  const attendanceData = {
    '2024-01-01': { status: 'Present', inTime: '09:00 AM', outTime: '06:00 PM', workedHours: '9h', markedBy: 'Admin', notes: '' },
    '2024-01-02': { status: 'Present', inTime: '09:15 AM', outTime: '06:15 PM', workedHours: '9h', markedBy: 'Admin', notes: '' },
    '2024-01-03': { status: 'Absent', inTime: '-', outTime: '-', workedHours: '0h', markedBy: 'Admin', notes: 'Sick leave' },
    '2024-01-04': { status: 'Half-day', inTime: '09:00 AM', outTime: '01:00 PM', workedHours: '4h', markedBy: 'Admin', notes: 'Personal work' },
    '2024-01-05': { status: 'Present', inTime: '08:45 AM', outTime: '05:45 PM', workedHours: '9h', markedBy: 'Admin', notes: '' },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return theme.colors.success;
      case 'Absent':
        return theme.colors.error;
      case 'Half-day':
        return theme.colors.warning;
      case 'Leave':
        return theme.colors.info;
      case 'Sunday':
        return theme.colors.gray400;
      default:
        return theme.colors.gray500;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Present':
        return 'P';
      case 'Absent':
        return 'A';
      case 'Half-day':
        return 'H';
      case 'Leave':
        return 'L';
      case 'Sunday':
        return 'OFF';
      default:
        return '';
    }
  };

  const isSunday = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date.getDay() === 0;
  };

  const getDayStatus = (day: number) => {
    if (isSunday(day)) return 'Sunday';
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return attendanceData[dateStr]?.status || 'Absent';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(selectedMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth - 1);
    } else {
      newMonth.setMonth(currentMonth + 1);
    }
    setSelectedMonth(newMonth);
  };

  const openDayDetails = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = attendanceData[dateStr];
    if (dayData) {
      setSelectedDay({ day, ...dayData });
      setModalVisible(true);
    }
  };

  // Calculate monthly summary
  const monthlySummary = {
    present: 18,
    absent: 3,
    halfDay: 2,
    leave: 1,
    sundays: 4,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Attendance</Text>
          <Text style={styles.subtitle}>Attendance is marked by Admin. You can only view.</Text>
        </View>

        {/* Month Selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.monthButton}>
            <Text style={styles.monthButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>
            {selectedMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
          <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.monthButton}>
            <Text style={styles.monthButtonText}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <Text key={day} style={styles.calendarHeaderText}>{day}</Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.calendarCell} />
            ))}
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const status = getDayStatus(day);
              const isOffDay = isSunday(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={styles.calendarCell}
                  onPress={() => !isOffDay && openDayDetails(day)}
                >
                  <Text style={styles.calendarDayNumber}>{day}</Text>
                  <View style={[styles.statusChip, { backgroundColor: getStatusColor(status) }]}>
                    <Text style={styles.statusChipText}>{getStatusText(status)}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Monthly Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Monthly Summary</Text>
          <View style={styles.summaryCards}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{monthlySummary.present}</Text>
              <Text style={styles.summaryLabel}>Present Days</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{monthlySummary.absent}</Text>
              <Text style={styles.summaryLabel}>Absent Days</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{monthlySummary.halfDay}</Text>
              <Text style={styles.summaryLabel}>Half-days</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{monthlySummary.leave}</Text>
              <Text style={styles.summaryLabel}>Leave Days</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryNumber}>{monthlySummary.sundays}</Text>
              <Text style={styles.summaryLabel}>Sundays (OFF)</Text>
            </View>
          </View>
          <Text style={styles.disclaimer}>Only Admin can change attendance.</Text>
        </View>

        {/* Legend */}
        <View style={styles.legendSection}>
          <Text style={styles.legendTitle}>Legend</Text>
          <View style={styles.legendItems}>
            <View style={styles.legendItem}>
              <View style={[styles.legendChip, { backgroundColor: theme.colors.success }]}>
                <Text style={styles.legendChipText}>P</Text>
              </View>
              <Text style={styles.legendText}>Present</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendChip, { backgroundColor: theme.colors.error }]}>
                <Text style={styles.legendChipText}>A</Text>
              </View>
              <Text style={styles.legendText}>Absent</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendChip, { backgroundColor: theme.colors.warning }]}>
                <Text style={styles.legendChipText}>H</Text>
              </View>
              <Text style={styles.legendText}>Half-day</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendChip, { backgroundColor: theme.colors.info }]}>
                <Text style={styles.legendChipText}>L</Text>
              </View>
              <Text style={styles.legendText}>Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendChip, { backgroundColor: theme.colors.textSecondary }]}>
                <Text style={styles.legendChipText}>OFF</Text>
              </View>
              <Text style={styles.legendText}>Sunday OFF</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Day Details Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Day {selectedDay?.day} Details</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>
            {selectedDay && (
              <View style={styles.modalBody}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status:</Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedDay.status) }]}>
                    <Text style={styles.statusText}>{selectedDay.status}</Text>
                  </View>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Marked By:</Text>
                  <Text style={styles.detailValue}>{selectedDay.markedBy}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>In Time:</Text>
                  <Text style={styles.detailValue}>{selectedDay.inTime}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Out Time:</Text>
                  <Text style={styles.detailValue}>{selectedDay.outTime}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Worked Hours:</Text>
                  <Text style={styles.detailValue}>{selectedDay.workedHours}</Text>
                </View>
                {selectedDay.notes && (
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Notes:</Text>
                    <Text style={styles.detailValue}>{selectedDay.notes}</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </Modal>
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

  // Month Selector
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  monthButton: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600' as const,
  },
  monthLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },

  // Calendar
  calendarContainer: {
    backgroundColor: theme.colors.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  calendarHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  calendarHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.textSecondary,
    paddingVertical: theme.spacing.sm,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
  },
  calendarDayNumber: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  statusChip: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
    minWidth: 24,
    alignItems: 'center',
  },
  statusChipText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600' as const,
  },

  // Summary Section
  summarySection: {
    padding: theme.spacing.lg,
  },
  summaryTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  summaryCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  summaryCard: {
    width: '18%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  summaryNumber: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700' as const,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  summaryLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius['2xl'],
    borderTopRightRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.lg,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  modalCloseButton: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.textSecondary,
  },
  modalBody: {
    gap: theme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  detailValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
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

  // Legend
  legendSection: {
    padding: theme.spacing.lg,
  },
  legendTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  legendChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    minWidth: 32,
    alignItems: 'center',
  },
  legendChipText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
  legendText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});
