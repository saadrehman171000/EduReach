import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { theme } from '../../theme';
import { Card, EmptyState, LoadingSkeleton, Breadcrumbs, SegmentedControl } from '../../components';
import { ExportModal } from '../components';

const { width } = Dimensions.get('window');

export default function ReportsScreen() {
  const [selectedMonth, setSelectedMonth] = useState('September 2024');
  const [reportType, setReportType] = useState('Attendance');
  const [selectedWorker, setSelectedWorker] = useState('All Workers');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [printView, setPrintView] = useState(false);

  const reportTypes = ['Attendance', 'Salary', 'Distance', 'Orders'];
  const workerOptions = ['All Workers', 'Ali Ahmed', 'Sarah Khan', 'Ahmed Hassan', 'Fatima Ali'];

  // Mock report data
  const attendanceReportData = [
    { worker: 'Ali Ahmed', present: 18, absent: 2, halfDay: 1, leave: 0, salaryMTD: 'PKR 28,500' },
    { worker: 'Sarah Khan', present: 15, absent: 5, halfDay: 0, leave: 1, salaryMTD: 'PKR 22,100' },
    { worker: 'Ahmed Hassan', present: 17, absent: 1, halfDay: 2, leave: 0, salaryMTD: 'PKR 26,800' },
    { worker: 'Fatima Ali', present: 19, absent: 1, halfDay: 0, leave: 0, salaryMTD: 'PKR 30,200' },
  ];

  const salaryReportData = [
    { worker: 'Ali Ahmed', baseSalary: 'PKR 40,000', adjustments: '-PKR 2,500', netSalary: 'PKR 37,500' },
    { worker: 'Sarah Khan', baseSalary: 'PKR 35,000', adjustments: '-PKR 4,200', netSalary: 'PKR 30,800' },
    { worker: 'Ahmed Hassan', baseSalary: 'PKR 38,000', adjustments: '-PKR 1,800', netSalary: 'PKR 36,200' },
    { worker: 'Fatima Ali', baseSalary: 'PKR 42,000', adjustments: '-PKR 1,200', netSalary: 'PKR 40,800' },
  ];

  const distanceReportData = [
    { worker: 'Ali Ahmed', totalKMs: '156.2 km', avgKMsPerDay: '7.8 km' },
    { worker: 'Sarah Khan', totalKMs: '89.7 km', avgKMsPerDay: '4.5 km' },
    { worker: 'Ahmed Hassan', totalKMs: '203.1 km', avgKMsPerDay: '10.2 km' },
    { worker: 'Fatima Ali', totalKMs: '134.5 km', avgKMsPerDay: '6.7 km' },
  ];

  const ordersReportData = [
    { worker: 'Ali Ahmed', school: 'Central School', qty: 50, paymentType: 'Cash', status: 'Completed' },
    { worker: 'Sarah Khan', school: 'North Primary', qty: 30, paymentType: 'Cheque', status: 'Pending' },
    { worker: 'Ahmed Hassan', school: 'East Campus', qty: 25, paymentType: 'Cash', status: 'Completed' },
    { worker: 'Fatima Ali', school: 'South High', qty: 40, paymentType: 'Pending', status: 'Processing' },
  ];

  const getCurrentReportData = () => {
    switch (reportType) {
      case 'Attendance': return attendanceReportData;
      case 'Salary': return salaryReportData;
      case 'Distance': return distanceReportData;
      case 'Orders': return ordersReportData;
      default: return [];
    }
  };

  const generateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setReportData(getCurrentReportData());
      setIsGenerating(false);
    }, 2000);
  };

  const getPaymentColor = (paymentType: string) => {
    switch (paymentType) {
      case 'Cash': return theme.colors.success;
      case 'Cheque': return theme.colors.info;
      case 'Pending': return theme.colors.warning;
      default: return theme.colors.textSecondary;
    }
  };

  const SegmentedControl = ({ options, selected, onSelect }: {
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
  }) => (
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

  const ReportTable = ({ data }: { data: any[] }) => {
    if (reportType === 'Attendance') {
      // Calculate totals
      const totals = data.reduce((acc, row) => ({
        present: acc.present + row.present,
        absent: acc.absent + row.absent,
        halfDay: acc.halfDay + row.halfDay,
        leave: acc.leave + row.leave,
      }), { present: 0, absent: 0, halfDay: 0, leave: 0 });

      return (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Worker</Text>
            <Text style={styles.tableHeaderText}>Present</Text>
            <Text style={styles.tableHeaderText}>Absent</Text>
            <Text style={styles.tableHeaderText}>Half-day</Text>
            <Text style={styles.tableHeaderText}>Leave</Text>
            <Text style={styles.tableHeaderText}>Salary MTD</Text>
          </View>
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCellLeft}>{row.worker}</Text>
              <Text style={[styles.tableCell, styles.presentCell]}>{row.present}</Text>
              <Text style={[styles.tableCell, styles.absentCell]}>{row.absent}</Text>
              <Text style={[styles.tableCell, styles.halfDayCell]}>{row.halfDay}</Text>
              <Text style={[styles.tableCell, styles.leaveCell]}>{row.leave}</Text>
              <Text style={styles.tableCellRight}>{row.salaryMTD}</Text>
            </View>
          ))}
          {/* Totals Row */}
          <View style={[styles.tableRow, styles.totalsRow]}>
            <Text style={[styles.tableCellLeft, styles.totalsText]}>TOTALS</Text>
            <Text style={[styles.tableCell, styles.presentCell, styles.totalsText]}>{totals.present}</Text>
            <Text style={[styles.tableCell, styles.absentCell, styles.totalsText]}>{totals.absent}</Text>
            <Text style={[styles.tableCell, styles.halfDayCell, styles.totalsText]}>{totals.halfDay}</Text>
            <Text style={[styles.tableCell, styles.leaveCell, styles.totalsText]}>{totals.leave}</Text>
            <Text style={[styles.tableCellRight, styles.totalsText]}>—</Text>
          </View>
        </View>
      );
    }

    if (reportType === 'Salary') {
      return (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Worker</Text>
            <Text style={styles.tableHeaderText}>Base Salary</Text>
            <Text style={styles.tableHeaderText}>Adjustments</Text>
            <Text style={styles.tableHeaderText}>Net Salary</Text>
          </View>
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.worker}</Text>
              <Text style={styles.tableCell}>{row.baseSalary}</Text>
              <Text style={[styles.tableCell, styles.adjustmentCell]}>{row.adjustments}</Text>
              <Text style={[styles.tableCell, styles.netSalaryCell]}>{row.netSalary}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (reportType === 'Distance') {
      return (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Worker</Text>
            <Text style={styles.tableHeaderText}>Total KMs</Text>
            <Text style={styles.tableHeaderText}>Avg KMs/Day</Text>
          </View>
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.worker}</Text>
              <Text style={styles.tableCell}>{row.totalKMs}</Text>
              <Text style={styles.tableCell}>{row.avgKMsPerDay}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (reportType === 'Orders') {
      return (
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Worker</Text>
            <Text style={styles.tableHeaderText}>School</Text>
            <Text style={styles.tableHeaderText}>Qty</Text>
            <Text style={styles.tableHeaderText}>Payment</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>
          {data.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{row.worker}</Text>
              <Text style={styles.tableCell}>{row.school}</Text>
              <Text style={styles.tableCell}>{row.qty}</Text>
              <View style={[styles.paymentChip, { backgroundColor: getPaymentColor(row.paymentType) }]}>
                <Text style={styles.paymentChipText}>{row.paymentType}</Text>
              </View>
              <Text style={styles.tableCell}>{row.status}</Text>
            </View>
          ))}
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Breadcrumbs
            items={[
              { label: 'Home', onPress: () => (navigation as any).navigate('AdminDashboard') },
              { label: 'Reports', isActive: true },
            ]}
          />
          <Text style={styles.title}>Reports</Text>
          <Text style={styles.subtitle}>Generate and export reports</Text>
        </View>

        {/* Report Filters */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Report Filters</Text>
          
          {/* Month Selector */}
          <View style={styles.monthSelector}>
            <TouchableOpacity style={styles.monthButton}>
              <Text style={styles.monthButtonText}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthLabel}>{selectedMonth}</Text>
            <TouchableOpacity style={styles.monthButton}>
              <Text style={styles.monthButtonText}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Report Type Segmented Control */}
          <View style={styles.segmentedSection}>
            <Text style={styles.segmentedLabel}>Report Type</Text>
            <SegmentedControl
              options={reportTypes}
              selected={reportType}
              onSelect={setReportType}
            />
          </View>

          {/* Worker Scope Segmented Control */}
          <View style={styles.segmentedSection}>
            <Text style={styles.segmentedLabel}>Worker Scope</Text>
            <SegmentedControl
              options={['All Workers', 'By Team', 'Single Worker']}
              selected={selectedWorker === 'All Workers' ? 'All Workers' : selectedWorker === 'Oxford Publishers' ? 'By Team' : 'Single Worker'}
              onSelect={(value) => {
                if (value === 'All Workers') setSelectedWorker('All Workers');
                else if (value === 'By Team') setSelectedWorker('Oxford Publishers');
                else setSelectedWorker('Ali Ahmed');
              }}
            />
          </View>

          {/* Print View Toggle */}
          <View style={styles.printToggleSection}>
            <Text style={styles.segmentedLabel}>Print View</Text>
            <TouchableOpacity 
              style={styles.printToggle}
              onPress={() => setPrintView(!printView)}
            >
              <Text style={styles.printToggleText}>
                {printView ? '📄 Print View ON' : '📄 Print View OFF'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.generateButton} onPress={generateReport}>
            <Text style={styles.generateButtonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>

        {/* Report Preview */}
        {isGenerating ? (
          <View style={styles.loadingSection}>
            <LoadingSkeleton.SkeletonList count={4} />
          </View>
        ) : reportData ? (
          <View style={styles.reportSection}>
            <Text style={styles.sectionTitle}>
              {reportType} Report - {selectedMonth}
            </Text>
            <Card style={[styles.reportCard, printView && styles.printCard]}>
              <ReportTable data={reportData} />
            </Card>

            {/* Export Bar */}
            <View style={styles.exportBar}>
              <TouchableOpacity 
                style={styles.exportButton}
                onPress={() => setShowExportModal(true)}
              >
                <Text style={styles.exportButtonText}>📄 Export Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.emptySection}>
            <EmptyState
              icon="📊"
              title="No attendance found for this month"
              subtitle="Select filters and click 'Generate Report' to create a report"
            />
          </View>
        )}

        {/* Export Modal */}
        <ExportModal
          visible={showExportModal}
          onClose={() => setShowExportModal(false)}
          onExport={(config) => {
            console.log('Export config:', config);
            // Mock export action
          }}
        />
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

  // Filters Section
  filtersSection: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  segmentedSection: {
    marginBottom: theme.spacing.lg,
  },
  segmentedLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  segmentedContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.lg,
    padding: 2,
  },
  segmentedButton: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    borderRadius: theme.borderRadius.lg,
  },
  segmentedButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  segmentedButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  segmentedButtonTextActive: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
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
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginHorizontal: theme.spacing.md,
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
  generateButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    ...theme.shadows.md,
  },
  generateButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },

  // Loading Section
  loadingSection: {
    padding: theme.spacing.lg,
  },

  // Report Section
  reportSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
  reportCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },

  // Table Styles
  tableContainer: {
    gap: theme.spacing.xs,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: theme.colors.gray100,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  tableCellLeft: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    textAlign: 'left',
  },
  tableCellRight: {
    flex: 1,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    textAlign: 'right',
  },
  totalsRow: {
    backgroundColor: theme.colors.gray50,
    borderTopWidth: 2,
    borderTopColor: theme.colors.gray300,
    fontWeight: '700' as const,
  },
  totalsText: {
    fontWeight: '700' as const,
  },
  presentCell: {
    color: theme.colors.success,
    fontWeight: '600' as const,
  },
  absentCell: {
    color: theme.colors.error,
    fontWeight: '600' as const,
  },
  halfDayCell: {
    color: theme.colors.warning,
    fontWeight: '600' as const,
  },
  leaveCell: {
    color: theme.colors.info,
    fontWeight: '600' as const,
  },
  adjustmentCell: {
    color: theme.colors.error,
    fontWeight: '600' as const,
  },
  netSalaryCell: {
    color: theme.colors.success,
    fontWeight: '600' as const,
  },
  paymentChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  paymentChipText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.xs,
    fontWeight: '600' as const,
  },

  // Export Bar
  exportBar: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.gray50,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  exportButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray300,
  },
  exportButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },

  // Empty Section
  emptySection: {
    padding: theme.spacing.lg,
  },

  // Print View Styles
  printToggleSection: {
    marginBottom: theme.spacing.lg,
  },
  printToggle: {
    backgroundColor: theme.colors.gray100,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray300,
  },
  printToggleText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
    fontWeight: '500' as const,
  },
  printCard: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.gray400,
    ...theme.shadows.none,
  },
});
