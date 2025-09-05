import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme';

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedTheme, setSelectedTheme] = useState('Light');

  const profileData = {
    name: 'John Doe',
    phone: '+92 3150777326',
    workerId: 'WRK001',
    publisher: 'Oxford Publishers',
    city: 'Karachi',
  };

  const languages = ['English', 'Urdu', 'Arabic'];
  const themes = ['Light', 'Dark'];

  const ToggleSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
    <TouchableOpacity style={[styles.toggle, value && styles.toggleActive]} onPress={onToggle}>
      <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
    </TouchableOpacity>
  );

  const PickerButton = ({ 
    options, 
    selectedValue, 
    onSelect, 
    placeholder 
  }: { 
    options: string[]; 
    selectedValue: string; 
    onSelect: (value: string) => void; 
    placeholder: string; 
  }) => (
    <View style={styles.pickerContainer}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.pickerOption,
            selectedValue === option && styles.pickerOptionSelected,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text
            style={[
              styles.pickerOptionText,
              selectedValue === option && styles.pickerOptionTextSelected,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
          </View>
          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileDetails}>{profileData.workerId} • {profileData.phone}</Text>
        </View>

        {/* Personal Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{profileData.name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{profileData.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Publisher/Team</Text>
              <Text style={styles.infoValue}>{profileData.publisher}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>City</Text>
              <Text style={styles.infoValue}>{profileData.city}</Text>
            </View>
          </View>
        </View>

        {/* App Settings Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingDescription}>Receive push notifications</Text>
            </View>
            <ToggleSwitch 
              value={notificationsEnabled} 
              onToggle={() => setNotificationsEnabled(!notificationsEnabled)} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingDescription}>App display language</Text>
            </View>
            <PickerButton
              options={languages}
              selectedValue={selectedLanguage}
              onSelect={setSelectedLanguage}
              placeholder="Select Language"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingLabel}>Theme</Text>
              <Text style={styles.settingDescription}>App appearance</Text>
            </View>
            <PickerButton
              options={themes}
              selectedValue={selectedTheme}
              onSelect={setSelectedTheme}
              placeholder="Select Theme"
            />
          </View>
        </View>

        {/* Privacy & Permissions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy & Permissions</Text>
          
          <View style={styles.permissionItem}>
            <View style={styles.permissionContent}>
              <Text style={styles.permissionLabel}>Location Permission</Text>
              <Text style={styles.permissionStatus}>Granted</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: theme.colors.success }]}>
              <Text style={styles.statusBadgeText}>✓</Text>
            </View>
          </View>

          <View style={styles.permissionItem}>
            <View style={styles.permissionContent}>
              <Text style={styles.permissionLabel}>Camera Permission</Text>
              <Text style={styles.permissionStatus}>Granted</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: theme.colors.success }]}>
              <Text style={styles.statusBadgeText}>✓</Text>
            </View>
          </View>

          <View style={styles.permissionInfo}>
            <Text style={styles.permissionInfoText}>
              Your location is logged automatically every ~15 minutes during duty.
            </Text>
          </View>
        </View>

        {/* Log Out Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
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

  // Header
  header: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  avatarContainer: {
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.white,
  },
  profileName: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  profileDetails: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Cards
  card: {
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

  // Personal Information
  infoList: {
    gap: theme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  infoLabel: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textSecondary,
  },
  infoValue: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
  },

  // App Settings
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  settingDescription: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },

  // Toggle Switch
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.gray300,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },

  // Picker
  pickerContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  pickerOption: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    backgroundColor: theme.colors.background,
  },
  pickerOptionSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  pickerOptionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  pickerOptionTextSelected: {
    color: theme.colors.white,
    fontWeight: '600' as const,
  },

  // Permissions
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray100,
  },
  permissionContent: {
    flex: 1,
  },
  permissionLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500' as const,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  permissionStatus: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadgeText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
  },
  permissionInfo: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
  },
  permissionInfoText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.sm,
  },

  // Logout
  logoutSection: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  logoutButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
  },
});
