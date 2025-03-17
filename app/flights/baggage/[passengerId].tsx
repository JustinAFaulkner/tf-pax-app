import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Package, ArrowLeft, Plane, Clock, Scale } from 'lucide-react-native';
import { format } from 'date-fns';
import { BOOKINGS, getBaggageStatusText } from '@/data/flights';
import { CONTACT, BAGGAGE_PRICING } from '@/data/constants';
import { useTheme } from '@/context/ThemeContext';

export default function BaggageDetails() {
  const { passengerId, flightNumber } = useLocalSearchParams();
  const [bookingId, passengerName] = (passengerId as string).split('-');
  const booking = BOOKINGS[bookingId as keyof typeof BOOKINGS];
  const passenger = booking?.passengers.find(p => p.name === passengerName);
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
    title: {
      fontSize: 24,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginTop: 4,
    },
    flightInfo: {
      backgroundColor: colors.border,
      margin: 16,
      padding: 16,
      borderRadius: 12,
    },
    route: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      marginBottom: 8,
    },
    airport: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    date: {
      textAlign: 'center',
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    section: {
      margin: 16,
    },
    sectionTitle: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 16,
    },
    bagCard: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    bagHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    bagId: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      color: colors.text.primary,
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 'auto',
    },
    bagDetails: {
      gap: 12,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    detailText: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    tagInfo: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    tagLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 4,
    },
    tagNumber: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    contactSection: {
      margin: 16,
      backgroundColor: colors.border,
      padding: 16,
      borderRadius: 12,
    },
    contactTitle: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 8,
    },
    contactText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 12,
    },
    contactPhone: {
      fontSize: 20,
      color: colors.accent,
      fontFamily: 'Inter-Bold',
    },
    purchaseSection: {
      margin: 16,
    },
    purchaseTitle: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginBottom: 8,
    },
    purchaseDescription: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 24,
    },
    pricingCard: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    priceTitle: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 8,
    },
    price: {
      fontSize: 32,
      color: colors.accent,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
    },
    priceDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 16,
    },
    addButton: {
      backgroundColor: colors.accent,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    addButtonText: {
      color: colors.text.primary,
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    errorText: {
      fontSize: 16,
      color: colors.status.error,
      textAlign: 'center',
      marginTop: 24,
    },
  });

  if (!booking || !passenger) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Baggage information not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.accent} />
        </Pressable>
        <Text style={styles.title}>Baggage Details</Text>
        <Text style={styles.subtitle}>Flight {flightNumber}</Text>
      </View>

      <View style={styles.flightInfo}>
        <View style={styles.route}>
          <Text style={styles.airport}>{booking.from}</Text>
          <Plane size={20} color={colors.text.secondary} />
          <Text style={styles.airport}>{booking.to}</Text>
        </View>
        <Text style={styles.date}>{format(booking.date, 'MMM d, yyyy')}</Text>
      </View>

      {passenger.checkedIn ? (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Checked Baggage</Text>
            {passenger.baggage.bags?.map((bag, index) => (
              <View key={index} style={styles.bagCard}>
                <View style={styles.bagHeader}>
                  <Package size={24} color={colors.accent} />
                  <Text style={styles.bagId}>Bag {index + 1}</Text>
                  <Text style={[
                    styles.statusBadge,
                    { backgroundColor: getBaggageStatusText(bag.status).color }
                  ]}>
                    {getBaggageStatusText(bag.status).text}
                  </Text>
                </View>

                <View style={styles.bagDetails}>
                  <View style={styles.detailRow}>
                    <Scale size={20} color={colors.text.secondary} />
                    <Text style={styles.detailText}>Weight: {bag.weight}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Plane size={20} color={colors.text.secondary} />
                    <Text style={styles.detailText}>Route: {bag.routing}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Clock size={20} color={colors.text.secondary} />
                    <Text style={styles.detailText}>
                      Last scan: {format(bag.lastScan, 'MMM d, h:mm a')}
                    </Text>
                  </View>
                </View>

                <View style={styles.tagInfo}>
                  <Text style={styles.tagLabel}>Bag Tag</Text>
                  <Text style={styles.tagNumber}>{bag.tagNumber}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Contact Information</Text>
            <Text style={styles.contactText}>
              If you need assistance with your baggage, please contact our baggage services team:
            </Text>
            <Text style={styles.contactPhone}>{CONTACT.baggageServices}</Text>
          </View>
        </>
      ) : (
        <View style={styles.purchaseSection}>
          <Text style={styles.purchaseTitle}>Add Checked Baggage</Text>
          <Text style={styles.purchaseDescription}>
            Add checked baggage to your journey. Each bag can weigh up to {BAGGAGE_PRICING.firstBag.weight}.
          </Text>
          
          <View style={styles.pricingCard}>
            <Text style={styles.priceTitle}>First Bag</Text>
            <Text style={styles.price}>${BAGGAGE_PRICING.firstBag.price}</Text>
            <Text style={styles.priceDescription}>Up to {BAGGAGE_PRICING.firstBag.weight}</Text>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Booking</Text>
            </Pressable>
          </View>

          <View style={styles.pricingCard}>
            <Text style={styles.priceTitle}>Additional Bag</Text>
            <Text style={styles.price}>${BAGGAGE_PRICING.additionalBag.price}</Text>
            <Text style={styles.priceDescription}>Up to {BAGGAGE_PRICING.additionalBag.weight}</Text>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>Add to Booking</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}