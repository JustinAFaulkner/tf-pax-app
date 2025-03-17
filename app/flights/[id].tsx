import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router, Link } from 'expo-router';
import { Plane, Calendar, Clock, MapPin, Users, CreditCard, ChevronDown, ChevronUp, Luggage, UtensilsCrossed, Award, ArrowRight, CircleCheck as CheckCircle2, X } from 'lucide-react-native';
import { format } from 'date-fns';
import { useState } from 'react';
import { BOOKINGS, getBaggageStatusText } from '@/data/flights';
import { useTheme } from '@/context/ThemeContext';

export default function BookingDetails() {
  const { id } = useLocalSearchParams();
  const booking = BOOKINGS[id as keyof typeof BOOKINGS];
  const [expandedPassenger, setExpandedPassenger] = useState<string | null>(null);
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
    backButton: {
      marginBottom: 16,
    },
    backButtonText: {
      color: colors.accent,
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    title: {
      fontSize: 24,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    bookingRef: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginTop: 4,
    },
    errorText: {
      fontSize: 16,
      color: colors.status.error,
      textAlign: 'center',
      marginTop: 24,
    },
    card: {
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
    section: {
      margin: 16,
      marginTop: 8,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
    passengerCard: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    passengerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    passengerName: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    checkedInBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.background,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    checkedInText: {
      fontSize: 12,
      color: colors.status.success,
      fontFamily: 'Inter-SemiBold',
    },
    checkInButton: {
      backgroundColor: colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
    },
    checkInButtonText: {
      fontSize: 12,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    seatNumber: {
      fontSize: 16,
      color: colors.accent,
      fontFamily: 'Inter-SemiBold',
    },
    expandedContent: {
      marginTop: 16,
      gap: 12,
    },
    actionButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.background,
      padding: 12,
      borderRadius: 8,
    },
    actionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    actionTitle: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    actionSubtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    secondaryInfo: {
      backgroundColor: colors.background,
      padding: 12,
      borderRadius: 8,
      gap: 8,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    fareInfo: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginTop: 4,
    },
    paymentCard: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    paymentLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    paymentValue: {
      fontSize: 14,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
  });

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Booking not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.bookingRef}>Ref: {booking.bookingReference}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.flightHeader}>
          <Text style={styles.flightNumber}>Flight {booking.flightNumber}</Text>
          <Text style={[styles.status, { color: booking.status === 'On Time' ? colors.status.success : colors.text.secondary }]}>
            {booking.status}
          </Text>
        </View>

        <View style={styles.route}>
          <View style={styles.routePoint}>
            <Text style={styles.city}>{booking.from}</Text>
          </View>
          <View style={styles.routeLine}>
            <Plane size={20} color={colors.text.secondary} />
          </View>
          <View style={styles.routePoint}>
            <Text style={styles.city}>{booking.to}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{format(booking.date, 'MMM d, yyyy')}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{format(booking.date, 'h:mm a')}</Text>
          </View>
          <View style={styles.detailItem}>
            <MapPin size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>Gate {booking.gate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Users size={20} color={colors.text.primary} />
          <Text style={styles.sectionTitle}>Passengers</Text>
        </View>
        {booking.passengers.map((passenger, index) => (
          <Pressable
            key={index}
            style={styles.passengerCard}
            onPress={() => setExpandedPassenger(
              expandedPassenger === passenger.name ? null : passenger.name
            )}
          >
            <View style={styles.passengerHeader}>
              <Text style={styles.passengerName}>{passenger.name}</Text>
              <View style={styles.headerRight}>
                {passenger.checkedIn ? (
                  <View style={styles.checkedInBadge}>
                    <CheckCircle2 size={16} color={colors.status.success} />
                    <Text style={styles.checkedInText}>Checked In</Text>
                  </View>
                ) : (
                  <Link
                    href={{
                      pathname: "/flights/check-in/[bookingId]",
                      params: { bookingId: booking.id }
                    }}
                    asChild
                  >
                    <Pressable style={styles.checkInButton}>
                      <Text style={styles.checkInButtonText}>Check In</Text>
                    </Pressable>
                  </Link>
                )}
                <Text style={styles.seatNumber}>{passenger.seat}</Text>
                {expandedPassenger === passenger.name ? (
                  <ChevronUp size={20} color={colors.text.secondary} />
                ) : (
                  <ChevronDown size={20} color={colors.text.secondary} />
                )}
              </View>
            </View>

            {expandedPassenger === passenger.name && (
              <View style={styles.expandedContent}>
                <Pressable style={styles.actionButton}>
                  <View style={styles.actionLeft}>
                    <MapPin size={20} color={colors.accent} />
                    <View>
                      <Text style={styles.actionTitle}>Seat {passenger.seat}</Text>
                      <Text style={styles.actionSubtitle}>Change seat selection</Text>
                    </View>
                  </View>
                  <ArrowRight size={20} color={colors.text.secondary} />
                </Pressable>

                <Link
                  href={{
                    pathname: "/flights/baggage/[passengerId]",
                    params: { 
                      passengerId: `${booking.id}-${passenger.name}`,
                      flightNumber: booking.flightNumber
                    }
                  }}
                  asChild
                >
                  <Pressable style={styles.actionButton}>
                    <View style={styles.actionLeft}>
                      <Luggage size={20} color={colors.accent} />
                      <View>
                        <Text style={styles.actionTitle}>
                          {passenger.baggage.count} {passenger.baggage.count === 1 ? 'bag' : 'bags'}
                        </Text>
                        <Text style={styles.actionSubtitle}>
                          {passenger.checkedIn ? 'View baggage status' : 'Add checked baggage'}
                        </Text>
                      </View>
                    </View>
                    <ArrowRight size={20} color={colors.text.secondary} />
                  </Pressable>
                </Link>

                <View style={styles.secondaryInfo}>
                  <View style={styles.infoRow}>
                    <UtensilsCrossed size={16} color={colors.text.secondary} />
                    <Text style={styles.infoText}>{passenger.meal}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Award size={16} color={colors.text.secondary} />
                    <Text style={styles.infoText}>Frequent Flyer: {passenger.frequentFlyerStatus}</Text>
                  </View>
                  <Text style={styles.fareInfo}>Fare: {passenger.fareType}</Text>
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <CreditCard size={20} color={colors.text.primary} />
          <Text style={styles.sectionTitle}>Payment Details</Text>
        </View>
        <View style={styles.paymentCard}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Amount Paid</Text>
            <Text style={styles.paymentValue}>${booking.payment.amount}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentValue}>{booking.payment.method}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Date</Text>
            <Text style={styles.paymentValue}>{format(booking.payment.date, 'MMM d, yyyy')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}