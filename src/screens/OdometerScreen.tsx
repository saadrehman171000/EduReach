import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { theme } from '../theme';

export default function OdometerScreen() {
  const [startMeterPhoto, setStartMeterPhoto] = useState(null);
  const [endMeterPhoto, setEndMeterPhoto] = useState(null);
  const [cashReceiptPhoto, setCashReceiptPhoto] = useState(null);
  const [chequePhoto, setChequePhoto] = useState(null);

  const handlePhotoUpload = (type: string) => {
    // Visual feedback only - no real upload
    console.log(`Upload ${type} photo`);
  };

  const PhotoPlaceholder = ({ label }: { label: string }) => (
    <View style={styles.photoPlaceholder}>
      <Text style={styles.photoPlaceholderIcon}>📷</Text>
      <Text style={styles.photoPlaceholderText}>{label}</Text>
    </View>
  );

  const PhotoCard = ({ 
    title, 
    uploadedAt, 
    reading, 
    onUpload, 
    buttonText 
  }: { 
    title: string; 
    uploadedAt: string; 
    reading: string; 
    onUpload: () => void; 
    buttonText: string; 
  }) => (
    <View style={styles.meterCard}>
      <Text style={styles.meterCardTitle}>{title}</Text>
      <View style={styles.meterCardContent}>
        <PhotoPlaceholder label="No photo uploaded" />
        <View style={styles.meterInfo}>
          <Text style={styles.meterInfoText}>Uploaded At — {uploadedAt}</Text>
          <Text style={styles.meterInfoText}>Reading — {reading}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
        <Text style={styles.uploadButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );

  const PaymentProofCard = ({ 
    title, 
    onUpload 
  }: { 
    title: string; 
    onUpload: () => void; 
  }) => (
    <View style={styles.paymentProofCard}>
      <PhotoPlaceholder label="No photo" />
      <Text style={styles.paymentProofTitle}>{title}</Text>
      <TouchableOpacity style={styles.paymentProofButton} onPress={onUpload}>
        <Text style={styles.paymentProofButtonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Odometer & Proofs</Text>
        </View>

        {/* Start Meter Card */}
        <PhotoCard
          title="Start Meter (Today)"
          uploadedAt="--:--"
          reading="----"
          onUpload={() => handlePhotoUpload('start meter')}
          buttonText="Upload Start Meter Photo"
        />

        {/* End Meter Card */}
        <PhotoCard
          title="End Meter (Today)"
          uploadedAt="--:--"
          reading="----"
          onUpload={() => handlePhotoUpload('end meter')}
          buttonText="Upload End Meter Photo"
        />

        {/* Payment Proofs Section */}
        <View style={styles.paymentProofsSection}>
          <Text style={styles.paymentProofsTitle}>Payment Proofs (Optional)</Text>
          <View style={styles.paymentProofsGrid}>
            <PaymentProofCard
              title="Cash Receipt Photo"
              onUpload={() => handlePhotoUpload('cash receipt')}
            />
            <PaymentProofCard
              title="Cheque Photo"
              onUpload={() => handlePhotoUpload('cheque')}
            />
          </View>
        </View>

        {/* Info Note */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Admin validates photos and km calculations. This does not mark attendance.
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
  },

  // Meter Cards
  meterCard: {
    backgroundColor: theme.colors.background,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  meterCardTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  meterCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  photoPlaceholderIcon: {
    fontSize: theme.typography.fontSize.xl,
    marginBottom: theme.spacing.xs,
  },
  photoPlaceholderText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  meterInfo: {
    flex: 1,
  },
  meterInfoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  uploadButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600' as const,
  },

  // Payment Proofs
  paymentProofsSection: {
    padding: theme.spacing.lg,
  },
  paymentProofsTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  paymentProofsGrid: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  paymentProofCard: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  paymentProofTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  paymentProofButton: {
    backgroundColor: theme.colors.gray200,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    width: '100%',
    alignItems: 'center',
  },
  paymentProofButtonText: {
    color: theme.colors.textPrimary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
  },

  // Info Card
  infoCard: {
    backgroundColor: theme.colors.gray100,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  infoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: theme.typography.lineHeight.sm,
  },
});
