import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../theme';

// Import worker screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import SalaryScreen from '../screens/SalaryScreen';
import VisitsScreen from '../screens/VisitsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OdometerScreen from '../screens/OdometerScreen';
import GpsLogsScreen from '../screens/GpsLogsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import admin screens
import AdminLoginScreen from '../admin/screens/AdminLoginScreen';
import AdminDashboardScreen from '../admin/screens/AdminDashboardScreen';
import WorkersListScreen from '../admin/screens/WorkersListScreen';
import WorkerDetailScreen from '../admin/screens/WorkerDetailScreen';
import MapScreen from '../admin/screens/MapScreen';
import ReportsScreen from '../admin/screens/ReportsScreen';

export type RootStackParamList = {
  // Worker Flow
  Login: undefined;
  Home: undefined;
  Attendance: undefined;
  Salary: undefined;
  Visits: undefined;
  Orders: undefined;
  Odometer: undefined;
  GpsLogs: undefined;
  Profile: undefined;
  // Admin Flow
  AdminLogin: undefined;
  AdminDashboard: undefined;
  WorkersList: undefined;
  WorkerDetail: undefined;
  Map: undefined;
  Reports: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.textPrimary,
          headerTitleStyle: {
            fontWeight: theme.typography.fontWeight.semiBold,
            fontSize: theme.typography.fontSize.lg,
          },
          headerShadowVisible: true,
          contentStyle: {
            backgroundColor: theme.colors.backgroundSecondary,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'EduReach',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Attendance"
          component={AttendanceScreen}
          options={{
            title: 'Attendance',
          }}
        />
        <Stack.Screen
          name="Salary"
          component={SalaryScreen}
          options={{
            title: 'Salary',
          }}
        />
        <Stack.Screen
          name="Visits"
          component={VisitsScreen}
          options={{
            title: 'School Visits',
          }}
        />
        <Stack.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            title: 'Orders',
          }}
        />
        <Stack.Screen
          name="Odometer"
          component={OdometerScreen}
          options={{
            title: 'Odometer & Proofs',
          }}
        />
        <Stack.Screen
          name="GpsLogs"
          component={GpsLogsScreen}
          options={{
            title: 'Location Logs',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
          }}
        />
        
        {/* Admin Flow Screens */}
        <Stack.Screen
          name="AdminLogin"
          component={AdminLoginScreen}
          options={{
            title: 'Admin Login',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{
            title: 'Admin Dashboard',
          }}
        />
        <Stack.Screen
          name="WorkersList"
          component={WorkersListScreen}
          options={{
            title: 'Workers List',
          }}
        />
        <Stack.Screen
          name="WorkerDetail"
          component={WorkerDetailScreen}
          options={{
            title: 'Worker Details',
          }}
        />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: 'Live Map',
          }}
        />
        <Stack.Screen
          name="Reports"
          component={ReportsScreen}
          options={{
            title: 'Reports',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
