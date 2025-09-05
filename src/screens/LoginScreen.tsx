import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryDark, theme.colors.secondary]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoText}>ER</Text>
              </View>
              <Text style={styles.appName}>EduReach</Text>
              <Text style={styles.appTagline}>Education Outreach Platform</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formWrapper}>
              <View style={styles.formContainer}>
                <View style={styles.form}>
                <Text style={styles.welcomeText}>Welcome Back!</Text>

                {/* Email/Phone Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email or Phone</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your email or phone"
                      placeholderTextColor={theme.colors.textTertiary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your password"
                      placeholderTextColor={theme.colors.textTertiary}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>
                </View>

                {/* Login Button */}
                <TouchableOpacity 
                  style={styles.loginButton}
                  onPress={() => (navigation as any).navigate('Home')}
                >
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Links */}
                <View style={styles.linksContainer}>
                  <TouchableOpacity style={styles.linkButton}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity style={styles.contactAdminButton}>
                  <Text style={styles.contactAdminText}>
                    Don't have an account? Contact Admin
                  </Text>
                </TouchableOpacity>
                
                {/* Admin Access Button */}
                <TouchableOpacity 
                  style={styles.adminButton}
                  onPress={() => (navigation as any).navigate('AdminLogin')}
                >
                  <Text style={styles.adminButtonText}>Admin Access</Text>
                </TouchableOpacity>
                </View>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl,
  },
  
  // Logo Section
  logoSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
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
    marginBottom: theme.spacing.sm,
  },
  appTagline: {
    fontSize: theme.typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },

  // Form Section
  formWrapper: {
    width: '100%',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.lg,
    ...theme.shadows.xl,
  },
  form: {
    gap: theme.spacing.md,
  },
  formLogoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  formLogo: {
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  formLogoText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '700' as const,
    color: theme.colors.white,
  },
  welcomeText: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: '700' as const,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitleText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },

  // Input Styles
  inputContainer: {
    gap: theme.spacing.sm,
  },
  inputLabel: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '600' as const,
    color: theme.colors.textPrimary,
  },
  inputWrapper: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.gray200,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textPrimary,
    padding: 0,
  },

  // Button Styles
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    ...theme.shadows.md,
    minHeight: 44,
    justifyContent: 'center',
  },
  loginButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSize.lg,
    fontWeight: '600' as const,
  },

  // Links
  linksContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  linkButton: {
    paddingVertical: theme.spacing.xs,
  },
  linkText: {
    color: theme.colors.primary,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500' as const,
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray200,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: '500' as const,
  },

  // Contact Admin
  contactAdminButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  contactAdminText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.fontSize.sm,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.sm,
  },
  adminButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.warning,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  adminButtonText: {
    color: theme.colors.warning,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500' as const,
  },
});
