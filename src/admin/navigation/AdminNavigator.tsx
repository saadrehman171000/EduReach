import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../../theme';

// Import admin screens
import AdminLoginScreen from '../screens/AdminLoginScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import WorkersListScreen from '../screens/WorkersListScreen';
import WorkerDetailScreen from '../screens/WorkerDetailScreen';
import MapScreen from '../screens/MapScreen';
import ReportsScreen from '../screens/ReportsScreen';

export type AdminStackParamList = {
  AdminLogin: undefined;
  AdminDashboard: undefined;
  WorkersList: undefined;
  WorkerDetail: undefined;
  Map: undefined;
  Reports: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AdminLogin"
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
