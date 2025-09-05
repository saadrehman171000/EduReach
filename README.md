# EduReach - React Native App

A modern React Native application built with Expo for educational outreach management.

## 🚀 Features

- **Modern UI Design**: Clean, professional interface with consistent theming
- **Navigation**: Stack-based navigation using React Navigation
- **Responsive Design**: Optimized for both iOS and Android devices
- **TypeScript**: Full TypeScript support for better development experience

## 📱 Screens

- **Login**: User authentication screen
- **Home**: Dashboard with quick actions and recent activity
- **Attendance**: Track daily attendance with statistics
- **Salary**: View salary details and history
- **Visits**: Manage school visits and schedules
- **Orders**: Track school orders and deliveries
- **Profile**: User profile and settings

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card.tsx        # Card component with theming
│   └── index.ts        # Component exports
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx # Main navigation setup
├── screens/            # Screen components
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── AttendanceScreen.tsx
│   ├── SalaryScreen.tsx
│   ├── VisitsScreen.tsx
│   ├── OrdersScreen.tsx
│   └── ProfileScreen.tsx
└── theme/              # Global theme configuration
    └── index.ts        # Colors, typography, spacing, shadows
```

## 🎨 Theme System

The app uses a comprehensive theme system with:

- **Colors**: Primary, secondary, accent colors with neutral grays
- **Typography**: Consistent font sizes, weights, and line heights
- **Spacing**: Standardized spacing scale
- **Shadows**: Platform-appropriate shadow styles
- **Border Radius**: Consistent rounded corners

## 🛠️ Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Run on specific platforms:
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

## 📦 Dependencies

- **React Navigation**: Navigation library
- **Expo**: Development platform
- **TypeScript**: Type safety
- **Zustand**: State management (ready for use)
- **Zod**: Schema validation (ready for use)

## 🎯 Design Principles

- **Consistency**: Unified design language across all screens
- **Accessibility**: Proper contrast ratios and touch targets
- **Performance**: Optimized components and navigation
- **Maintainability**: Clean code structure and TypeScript types

## 📱 Platform Support

- ✅ iOS
- ✅ Android  
- ✅ Web

The app is designed to work seamlessly across all platforms with platform-specific optimizations.
