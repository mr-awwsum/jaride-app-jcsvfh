
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  ScrollView,
  Alert,
  Switch
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const userInfo = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1876-555-0123",
    rating: 4.9,
    totalRides: 127,
    memberSince: "March 2023"
  };

  const menuItems = [
    {
      id: "ride-history",
      title: "Ride History",
      icon: "clock",
      route: "/ride-history"
    },
    {
      id: "payment",
      title: "Payment Methods",
      icon: "creditcard",
      route: "/payment-methods"
    },
    {
      id: "saved-places",
      title: "Saved Places",
      icon: "heart",
      route: "/saved-places"
    },
    {
      id: "help",
      title: "Help & Support",
      icon: "questionmark.circle",
      route: "/help"
    },
    {
      id: "settings",
      title: "Settings",
      icon: "gear",
      route: "/settings"
    }
  ];

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Signed Out', 'You have been signed out successfully.', [
              { text: 'OK', onPress: () => router.replace('/auth') }
            ]);
          }
        }
      ]
    );
  };

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <Pressable
      key={item.id}
      style={styles.menuItem}
      onPress={() => router.push(item.route as any)}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <IconSymbol name={item.icon as any} color={colors.primary} size={20} />
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profile",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={styles.headerButton}
            >
              <IconSymbol name="chevron.left" color={colors.background} size={24} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={commonStyles.wrapper} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {userInfo.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userInfo.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userInfo.totalRides}</Text>
              <Text style={styles.statLabel}>Rides</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2024</Text>
              <Text style={styles.statLabel}>Member</Text>
            </View>
          </View>
        </View>

        {/* Quick Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <IconSymbol name="bell" color={colors.primary} size={20} />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <IconSymbol name="location" color={colors.primary} size={20} />
              <Text style={styles.settingText}>Location Services</Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.background}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety</Text>
          <Pressable style={styles.emergencyButton}>
            <IconSymbol name="exclamationmark.triangle.fill" color={colors.error} size={20} />
            <Text style={styles.emergencyText}>Emergency Contact: 119</Text>
          </Pressable>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <Button
            onPress={handleLogout}
            variant="outline"
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          >
            Sign Out
          </Button>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Jamaica Ride v1.0.0</Text>
          <Text style={styles.appInfoText}>Made with ❤️ in Jamaica</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    backgroundColor: colors.card,
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.background,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
  },
  section: {
    backgroundColor: colors.card,
    marginBottom: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 16,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.backgroundAlt,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  emergencyText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '600',
    marginLeft: 12,
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  logoutButton: {
    borderColor: colors.error,
    borderRadius: 12,
    paddingVertical: 16,
  },
  logoutButtonText: {
    color: colors.error,
  },
  appInfo: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  appInfoText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  headerButton: {
    padding: 8,
  },
});
