import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Plane, ArrowRight, Search, X } from 'lucide-react-native';
import { addDays } from 'date-fns';
import { AIRPORTS, Airport } from '@/data/airports';
import { FARE_OPTIONS } from '@/data/fares';
import { DatePicker } from '@/components/DatePicker';
import { useTheme } from '@/context/ThemeContext';

type TripType = 'one-way' | 'round-trip';
type PassengerType = 'adults' | 'children';

interface SearchParams {
  from: Airport | null;
  to: Airport | null;
  tripType: TripType;
  departDate: Date | null;
  returnDate: Date | null;
  passengers: {
    adults: number;
    children: number;
  };
}

export default function BookScreen() {
  const params = useLocalSearchParams();
  const { colors } = useTheme();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: null,
    to: null,
    tripType: 'one-way',
    departDate: null,
    returnDate: null,
    passengers: {
      adults: 1,
      children: 0,
    },
  });

  const [showAirportSearch, setShowAirportSearch] = useState<'from' | 'to' | null>(null);
  const [airportSearchQuery, setAirportSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (params.destination) {
      const destination = AIRPORTS.find(
        airport => airport.city.toLowerCase() === (params.destination as string).toLowerCase()
      );
      if (destination) {
        setSearchParams(prev => ({ ...prev, to: destination }));
      }
    }
  }, [params.destination]);

  const filteredAirports = useMemo(() => {
    if (!airportSearchQuery) return AIRPORTS;
    const query = airportSearchQuery.toLowerCase();
    return AIRPORTS.filter(
      airport =>
        airport.code.toLowerCase().includes(query) ||
        airport.name.toLowerCase().includes(query) ||
        airport.city.toLowerCase().includes(query)
    );
  }, [airportSearchQuery]);

  const handleSearch = () => {
    if (!searchParams.from || !searchParams.to || !searchParams.departDate) return;
    if (searchParams.tripType === 'round-trip' && !searchParams.returnDate) return;
    setShowResults(true);
  };

  const handleSelectAirport = (airport: Airport) => {
    if (showAirportSearch === 'from') {
      setSearchParams(prev => ({ ...prev, from: airport }));
    } else {
      setSearchParams(prev => ({ ...prev, to: airport }));
    }
    setShowAirportSearch(null);
    setAirportSearchQuery('');
  };

  const updatePassengerCount = (type: PassengerType, increment: boolean) => {
    setSearchParams(prev => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: Math.max(
          type === 'adults' ? 1 : 0,
          Math.min(9, prev.passengers[type] + (increment ? 1 : -1))
        ),
      },
    }));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 24,
      paddingTop: 60,
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
    form: {
      padding: 16,
    },
    tripTypeSelector: {
      flexDirection: 'row',
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 4,
      marginBottom: 24,
    },
    tripTypeButton: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 8,
    },
    tripTypeButtonActive: {
      backgroundColor: colors.accent,
    },
    tripTypeText: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-SemiBold',
    },
    tripTypeTextActive: {
      color: colors.text.primary,
    },
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    inputContent: {
      marginLeft: 12,
    },
    inputLabel: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 4,
    },
    inputText: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    inputPlaceholder: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    dateInputs: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 24,
    },
    dateInput: {
      flex: 1,
      marginBottom: 0,
    },
    passengerSection: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 16,
    },
    passengerType: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    passengerTypeTitle: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    passengerTypeSubtitle: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    counter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    counterButton: {
      width: 32,
      height: 32,
      backgroundColor: colors.accent,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterButtonText: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    counterValue: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      minWidth: 24,
      textAlign: 'center',
    },
    searchButton: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    searchButtonDisabled: {
      opacity: 0.5,
    },
    searchButtonText: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    searchHeader: {
      padding: 24,
      paddingTop: 60,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchTitle: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginTop: 16,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.border,
      margin: 16,
      borderRadius: 12,
      padding: 12,
    },
    searchInput: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-Regular',
    },
    airportList: {
      flex: 1,
    },
    airportItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    airportText: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-Regular',
    },
    backButton: {
      marginBottom: 8,
    },
    routeSummary: {
      marginTop: 16,
    },
    routeText: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    routeDetails: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginTop: 4,
    },
    fareOptions: {
      padding: 16,
      gap: 16,
    },
    fareCard: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
    },
    fareHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 16,
    },
    fareName: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    fareDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginTop: 4,
    },
    farePrice: {
      fontSize: 24,
      color: colors.accent,
      fontFamily: 'Inter-Bold',
    },
    fareFeatures: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      paddingTop: 16,
      marginBottom: 16,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    featureIcon: {
      fontSize: 16,
      width: 24,
      textAlign: 'center',
    },
    featureText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      marginLeft: 8,
    },
    selectButton: {
      backgroundColor: colors.accent,
      borderRadius: 8,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    selectButtonText: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
  });

  if (showAirportSearch) {
    return (
      <View style={styles.container}>
        <View style={styles.searchHeader}>
          <Pressable
            onPress={() => {
              setShowAirportSearch(null);
              setAirportSearchQuery('');
            }}
            style={styles.backButton}
          >
            <X size={24} color={colors.accent} />
          </Pressable>
          <Text style={styles.searchTitle}>
            Select {showAirportSearch === 'from' ? 'Departure' : 'Arrival'} Airport
          </Text>
        </View>

        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search airports..."
            value={airportSearchQuery}
            onChangeText={setAirportSearchQuery}
            placeholderTextColor={colors.text.secondary}
            autoFocus
          />
        </View>

        <ScrollView style={styles.airportList}>
          {filteredAirports.map(airport => (
            <Pressable
              key={airport.code}
              style={styles.airportItem}
              onPress={() => handleSelectAirport(airport)}
            >
              <Text style={styles.airportText}>
                {airport.city} ({airport.code})
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (showResults) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => setShowResults(false)} style={styles.backButton}>
            <X size={24} color={colors.accent} />
          </Pressable>
          <Text style={styles.title}>Available Flights</Text>
          <View style={styles.routeSummary}>
            <Text style={styles.routeText}>
              {searchParams.from?.code} → {searchParams.to?.code}
            </Text>
            <Text style={styles.routeDetails}>
              {searchParams.passengers.adults} Adult
              {searchParams.passengers.adults > 1 ? 's' : ''}
              {searchParams.passengers.children > 0
                ? `, ${searchParams.passengers.children} Child${
                    searchParams.passengers.children > 1 ? 'ren' : ''
                  }`
                : ''}
            </Text>
          </View>
        </View>

        <View style={styles.fareOptions}>
          {FARE_OPTIONS.map(fare => (
            <Pressable
              key={fare.id}
              style={styles.fareCard}
              onPress={() => {
                router.push('/book/confirm');
              }}
            >
              <View style={styles.fareHeader}>
                <View>
                  <Text style={styles.fareName}>{fare.name}</Text>
                  <Text style={styles.fareDescription}>{fare.description}</Text>
                </View>
                <Text style={styles.farePrice}>${fare.price}</Text>
              </View>

              <View style={styles.fareFeatures}>
                {fare.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Text style={[
                      styles.featureIcon,
                      { color: feature.included ? colors.status.success : colors.status.error }
                    ]}>
                      {feature.icon}
                    </Text>
                    <Text style={[
                      styles.featureText,
                      { color: feature.included ? colors.text.primary : colors.text.secondary }
                    ]}>
                      {feature.label}
                    </Text>
                  </View>
                ))}
              </View>

              <Pressable style={styles.selectButton}>
                <Text style={styles.selectButtonText}>Select</Text>
                <ArrowRight size={20} color={colors.text.primary} />
              </Pressable>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    );
  }

  const today = new Date();
  const maxDate = addDays(today, 365);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book a Flight</Text>
        <Text style={styles.subtitle}>Search for available flights</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.tripTypeSelector}>
          <Pressable
            style={[
              styles.tripTypeButton,
              searchParams.tripType === 'one-way' && styles.tripTypeButtonActive,
            ]}
            onPress={() => setSearchParams(prev => ({ ...prev, tripType: 'one-way' }))}
          >
            <Text
              style={[
                styles.tripTypeText,
                searchParams.tripType === 'one-way' && styles.tripTypeTextActive,
              ]}
            >
              One Way
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tripTypeButton,
              searchParams.tripType === 'round-trip' && styles.tripTypeButtonActive,
            ]}
            onPress={() => setSearchParams(prev => ({ ...prev, tripType: 'round-trip' }))}
          >
            <Text
              style={[
                styles.tripTypeText,
                searchParams.tripType === 'round-trip' && styles.tripTypeTextActive,
              ]}
            >
              Round Trip
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.input}
          onPress={() => setShowAirportSearch('from')}
        >
          <Plane
            size={20}
            color={colors.text.secondary}
            style={{ transform: [{ rotate: '-45deg' }] }}
          />
          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>From</Text>
            <Text style={searchParams.from ? styles.inputText : styles.inputPlaceholder}>
              {searchParams.from
                ? `${searchParams.from.city} (${searchParams.from.code})`
                : 'Select departure airport'}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.input}
          onPress={() => setShowAirportSearch('to')}
        >
          <Plane
            size={20}
            color={colors.text.secondary}
            style={{ transform: [{ rotate: '45deg' }] }}
          />
          <View style={styles.inputContent}>
            <Text style={styles.inputLabel}>To</Text>
            <Text style={searchParams.to ? styles.inputText : styles.inputPlaceholder}>
              {searchParams.to
                ? `${searchParams.to.city} (${searchParams.to.code})`
                : 'Select arrival airport'}
            </Text>
          </View>
        </Pressable>

        <View style={styles.dateInputs}>
          <DatePicker
            label="Depart"
            value={searchParams.departDate}
            onChange={(date) => setSearchParams(prev => ({ ...prev, departDate: date }))}
            minimumDate={today}
            maximumDate={maxDate}
          />

          {searchParams.tripType === 'round-trip' && (
            <DatePicker
              label="Return"
              value={searchParams.returnDate}
              onChange={(date) => setSearchParams(prev => ({ ...prev, returnDate: date }))}
              minimumDate={searchParams.departDate || today}
              maximumDate={maxDate}
            />
          )}
        </View>

        <View style={styles.passengerSection}>
          <Text style={styles.sectionTitle}>Passengers</Text>
          
          <View style={styles.passengerType}>
            <View>
              <Text style={styles.passengerTypeTitle}>Adults</Text>
              <Text style={styles.passengerTypeSubtitle}>12+ years</Text>
            </View>
            <View style={styles.counter}>
              <Pressable
                style={styles.counterButton}
                onPress={() => updatePassengerCount('adults', false)}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </Pressable>
              <Text style={styles.counterValue}>{searchParams.passengers.adults}</Text>
              <Pressable
                style={styles.counterButton}
                onPress={() => updatePassengerCount('adults', true)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.passengerType}>
            <View>
              <Text style={styles.passengerTypeTitle}>Children</Text>
              <Text style={styles.passengerTypeSubtitle}>2-11 years</Text>
            </View>
            <View style={styles.counter}>
              <Pressable
                style={styles.counterButton}
                onPress={() => updatePassengerCount('children', false)}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </Pressable>
              <Text style={styles.counterValue}>{searchParams.passengers.children}</Text>
              <Pressable
                style={styles.counterButton}
                onPress={() => updatePassengerCount('children', true)}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Pressable
          style={[
            styles.searchButton,
            (!searchParams.from || !searchParams.to || !searchParams.departDate || 
              (searchParams.tripType === 'round-trip' && !searchParams.returnDate)) && 
            styles.searchButtonDisabled,
          ]}
          onPress={handleSearch}
          disabled={!searchParams.from || !searchParams.to || !searchParams.departDate ||
            (searchParams.tripType === 'round-trip' && !searchParams.returnDate)}
        >
          <Text style={styles.searchButtonText}>Search Flights</Text>
          <ArrowRight size={20} color={colors.text.primary} />
        </Pressable>
      </View>
    </ScrollView>
  );
}