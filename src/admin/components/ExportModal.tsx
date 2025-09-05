import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { theme } from '../../theme';
import AdminModal from './AdminModal';

interface ExportModalProps {
  visible: boolean;
  onClose: () => void;
  onExport?: (config: ExportConfig) => void;
}

interface ExportConfig {
  reportType: string;
  month: string;
  scope: string;
  format: string;
  includeColumns: string[];
}

export default function ExportModal({ visible, onClose, onExport }: ExportModalProps) {
  const [reportType, setReportType] = useState('Attendance');
  const [month, setMonth] = useState('September 2024');
  const [scope, setScope] = useState('All Workers');
  const [format, setFormat] = useState('CSV');
  const [includeColumns, setIncludeColumns] = useState(['Worker', 'Present', 'Absent', 'Half-day', 'Leave']);

  const reportTypes = ['Attendance', 'Salary', 'Distance', 'Orders'];
  const scopes = ['All Workers', 'Specific Team', 'Specific Worker'];
  const formats = ['CSV', 'PDF', 'Print'];
  const availableColumns = {
    'Attendance': ['Worker', 'Present', 'Absent', 'Half-day', 'Leave', 'Salary MTD'],
    'Salary': ['Worker', 'Base Salary', 'Adjustments', 'Net Salary'],
    'Distance': ['Worker', 'Total KMs', 'Avg KMs/day', 'Fuel Cost'],
    'Orders': ['Worker', 'School', 'Qty', 'Payment Type', 'Status'],
  };

  const Dropdown = ({ options, selected, onSelect, placeholder }: {
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

  const Checkbox = ({ label, checked, onToggle }: {
    label: string;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onToggle}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Text style={styles.checkboxIcon}>✓</Text>}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const handleExport = () => {
    const config: ExportConfig = {
      reportType,
      month,
      scope,
      format,
      includeColumns,
    };
    onExport?.(config);
    onClose();
  };

  const handleGeneratePreview = () => {
    // Mock preview generation
    console.log('Generating preview for:', { reportType, month, scope });
  };

  const footerActions = (
    <View style={styles.footerActions}>
      <TouchableOpacity style={styles.previewButton} onPress={handleGeneratePreview}>
        <Text style={styles.previewButtonText}>Generate Preview</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
        <Text style={styles.exportButtonText}>Export</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <AdminModal
      visible={visible}
      onClose={onClose}
      title="Export Report"
      subtitle="Configure export settings and generate your report"
      footerActions={footerActions}
    >
      {/* Report Type */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Report Type</Text>
        <View style={styles.optionsRow}>
          {reportTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[styles.optionButton, reportType === type && styles.optionButtonActive]}
              onPress={() => setReportType(type)}
            >
              <Text style={[styles.optionButtonText, reportType === type && styles.optionButtonTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Month Selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Month</Text>
        <View style={styles.monthSelector}>
          <TouchableOpacity style={styles.monthButton}>
            <Text style={styles.monthButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthLabel}>{month}</Text>
          <TouchableOpacity style={styles.monthButton}>
            <Text style={styles.monthButtonText}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scope */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scope</Text>
        <Dropdown
          options={scopes}
          selected={scope}
          onSelect={setScope}
          placeholder="Select scope"
        />
      </View>

      {/* Format */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Format</Text>
        <View style={styles.optionsRow}>
          {formats.map((fmt) => (
            <TouchableOpacity
              key={fmt}
              style={[styles.optionButton, format === fmt && styles.optionButtonActive]}
              onPress={() => setFormat(fmt)}
            >
              <Text style={[styles.optionButtonText, format === fmt && styles.optionButtonTextActive]}>
                {fmt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Include Columns */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Include Columns</Text>
        <Text style={styles.helperText}>Select which columns to include in the export</Text>
        {(availableColumns[reportType as keyof typeof availableColumns] || []).map((column) => (
          <Checkbox
            key={column}
            label={column}
            checked={includeColumns.includes(column)}
            onToggle={() => {
              if (includeColumns.includes(column)) {
                setIncludeColumns(includeColumns.filter(c => c !== column));
              } else {
                setIncludeColumns([...includeColumns, column]);
              }
            }}
          />
        ))}
      </View>

      {/* Helper Note */}
      <View style={styles.noteSection}>
        <Text style={styles.noteText}>
          Export is a mock action in UI-only mode.
        </Text>
      </View>
    </AdminModal>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  optionButton: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gray100,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  optionButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },
  optionButtonTextActive: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.sm,
  },
  monthButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  monthButtonText: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.textPrimary,
    fontWeight: '600' as const,
  },
  monthLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  dropdown: {
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
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
  },
  dropdownIcon: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  helperText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkboxIcon: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
  checkboxLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  noteSection: {
    backgroundColor: theme.colors.warning + '20',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.warning,
  },
  noteText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.warning,
    fontStyle: 'italic',
  },
  footerActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  previewButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray300,
  },
  previewButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },
  exportButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  exportButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },
});
