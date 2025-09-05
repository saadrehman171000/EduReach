import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { theme } from '../../theme';
import { Card } from '../../components';

export default function SettingsScreen() {
  const [organizationName, setOrganizationName] = useState('EduReach Education');
  const [timezone, setTimezone] = useState('Asia/Karachi');
  const [dutyStartTime, setDutyStartTime] = useState('09:00');
  const [dutyEndTime, setDutyEndTime] = useState('17:00');
  const [halfDayThreshold, setHalfDayThreshold] = useState('240');
  const [graceMinutes, setGraceMinutes] = useState('15');
  const [lateDeductionRule, setLateDeductionRule] = useState('Per-hour');
  const [defaultBaseSalary, setDefaultBaseSalary] = useState('40000');
  const [overtimeRate, setOvertimeRate] = useState('500');
  const [petrolRatePerKm, setPetrolRatePerKm] = useState('25');
  const [geoFenceEnabled, setGeoFenceEnabled] = useState(true);
  const [mapProvider, setMapProvider] = useState('Google');

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

  const Checkbox = ({ label, checked, onToggle, disabled = false }: {
    label: string;
    checked: boolean;
    onToggle: () => void;
    disabled?: boolean;
  }) => (
    <TouchableOpacity 
      style={styles.checkboxRow}
      onPress={disabled ? undefined : onToggle}
      disabled={disabled}
    >
      <View style={[
        styles.checkbox,
        checked && styles.checkboxChecked,
        disabled && styles.checkboxDisabled
      ]}>
        {checked && <Text style={styles.checkboxIcon}>✓</Text>}
      </View>
      <Text style={[styles.checkboxLabel, disabled && styles.checkboxLabelDisabled]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const Toggle = ({ label, enabled, onToggle }: {
    label: string;
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity style={styles.toggleRow} onPress={onToggle}>
      <Text style={styles.toggleLabel}>{label}</Text>
      <View style={[styles.toggle, enabled && styles.toggleEnabled]}>
        <View style={[styles.toggleThumb, enabled && styles.toggleThumbEnabled]} />
      </View>
    </TouchableOpacity>
  );

  const RadioButton = ({ label, selected, onSelect }: {
    label: string;
    selected: boolean;
    onSelect: () => void;
  }) => (
    <TouchableOpacity style={styles.radioRow} onPress={onSelect}>
      <View style={styles.radio}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Admin Settings</Text>
          <Text style={styles.subtitle}>Configure organization policies and preferences</Text>
        </View>

        {/* Organization Settings */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Organization</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Organization Name</Text>
            <TextInput
              style={styles.textInput}
              value={organizationName}
              onChangeText={setOrganizationName}
              placeholder="Enter organization name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Timezone</Text>
            <Dropdown
              options={['Asia/Karachi', 'Asia/Dubai', 'Asia/Kolkata', 'UTC']}
              selected={timezone}
              onSelect={setTimezone}
              placeholder="Select timezone"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Working Days Policy</Text>
            <Checkbox
              label="Sunday OFF (Non-deductible)"
              checked={true}
              onToggle={() => {}}
              disabled={true}
            />
            <Checkbox
              label="Monday"
              checked={true}
              onToggle={() => {}}
            />
            <Checkbox
              label="Tuesday"
              checked={true}
              onToggle={() => {}}
            />
            <Checkbox
              label="Wednesday"
              checked={true}
              onToggle={() => {}}
            />
            <Checkbox
              label="Thursday"
              checked={true}
              onToggle={() => {}}
            />
            <Checkbox
              label="Friday"
              checked={true}
              onToggle={() => {}}
            />
            <Checkbox
              label="Saturday"
              checked={false}
              onToggle={() => {}}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Duty Window</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>Start Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={dutyStartTime}
                  onChangeText={setDutyStartTime}
                  placeholder="09:00"
                />
              </View>
              <View style={styles.timeInput}>
                <Text style={styles.timeLabel}>End Time</Text>
                <TextInput
                  style={styles.textInput}
                  value={dutyEndTime}
                  onChangeText={setDutyEndTime}
                  placeholder="17:00"
                />
              </View>
            </View>
          </View>
        </Card>

        {/* Attendance Policy */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Attendance Policy</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Half-day Threshold (minutes)</Text>
            <TextInput
              style={styles.textInput}
              value={halfDayThreshold}
              onChangeText={setHalfDayThreshold}
              placeholder="240"
              keyboardType="numeric"
            />
            <Text style={styles.helperText}>Workers present for less than this duration are marked as half-day</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Grace Minutes</Text>
            <TextInput
              style={styles.textInput}
              value={graceMinutes}
              onChangeText={setGraceMinutes}
              placeholder="15"
              keyboardType="numeric"
            />
            <Text style={styles.helperText}>Allowable delay before marking as late</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Late Deduction Rule</Text>
            <RadioButton
              label="Per-hour deduction (proportional)"
              selected={lateDeductionRule === 'Per-hour'}
              onSelect={() => setLateDeductionRule('Per-hour')}
            />
            <RadioButton
              label="Fixed step deduction"
              selected={lateDeductionRule === 'Fixed step'}
              onSelect={() => setLateDeductionRule('Fixed step')}
            />
            <Text style={styles.helperText}>How salary is deducted for late arrivals</Text>
          </View>
        </Card>

        {/* Salary Policy */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Salary Policy</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Default Base Salary (PKR)</Text>
            <TextInput
              style={styles.textInput}
              value={defaultBaseSalary}
              onChangeText={setDefaultBaseSalary}
              placeholder="40000"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Per-day Rate (Display Only)</Text>
            <Text style={styles.displayValue}>
              PKR {Math.round(parseInt(defaultBaseSalary) / 26).toLocaleString()}
            </Text>
            <Text style={styles.helperText}>Calculated as Base Salary ÷ 26 working days (excluding Sundays)</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Overtime Rate (PKR/hour)</Text>
            <TextInput
              style={styles.textInput}
              value={overtimeRate}
              onChangeText={setOvertimeRate}
              placeholder="500"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Petrol Rate per KM (PKR)</Text>
            <TextInput
              style={styles.textInput}
              value={petrolRatePerKm}
              onChangeText={setPetrolRatePerKm}
              placeholder="25"
              keyboardType="numeric"
            />
          </View>
        </Card>

        {/* Location Settings */}
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Location Settings</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>GPS Capture Interval</Text>
            <Text style={styles.displayValue}>~15 minutes</Text>
            <Text style={styles.helperText}>Automatic location tracking frequency (read-only)</Text>
          </View>

          <View style={styles.inputGroup}>
            <Toggle
              label="Enable Geo-fencing"
              enabled={geoFenceEnabled}
              onToggle={() => setGeoFenceEnabled(!geoFenceEnabled)}
            />
            <Text style={styles.helperText}>Restrict worker check-ins to designated areas</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Map Provider</Text>
            <Dropdown
              options={['Google', 'Mapbox', 'OpenStreetMap']}
              selected={mapProvider}
              onSelect={setMapProvider}
              placeholder="Select map provider"
            />
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset to Defaults</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All settings are illustrative. No data is saved.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
  sectionCard: {
    margin: theme.spacing.lg,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.md,
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
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
    fontStyle: 'italic',
  },
  displayValue: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    fontWeight: '600' as const,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.md,
  },
  timeRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  timeInput: {
    flex: 1,
  },
  timeLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
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
  checkboxDisabled: {
    backgroundColor: theme.colors.gray100,
    borderColor: theme.colors.gray200,
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
  checkboxLabelDisabled: {
    color: theme.colors.textSecondary,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  toggleLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.gray300,
    justifyContent: 'center',
    padding: 2,
  },
  toggleEnabled: {
    backgroundColor: theme.colors.primary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.white,
    alignSelf: 'flex-start',
  },
  toggleThumbEnabled: {
    alignSelf: 'flex-end',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  radioLabel: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textPrimary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.lg,
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },
  resetButton: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray300,
  },
  resetButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },
  footer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
  },
});
