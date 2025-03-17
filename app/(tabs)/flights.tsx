import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Plane, Calendar, Clock, MapPin } from 'lucide-react-native';
import { format } from 'date-fns';
import { Link } from 'expo-router';
import { BOOKINGS } from '@/data/flights';
import { useTheme } from '@/context/ThemeContext';

export default function FlightsScreen() {
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
    flightCard: {
      backgroundColor: colors.border,
      margin: 16,
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 2,
    },
    flightHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    flightNumber: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    status: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
    route: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    routePoint: {
      flex: 1,
    },
    routeLine: {
      width: 40,
      alignItems: 'center',
    },
    city: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
    details: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailText: {
      marginLeft: 8,
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    duration: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    durationText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Flights</Text>
      </View>

      {Object.values(BOOKINGS).map((flight) => (
        <Link key={flight.id} href={`/flights/${flight.id}`} asChild>
          <Pressable style={styles.flightCard}>
            <View style={styles.flightHeader}>
              <Text style={styles.flightNumber}>Flight {flight.flightNumber}</Text>
              <Text style={[styles.status, { color: flight.status === 'On Time' ? colors.status.success : colors.text.secondary }]}>
                {flight.status}
              </Text>
            </View>

            <View style={styles.route}>
              <View style={styles.routePoint}>
                <Text style={styles.city}>{flight.from}</Text>
              </View>
              <View style={styles.routeLine}>
                <Plane size={20} color={colors.text.secondary} />
              </View>
              <View style={styles.routePoint}>
                <Text style={styles.city}>{flight.to}</Text>
              </View>
            </View>

            <View style={styles.details}>
              <View style={styles.detailItem}>
                <Calendar size={16} color={colors.text.secondary} />
                <Text style={styles.detailText}>{format(flight.date, 'MMM d, yyyy')}</Text>
              </View>
              <View style={styles.detailItem}>
                <Clock size={16} color={colors.text.secondary} />
                <Text style={styles.detailText}>{format(flight.date, 'h:mm a')}</Text>
              </View>
              <View style={styles.detailItem}>
                <MapPin size={16} color={colors.text.secondary} />
                <Text style={styles.detailText}>Gate {flight.gate}</Text>
              </View>
            </View>

            <View style={styles.duration}>
              <Text style={styles.durationText}>Duration: {flight.duration}</Text>
            </View>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}