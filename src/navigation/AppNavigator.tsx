import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { theme } from '../theme';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import SalaryScreen from '../screens/SalaryScreen';
import VisitsScreen from '../screens/VisitsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OdometerScreen from '../screens/OdometerScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Attendance: undefined;
  Salary: undefined;
  Visits: undefined;
  Orders: undefined;
  Odometer: undefined;
  Profile: undefined;
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
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Profile',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
