import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Settings, CreditCard, Gift, Phone, Mail, ChevronRight, Sun, Moon, Plane } from 'lucide-react-native';
import { CURRENT_USER } from '@/data/user';
import { useTheme } from '@/context/ThemeContext';
import type { AirlineTheme } from '@/data/constants/theme';

const MENU_ITEMS = [
  {
    icon: CreditCard,
    title: 'Payment Methods',
    subtitle: 'Manage your saved cards',
  },
  {
    icon: Gift,
    title: 'Miles & Benefits',
    subtitle: 'View your rewards',
  },
  {
    icon: Settings,
    title: 'Preferences',
    subtitle: 'Seat, meal, and more',
  },
];

const AIRLINES: { id: AirlineTheme; name: string }[] = [
  { id: 'sounds', name: 'Sounds Air' },
  { id: 'toa', name: 'Tropic Ocean Airways' },
];

export default function ProfileScreen() {
  const { colors, theme, toggleTheme, airline, setAirline } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 24,
      paddingTop: 60,
      backgroundColor: colors.background,
      alignItems: 'center',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    name: {
      fontSize: 24,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
    },
    membershipId: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 24,
    },
    statsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      width: '100%',
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statDivider: {
      width: 1,
      height: 40,
      backgroundColor: colors.text.secondary,
    },
    statValue: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    contactInfo: {
      backgroundColor: colors.border,
      padding: 16,
      marginTop: 24,
    },
    contactItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    contactText: {
      marginLeft: 12,
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    menuContainer: {
      backgroundColor: colors.border,
      marginTop: 24,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemText: {
      marginLeft: 16,
    },
    menuItemTitle: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    menuItemSubtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginTop: 2,
    },
    themeToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.border,
      padding: 16,
      marginTop: 24,
      borderRadius: 12,
    },
    themeIcon: {
      backgroundColor: colors.accent,
      padding: 8,
      borderRadius: 8,
    },
    themeText: {
      flex: 1,
      marginLeft: 16,
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    airlineSelector: {
      backgroundColor: colors.border,
      padding: 16,
      marginTop: 24,
      borderRadius: 12,
    },
    airlineSelectorTitle: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 12,
    },
    airlineOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    airlineOptionActive: {
      backgroundColor: colors.accent,
    },
    airlineOptionText: {
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-Regular',
    },
    logoutButton: {
      margin: 24,
      backgroundColor: colors.status.error,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: colors.text.primary,
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: CURRENT_USER.avatar }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{CURRENT_USER.name}</Text>
        <Text style={styles.membershipId}>Member ID: {CURRENT_USER.membershipId}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{CURRENT_USER.miles.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Miles</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{CURRENT_USER.status}</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Phone size={16} color={colors.text.secondary} />
          <Text style={styles.contactText}>{CURRENT_USER.phone}</Text>
        </View>
        <View style={styles.contactItem}>
          <Mail size={16} color={colors.text.secondary} />
          <Text style={styles.contactText}>{CURRENT_USER.email}</Text>
        </View>
      </View>

      <View style={styles.airlineSelector}>
        <Text style={styles.airlineSelectorTitle}>Select Airline</Text>
        {AIRLINES.map((airlineOption) => (
          <Pressable
            key={airlineOption.id}
            style={[
              styles.airlineOption,
              airline === airlineOption.id && styles.airlineOptionActive,
            ]}
            onPress={() => setAirline(airlineOption.id)}
          >
            <Plane size={20} color={colors.text.primary} />
            <Text style={styles.airlineOptionText}>{airlineOption.name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.themeToggle} onPress={toggleTheme}>
        <View style={styles.themeIcon}>
          {theme === 'light' ? (
            <Moon size={20} color={colors.text.primary} />
          ) : (
            <Sun size={20} color={colors.text.primary} />
          )}
        </View>
        <Text style={styles.themeText}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </Text>
        <ChevronRight size={20} color={colors.text.secondary} />
      </Pressable>

      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item, index) => (
          <Pressable key={index} style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <item.icon size={20} color={colors.text.secondary} />
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.text.secondary} />
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  );
}