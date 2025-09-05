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

export default function OrdersScreen() {
  const [formData, setFormData] = useState({
    linkedVisit: '',
    quantity: '',
    paymentType: 'Cash',
    chequeNumber: '',
    chequeDate: '',
    chequeStatus: 'Cleared',
  });

  // Mock linked visits data
  const linkedVisits = [
    { id: 1, schoolName: 'Central School', status: 'Approved' },
    { id: 2, schoolName: 'Downtown Primary', status: 'Approved' },
    { id: 3, schoolName: 'Green Valley School', status: 'Approved' },
  ];

  // Mock order history data
  const orderHistory = [
    {
      id: 1,
      school: 'Central School',
      quantity: 25,
      paymentType: 'Cash',
      status: 'Completed',
      date: '2025-09-15',
    },
    {
      id: 2,
      school: 'Downtown Primary',
      quantity: 15,
      paymentType: 'Cheque',
      status: 'Cleared',
      date: '2025-09-14',
    },
    {
      id: 3,
      school: 'Green Valley School',
      quantity: 30,
      paymentType: 'Pending',
      status: 'Pending',
      date: '2025-09-13',
    },
  ];

  const paymentTypes = ['Cash', 'Cheque', 'Pending'];
  const chequeStatuses = ['Cleared', 'Bounced'];

  const getPaymentTypeColor = (paymentType: string, status?: string) => {
    switch (paymentType) {
      case 'Cash':
        return theme.colors.success;
      case 'Pending':
        return theme.colors.warning;
      case 'Cheque':
        return status === 'Bounced' ? theme.colors.error : theme.colors.info;
      default:
        return theme.colors.textSecondary;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Visual feedback only - no real submission
    console.log('Order saved:', formData);
    // Reset form
    setFormData({
      linkedVisit: '',
      quantity: '',
      paymentType: 'Cash',
      chequeNumber: '',
      chequeDate: '',
      chequeStatus: 'Cleared',
    });
  };

  const showChequeFields = formData.paymentType === 'Cheque';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Add Order</Text>
          <Text style={styles.subtitle}>Log approved school orders</Text>
        </View>

        {/* Form */}
        <View style={styles.formCard}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Linked Visit</Text>
            <View style={styles.visitOptions}>
              {linkedVisits.map((visit) => (
                <TouchableOpacity
                  key={visit.id}
                  style={[
                    styles.visitOption,
                    formData.linkedVisit === visit.schoolName && styles.visitOptionSelected,
                  ]}
                  onPress={() => handleInputChange('linkedVisit', visit.schoolName)}
                >
                  <Text
                    style={[
                      styles.visitOptionText,
                      formData.linkedVisit === visit.schoolName && styles.visitOptionTextSelected,
                    ]}
                  >
                    {visit.schoolName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Quantity</Text>
            <TextInput
              style={styles.textInput}
              value={formData.quantity}
              onChangeText={(value) => handleInputChange('quantity', value)}
              placeholder="Enter quantity"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Payment Type</Text>
            <View style={styles.paymentOptions}>
              {paymentTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.paymentOption,
                    formData.paymentType === type && styles.paymentOptionSelected,
                  ]}
                  onPress={() => handleInputChange('paymentType', type)}
                >
                  <Text
                    style={[
                      styles.paymentOptionText,
                      formData.paymentType === type && styles.paymentOptionTextSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Conditional Cheque Fields */}
          {showChequeFields && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cheque Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={formData.chequeNumber}
                  onChangeText={(value) => handleInputChange('chequeNumber', value)}
                  placeholder="Enter cheque number"
                  placeholderTextColor={theme.colors.textSecondary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cheque Date</Text>
                <TouchableOpacity style={styles.datePickerPlaceholder}>
                  <Text style={styles.datePickerText}>
                    {formData.chequeDate || 'Select cheque date'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cheque Status</Text>
                <View style={styles.chequeStatusOptions}>
                  {chequeStatuses.map((status) => (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.chequeStatusOption,
                        formData.chequeStatus === status && styles.chequeStatusOptionSelected,
                      ]}
                      onPress={() => handleInputChange('chequeStatus', status)}
                    >
                      <Text
                        style={[
                          styles.chequeStatusOptionText,
                          formData.chequeStatus === status && styles.chequeStatusOptionTextSelected,
                        ]}
                      >
                        {status}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Order</Text>
          </TouchableOpacity>
        </View>

        {/* Order History */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Order History</Text>
          {orderHistory.map((order) => (
            <View key={order.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historySchoolName}>{order.school}</Text>
                <View style={[
                  styles.historyPaymentChip, 
                  { backgroundColor: getPaymentTypeColor(order.paymentType, order.status) }
                ]}>
                  <Text style={styles.historyPaymentText}>
                    {order.paymentType} {order.paymentType === 'Cheque' && `(${order.status})`}
                  </Text>
                </View>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyDetailText}>
                  Quantity: {order.quantity}
                </Text>
                <Text style={styles.historyDetailText}>
                  Date: {order.date}
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
  
  // Visit Options
  visitOptions: {
    gap: theme.spacing.sm,
  },
  visitOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.background,
  },
  visitOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  visitOptionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  visitOptionTextSelected: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },

  // Payment Options
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  paymentOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.background,
  },
  paymentOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  paymentOptionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  paymentOptionTextSelected: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },

  // Cheque Fields
  datePickerPlaceholder: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  datePickerText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  chequeStatusOptions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chequeStatusOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.background,
  },
  chequeStatusOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chequeStatusOptionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  chequeStatusOptionTextSelected: {
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
  historyPaymentChip: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
  },
  historyPaymentText: {
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