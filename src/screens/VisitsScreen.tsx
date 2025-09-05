import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';

export default function VisitsScreen() {
  const [formData, setFormData] = useState({
    schoolName: '',
    publisher: '',
    samples: '',
    status: 'Sample Given',
  });

  // Mock visit history data
  const visitHistory = [
    {
      id: 1,
      schoolName: 'Central School',
      samples: 25,
      status: 'Approved',
      date: '2025-09-15',
    },
    {
      id: 2,
      schoolName: 'Downtown Primary',
      samples: 15,
      status: 'Sample Given',
      date: '2025-09-14',
    },
    {
      id: 3,
      schoolName: 'Green Valley School',
      samples: 30,
      status: 'Rejected',
      date: '2025-09-13',
    },
    {
      id: 4,
      schoolName: 'Sunshine Elementary',
      samples: 20,
      status: 'Returned',
      date: '2025-09-12',
    },
  ];

  const statusOptions = ['Sample Given', 'Approved', 'Rejected', 'Returned'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return theme.colors.success;
      case 'Sample Given':
        return theme.colors.warning;
      case 'Rejected':
        return theme.colors.error;
      case 'Returned':
        return theme.colors.textSecondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Visual feedback only - no real submission
    console.log('Visit saved:', formData);
    // Reset form
    setFormData({
      schoolName: '',
      publisher: '',
      samples: '',
      status: 'Sample Given',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Add Visit</Text>
          <Text style={styles.subtitle}>Log school visits and samples given</Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>School Name</Text>
            <TextInput
              style={styles.textInput}
              value={formData.schoolName}
              onChangeText={(value) => handleInputChange('schoolName', value)}
              placeholder="Enter school name"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Publisher / Series</Text>
            <TextInput
              style={styles.textInput}
              value={formData.publisher}
              onChangeText={(value) => handleInputChange('publisher', value)}
              placeholder="Enter publisher or series"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Number of Samples</Text>
            <TextInput
              style={styles.textInput}
              value={formData.samples}
              onChangeText={(value) => handleInputChange('samples', value)}
              placeholder="Enter number of samples"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Status</Text>
            <View style={styles.statusOptions}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.statusOption,
                    formData.status === option && styles.statusOptionSelected,
                  ]}
                  onPress={() => handleInputChange('status', option)}
                >
                  <Text
                    style={[
                      styles.statusOptionText,
                      formData.status === option && styles.statusOptionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Visit</Text>
          </TouchableOpacity>
        </View>

        {/* Visit History */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Visit History</Text>
          {visitHistory.map((visit) => (
            <View key={visit.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historySchoolName}>{visit.schoolName}</Text>
                <View style={[styles.historyStatusChip, { backgroundColor: getStatusColor(visit.status) }]}>
                  <Text style={styles.historyStatusText}>{visit.status}</Text>
                </View>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyDetailText}>
                  Samples: {visit.samples}
                </Text>
                <Text style={styles.historyDetailText}>
                  Date: {visit.date}
                </Text>
              </View>
            </View>
          ))}
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

  // Form
  formCard: {
    backgroundColor: theme.colors.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
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
    backgroundColor: theme.colors.background,
  },
  statusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  statusOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.background,
  },
  statusOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  statusOptionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  statusOptionTextSelected: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
    ...theme.shadows.sm,
  },
  submitButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
  },

  // History
  historySection: {
    padding: theme.spacing.lg,
  },
  historyTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.lg,
  },
  historyCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  historySchoolName: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  historyStatusChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  historyStatusText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyDetailText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
});