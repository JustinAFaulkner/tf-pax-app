import { View, Text, ScrollView, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { format } from 'date-fns';
import { MapPin, Calendar, Clock, Plane, ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { AirlineSelector } from '@/components/AirlineSelector';
import { DESTINATIONS, UPCOMING_FLIGHTS } from '@/data/flights';
import { CURRENT_USER } from '@/data/user';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const { colors } = useTheme();
  const [showAirlineSelector, setShowAirlineSelector] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    hero: {
      height: 300,
    },
    heroOverlay: {
      flex: 1,
      backgroundColor: 'rgba(43, 50, 58, 0.85)',
      padding: 4,
      paddingTop: 60,
    },
    headerActions: {
      alignItems: 'center',
      marginBottom: 24,
    },
    settingsButton: {
      width: 40,
      height: 40,
      backgroundColor: colors.border,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeContainer: {
      alignItems: 'center',
    },
    greeting: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    name: {
      fontSize: 24,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginTop: 4,
    },
    statsContainer: {
      flexDirection: 'row',
      margin: 16,
      gap: 16,
      marginTop: -40,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    statValue: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    section: {
      marginTop: 24,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    viewAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    viewAllText: {
      fontSize: 14,
      color: colors.accent,
      fontFamily: 'Inter-SemiBold',
    },
    flightsScrollContent: {
      paddingHorizontal: 16,
      gap: 16,
    },
    flightCard: {
      backgroundColor: colors.border,
      borderRadius: 16,
      padding: 16,
      width: 280,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
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
    flightStatus: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
    },
    flightRoute: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    routePoint: {
      alignItems: 'center',
    },
    routeCity: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 4,
    },
    routeCode: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    routeLine: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    flightDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    detailText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    destinationsScrollContent: {
      paddingHorizontal: 16,
      gap: 16,
      paddingBottom: 24,
    },
    destinationCard: {
      width: 280,
      height: 320,
      borderRadius: 16,
      overflow: 'hidden',
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    destinationImage: {
      width: '100%',
      height: '100%',
    },
    destinationGradient: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%',
      backgroundColor: 'rgba(43, 50, 58, 0.8)',
    },
    destinationContent: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    destinationCity: {
      fontSize: 24,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    destinationCountry: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    destinationLocation: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: 'rgba(43, 50, 58, 0.8)',
      borderRadius: 20,
      padding: 8,
    },
    priceTag: {
      backgroundColor: colors.accent,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    priceText: {
      fontSize: 14,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80' }}
        style={styles.hero}
      >
        <View style={styles.heroOverlay}>
          <View style={styles.headerActions}>
            <Pressable onPress={() => setShowAirlineSelector(true)}>
              <Logo size={180} />
            </Pressable>
          </View>
          <View style={styles.welcomeContainer}>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{CURRENT_USER.name}</Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{CURRENT_USER.miles.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Miles Earned</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{CURRENT_USER.status}</Text>
          <Text style={styles.statLabel}>Member Status</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Flights</Text>
          <Link href="/flights" asChild>
            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ArrowRight size={16} color={colors.accent} />
            </Pressable>
          </Link>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.flightsScrollContent}
        >
          {UPCOMING_FLIGHTS.map((flight) => (
            <Link key={flight.id} href={`/flights/${flight.id}`} asChild>
              <Pressable style={styles.flightCard}>
                <View style={styles.flightHeader}>
                  <Text style={styles.flightNumber}>Flight {flight.flightNumber}</Text>
                  <Text style={[
                    styles.flightStatus,
                    { color: flight.status === 'On Time' ? colors.status.success : colors.text.secondary }
                  ]}>
                    {flight.status}
                  </Text>
                </View>
                <View style={styles.flightRoute}>
                  <View style={styles.routePoint}>
                    <Text style={styles.routeCity}>{flight.from.split(' ')[0]}</Text>
                    <Text style={styles.routeCode}>{flight.from.match(/\((.*?)\)/)?.[1]}</Text>
                  </View>
                  <View style={styles.routeLine}>
                    <Plane size={20} color={colors.accent} />
                  </View>
                  <View style={styles.routePoint}>
                    <Text style={styles.routeCity}>{flight.to.split(' ')[0]}</Text>
                    <Text style={styles.routeCode}>{flight.to.match(/\((.*?)\)/)?.[1]}</Text>
                  </View>
                </View>
                <View style={styles.flightDetails}>
                  <View style={styles.detailItem}>
                    <Calendar size={16} color={colors.text.secondary} />
                    <Text style={styles.detailText}>{format(flight.date, 'MMM d')}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={16} color={colors.text.secondary} />
                    <Text style={styles.detailText}>{format(flight.date, 'h:mm a')}</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <Pressable style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>Explore All</Text>
            <ArrowRight size={16} color={colors.accent} />
          </Pressable>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.destinationsScrollContent}
        >
          {DESTINATIONS.map((destination) => (
            <Pressable
              key={destination.id}
              style={styles.destinationCard}
              onPress={() => {
                router.push({
                  pathname: '/book',
                  params: { destination: destination.city }
                });
              }}
            >
              <Image source={{ uri: destination.image }} style={styles.destinationImage} />
              <View style={styles.destinationGradient} />
              <View style={styles.destinationContent}>
                <View>
                  <Text style={styles.destinationCity}>{destination.city}</Text>
                  <Text style={styles.destinationCountry}>{destination.country}</Text>
                </View>
                <View style={styles.priceTag}>
                  <Text style={styles.priceText}>from ${destination.price}</Text>
                </View>
              </View>
              <View style={styles.destinationLocation}>
                <MapPin size={16} color={colors.text.primary} />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <AirlineSelector
        visible={showAirlineSelector}
        onClose={() => setShowAirlineSelector(false)}
      />
    </ScrollView>
  );
}