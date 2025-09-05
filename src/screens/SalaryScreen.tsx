import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { theme } from '../theme';

export default function SalaryScreen() {
  // Mock salary data
  const salaryData = {
    baseSalary: 40000,
    plannedWorkingDays: 26, // Excludes Sundays
    perDayRate: 1538, // Base / Planned Days
    runningSalary: 36923, // MTD calculation
    deductions: {
      absences: 3,
      absenceAmount: 4615, // 3 × Per-Day Rate
      halfDays: 2,
      halfDayAmount: 1538, // 2 × 0.5 × Per-Day Rate
      lateArrivals: [
        { date: '12 Aug', hours: 1, amount: 192 }, // Late by 1h
        { date: '15 Aug', hours: 0.5, amount: 96 }, // Late by 30min
      ],
    },
    additions: {
      overtime: 0,
      petrolAllowance: 2000,
    },
  };

  const totalDeductions = salaryData.deductions.absenceAmount + 
                         salaryData.deductions.halfDayAmount + 
                         salaryData.deductions.lateArrivals.reduce((sum, item) => sum + item.amount, 0);

  const totalAdditions = salaryData.additions.overtime + salaryData.additions.petrolAllowance;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Salary</Text>
          <Text style={styles.subtitle}>
            Salary is calculated from Admin-marked attendance. Sundays are OFF.
          </Text>
        </View>

        {/* Salary Snapshot Card */}
        <View style={styles.salaryCard}>
          <Text style={styles.cardTitle}>Salary Snapshot (This Month)</Text>
          
          <View style={styles.salaryRow}>
            <Text style={styles.salaryLabel}>Worker Name</Text>
            <Text style={styles.salaryValue}>John Doe</Text>
          </View>
          
          <View style={styles.salaryRow}>
            <Text style={styles.salaryLabel}>Month</Text>
            <Text style={styles.salaryValue}>September 2025</Text>
          </View>
          
          <View style={styles.salaryRow}>
            <Text style={styles.salaryLabel}>Base Salary</Text>
            <Text style={styles.salaryValue}>PKR {salaryData.baseSalary.toLocaleString()}</Text>
          </View>
          
          <View style={styles.salaryRow}>
            <Text style={styles.salaryLabel}>Planned Working Days</Text>
            <Text style={styles.salaryValue}>{salaryData.plannedWorkingDays} days</Text>
          </View>
          
          <View style={styles.salaryRow}>
            <Text style={styles.salaryLabel}>Per-Day Rate</Text>
            <Text style={styles.salaryValue}>PKR {salaryData.perDayRate}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.salaryRow}>
            <Text style={styles.runningSalaryLabel}>Running Salary (MTD)</Text>
            <Text style={styles.runningSalaryValue}>PKR {salaryData.runningSalary.toLocaleString()}</Text>
          </View>
        </View>

        {/* Adjustments Card */}
        <View style={styles.adjustmentsCard}>
          <Text style={styles.cardTitle}>Adjustments (Read-Only)</Text>
          
          {/* Deductions */}
          <View style={styles.adjustmentSection}>
            <Text style={styles.adjustmentSectionTitle}>Deductions</Text>
            
            <View style={styles.adjustmentRow}>
              <Text style={styles.adjustmentLabel}>Absences ({salaryData.deductions.absences} days)</Text>
              <Text style={styles.deductionValue}>-PKR {salaryData.deductions.absenceAmount.toLocaleString()}</Text>
            </View>
            
            <View style={styles.adjustmentRow}>
              <Text style={styles.adjustmentLabel}>Half-days ({salaryData.deductions.halfDays} days)</Text>
              <Text style={styles.deductionValue}>-PKR {salaryData.deductions.halfDayAmount.toLocaleString()}</Text>
            </View>
            
            {salaryData.deductions.lateArrivals.map((item, index) => (
              <View key={index} style={styles.adjustmentRow}>
                <Text style={styles.adjustmentLabel}>{item.date} — Late by {item.hours}h → Rs. {item.amount} deduction</Text>
                <Text style={styles.deductionValue}>-PKR {item.amount}</Text>
              </View>
            ))}
            
            <View style={styles.adjustmentRow}>
              <Text style={styles.totalDeductionLabel}>Total Deductions</Text>
              <Text style={styles.totalDeductionValue}>-PKR {totalDeductions.toLocaleString()}</Text>
            </View>
          </View>

          {/* Additions */}
          <View style={styles.adjustmentSection}>
            <Text style={styles.adjustmentSectionTitle}>Additions</Text>
            
            <View style={styles.adjustmentRow}>
              <Text style={styles.adjustmentLabel}>Overtime</Text>
              <Text style={styles.additionValue}>+PKR {salaryData.additions.overtime.toLocaleString()}</Text>
            </View>
            
            <View style={styles.adjustmentRow}>
              <Text style={styles.adjustmentLabel}>Petrol Allowance</Text>
              <Text style={styles.additionValue}>+PKR {salaryData.additions.petrolAllowance.toLocaleString()}</Text>
            </View>
            
            <View style={styles.adjustmentRow}>
              <Text style={styles.totalAdditionLabel}>Total Additions</Text>
              <Text style={styles.totalAdditionValue}>+PKR {totalAdditions.toLocaleString()}</Text>
            </View>
          </View>
          
          <View style={styles.adjustmentFooter}>
            <Text style={styles.adjustmentFooterText}>Illustrative values. Final payroll is managed by Admin.</Text>
          </View>
        </View>

        {/* Policy Highlights Card */}
        <View style={styles.policyCard}>
          <Text style={styles.cardTitle}>Policy Highlights</Text>
          
          <View style={styles.policyItem}>
            <Text style={styles.policyIcon}>📅</Text>
            <View style={styles.policyContent}>
              <Text style={styles.policyTitle}>Sunday OFF</Text>
              <Text style={styles.policyDescription}>No deduction for Sundays (policy day off)</Text>
            </View>
          </View>
          
          <View style={styles.policyItem}>
            <Text style={styles.policyIcon}>💰</Text>
            <View style={styles.policyContent}>
              <Text style={styles.policyTitle}>Base Salary</Text>
              <Text style={styles.policyDescription}>Each worker can have a different base salary</Text>
            </View>
          </View>
          
          <View style={styles.policyItem}>
            <Text style={styles.policyIcon}>⏰</Text>
            <View style={styles.policyContent}>
              <Text style={styles.policyTitle}>Late Arrival</Text>
              <Text style={styles.policyDescription}>Proportional hourly deduction for late arrivals</Text>
            </View>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Text style={styles.disclaimerText}>
            All values are illustrative; final payroll is managed by Admin.
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
    lineHeight: theme.typography.lineHeight.base,
  },

  // Salary Card
  salaryCard: {
    backgroundColor: theme.colors.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  cardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  salaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  salaryLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  salaryValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray200,
    marginVertical: theme.spacing.md,
  },
  runningSalaryLabel: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  runningSalaryValue: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700' as const,
    color: theme.colors.success,
  },

  // Adjustments Card
  adjustmentsCard: {
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  adjustmentSection: {
    marginBottom: theme.spacing.lg,
  },
  adjustmentSectionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  adjustmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  adjustmentLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  deductionValue: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.error,
  },
  additionValue: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.success,
  },
  totalDeductionLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  totalDeductionValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700' as const,
    color: theme.colors.error,
  },
  totalAdditionLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  totalAdditionValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '700' as const,
    color: theme.colors.success,
  },
  adjustmentFooter: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray200,
  },
  adjustmentFooterText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Policy Card
  policyCard: {
    backgroundColor: theme.colors.background,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  policyIcon: {
    fontSize: theme.typography.fontSize.xl,
    marginRight: theme.spacing.md,
    width: 32,
  },
  policyContent: {
    flex: 1,
  },
  policyTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  policyDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.sm,
  },

  // Disclaimer
  disclaimerCard: {
    backgroundColor: theme.colors.gray100,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  disclaimerText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: theme.typography.lineHeight.sm,
  },
});