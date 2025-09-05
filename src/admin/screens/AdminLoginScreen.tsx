import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';

const { width, height } = Dimensions.get('window');

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Visual feedback only - no real authentication
    console.log('Admin login:', { email, password });
    (navigation as any).navigate('AdminDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>ER</Text>
              </View>
              <Text style={styles.appName}>EduReach</Text>
              <Text style={styles.portalText}>Admin Portal</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              <View style={styles.formCard}>
                <Text style={styles.welcomeText}>Welcome Back, Admin</Text>
                
                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="admin@edureach.com"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry
                  />
                </View>

                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Admin Access Note */}
                <Text style={styles.adminAccessNote}>Admin access only.</Text>

                {/* Back Link */}
                <TouchableOpacity 
                  style={styles.backLink}
                  onPress={() => (navigation as any).navigate('Login')}
                >
                  <Text style={styles.backLinkText}>← Return to Worker Login</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing['2xl'],
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...theme.shadows.sm,
  },
  logoText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.white,
  },
  appName: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: '700' as const,
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  portalText: {
    fontSize: theme.typography.fontSize.lg,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500' as const,
  },

  // Form Section
  formSection: {
    flex: 0.6,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing['2xl'],
    ...theme.shadows.lg,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
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
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.white,
  },
  loginButton: {
    backgroundColor: '#0f3460',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    ...theme.shadows.md,
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
  },
  backLink: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
  },
  backLinkText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    textDecorationLine: 'underline',
  },
  adminAccessNote: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    fontStyle: 'italic',
  },
});
