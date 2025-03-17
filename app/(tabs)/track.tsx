import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Search } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function TrackScreen() {
  const [flightNumber, setFlightNumber] = useState('');
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 24,
      paddingTop: 60,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    searchContainer: {
      padding: 16,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.border,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    input: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-Regular',
    },
    searchButton: {
      backgroundColor: colors.accent,
      borderRadius: 8,
      padding: 14,
      alignItems: 'center',
    },
    searchButtonText: {
      color: colors.text.primary,
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    content: {
      padding: 24,
    },
    helpText: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      lineHeight: 24,
      marginBottom: 24,
    },
    exampleContainer: {
      backgroundColor: colors.border,
      padding: 16,
      borderRadius: 8,
    },
    exampleTitle: {
      fontSize: 14,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 8,
    },
    exampleText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Track Flight</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.input}
            placeholder="Enter flight number"
            value={flightNumber}
            onChangeText={setFlightNumber}
            placeholderTextColor={colors.status.neutral}
          />
        </View>
        <Pressable style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.helpText}>
          Enter your flight number to track its current status, estimated arrival time, and more.
        </Text>
        
        <View style={styles.exampleContainer}>
          <Text style={styles.exampleTitle}>Example flight numbers:</Text>
          <Text style={styles.exampleText}>S8266, S8111</Text>
        </View>
      </View>
    </View>
  );
}