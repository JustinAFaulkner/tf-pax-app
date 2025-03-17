import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, TriangleAlert as AlertTriangle, Printer, Share2 } from 'lucide-react-native';
import { BOOKINGS } from '@/data/flights';
import { useTheme } from '@/context/ThemeContext';

type Step = {
  id: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    id: 'details',
    title: 'Passenger Details',
    description: 'Confirm your passenger information',
  },
  {
    id: 'baggage',
    title: 'Baggage',
    description: 'Add or update your baggage',
  },
  {
    id: 'hazmat',
    title: 'Hazardous Materials',
    description: 'Review prohibited items',
  },
  {
    id: 'complete',
    title: 'Complete',
    description: 'Get your boarding pass',
  },
];

export default function CheckIn() {
  const { bookingId } = useLocalSearchParams();
  const booking = BOOKINGS[bookingId as keyof typeof BOOKINGS];
  const [currentStep, setCurrentStep] = useState(0);
  const [acceptedHazmat, setAcceptedHazmat] = useState(false);
  const [selectedBags, setSelectedBags] = useState<Record<string, number>>({});
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
    progress: {
      flexDirection: 'row',
      padding: 16,
      backgroundColor: colors.border,
    },
    progressStep: {
      flex: 1,
      alignItems: 'center',
      opacity: 0.5,
    },
    progressStepActive: {
      opacity: 1,
    },
    progressNumber: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.text.secondary,
      color: colors.background,
      textAlign: 'center',
      lineHeight: 24,
      fontSize: 14,
      fontFamily: 'Inter-Bold',
      marginBottom: 4,
    },
    progressNumberActive: {
      backgroundColor: colors.accent,
    },
    progressText: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
    progressTextActive: {
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    content: {
      flex: 1,
      padding: 16,
    },
    stepTitle: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginBottom: 8,
    },
    stepDescription: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 24,
    },
    stepContent: {
      flex: 1,
    },
    passengerCard: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    passengerName: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 16,
    },
    passengerDetails: {
      gap: 8,
    },
    detailLabel: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    detailValue: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    baggageSelector: {
      marginTop: 16,
    },
    baggageTitle: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 12,
    },
    baggageCounter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    counterButton: {
      width: 36,
      height: 36,
      backgroundColor: colors.accent,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterButtonText: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    bagCount: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      width: 40,
      textAlign: 'center',
    },
    baggagePrice: {
      fontSize: 16,
      color: colors.accent,
      fontFamily: 'Inter-SemiBold',
      marginTop: 12,
    },
    hazmatWarning: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
    },
    hazmatTitle: {
      fontSize: 20,
      color: colors.status.warning,
      fontFamily: 'Inter-Bold',
    },
    hazmatText: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-Regular',
      marginBottom: 16,
    },
    hazmatList: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
    },
    hazmatItem: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-Regular',
      marginBottom: 8,
    },
    hazmatCheckbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: colors.text.secondary,
      borderRadius: 4,
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    hazmatCheckboxChecked: {
      backgroundColor: colors.accent,
      borderColor: colors.accent,
    },
    hazmatAgreement: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    successMessage: {
      alignItems: 'center',
      marginBottom: 32,
    },
    successTitle: {
      fontSize: 24,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
      marginTop: 16,
      marginBottom: 8,
    },
    successText: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
    boardingPassActions: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 32,
    },
    actionButton: {
      flex: 1,
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      gap: 8,
    },
    actionButtonText: {
      fontSize: 14,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      textAlign: 'center',
    },
    flightSummary: {
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
    },
    summaryTitle: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
      marginBottom: 16,
    },
    summaryDetail: {
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 8,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    nextButton: {
      backgroundColor: colors.accent,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    nextButtonDisabled: {
      opacity: 0.5,
    },
    nextButtonText: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    errorText: {
      fontSize: 16,
      color: colors.status.error,
      textAlign: 'center',
      marginTop: 24,
    },
  });

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Booking not found</Text>
      </View>
    );
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'details':
        return (
          <View style={styles.stepContent}>
            {booking.passengers.map((passenger) => (
              <View key={passenger.name} style={styles.passengerCard}>
                <Text style={styles.passengerName}>{passenger.name}</Text>
                <View style={styles.passengerDetails}>
                  <Text style={styles.detailLabel}>Passenger Type</Text>
                  <Text style={styles.detailValue}>{passenger.type}</Text>
                  
                  <Text style={styles.detailLabel}>Seat Assignment</Text>
                  <Text style={styles.detailValue}>{passenger.seat}</Text>
                  
                  <Text style={styles.detailLabel}>Meal Preference</Text>
                  <Text style={styles.detailValue}>{passenger.meal}</Text>
                  
                  {passenger.frequentFlyerStatus && (
                    <>
                      <Text style={styles.detailLabel}>Frequent Flyer Status</Text>
                      <Text style={styles.detailValue}>{passenger.frequentFlyerStatus}</Text>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        );

      case 'baggage':
        return (
          <View style={styles.stepContent}>
            {booking.passengers.map((passenger) => (
              <View key={passenger.name} style={styles.passengerCard}>
                <Text style={styles.passengerName}>{passenger.name}</Text>
                <View style={styles.baggageSelector}>
                  <Text style={styles.baggageTitle}>Select Checked Bags</Text>
                  <View style={styles.baggageCounter}>
                    <Pressable
                      style={styles.counterButton}
                      onPress={() => {
                        const current = selectedBags[passenger.name] || 0;
                        if (current > 0) {
                          setSelectedBags({
                            ...selectedBags,
                            [passenger.name]: current - 1,
                          });
                        }
                      }}
                    >
                      <Text style={styles.counterButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.bagCount}>
                      {selectedBags[passenger.name] || 0}
                    </Text>
                    <Pressable
                      style={styles.counterButton}
                      onPress={() => {
                        const current = selectedBags[passenger.name] || 0;
                        if (current < 2) {
                          setSelectedBags({
                            ...selectedBags,
                            [passenger.name]: current + 1,
                          });
                        }
                      }}
                    >
                      <Text style={styles.counterButtonText}>+</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.baggagePrice}>
                    Price: ${(selectedBags[passenger.name] || 0) * 30}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );

      case 'hazmat':
        return (
          <View style={styles.stepContent}>
            <View style={styles.hazmatWarning}>
              <AlertTriangle size={32} color={colors.status.warning} />
              <Text style={styles.hazmatTitle}>Hazardous Materials Warning</Text>
            </View>
            <Text style={styles.hazmatText}>
              The following items are strictly prohibited on board:
            </Text>
            <View style={styles.hazmatList}>
              <Text style={styles.hazmatItem}>• Explosives and fireworks</Text>
              <Text style={styles.hazmatItem}>• Flammable liquids and solids</Text>
              <Text style={styles.hazmatItem}>• Toxic and infectious substances</Text>
              <Text style={styles.hazmatItem}>• Radioactive materials</Text>
              <Text style={styles.hazmatItem}>• Corrosives and oxidizers</Text>
              <Text style={styles.hazmatItem}>• Compressed gases</Text>
            </View>
            <Pressable
              style={[
                styles.hazmatCheckbox,
                acceptedHazmat && styles.hazmatCheckboxChecked,
              ]}
              onPress={() => setAcceptedHazmat(!acceptedHazmat)}
            >
              {acceptedHazmat && <Check size={20} color={colors.text.primary} />}
            </Pressable>
            <Text style={styles.hazmatAgreement}>
              I understand and confirm that I am not carrying any prohibited items
            </Text>
          </View>
        );

      case 'complete':
        return (
          <View style={styles.stepContent}>
            <View style={styles.successMessage}>
              <Check size={48} color={colors.status.success} />
              <Text style={styles.successTitle}>Check-in Complete!</Text>
              <Text style={styles.successText}>
                You're all set for your flight. Safe travels!
              </Text>
            </View>

            <View style={styles.boardingPassActions}>
              <Pressable style={styles.actionButton}>
                <Printer size={24} color={colors.text.primary} />
                <Text style={styles.actionButtonText}>Print Boarding Pass</Text>
              </Pressable>

              <Pressable style={styles.actionButton}>
                <Share2 size={24} color={colors.text.primary} />
                <Text style={styles.actionButtonText}>Share Boarding Pass</Text>
              </Pressable>
            </View>

            <View style={styles.flightSummary}>
              <Text style={styles.summaryTitle}>Flight Summary</Text>
              <Text style={styles.summaryDetail}>
                Flight: {booking.flightNumber}
              </Text>
              <Text style={styles.summaryDetail}>
                Date: {new Date(booking.date).toLocaleDateString()}
              </Text>
              <Text style={styles.summaryDetail}>
                Time: {new Date(booking.date).toLocaleTimeString()}
              </Text>
              <Text style={styles.summaryDetail}>Gate: {booking.gate}</Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.accent} />
        </Pressable>
        <Text style={styles.title}>Check-in</Text>
        <Text style={styles.subtitle}>Flight {booking.flightNumber}</Text>
      </View>

      <View style={styles.progress}>
        {STEPS.map((step, index) => (
          <View
            key={step.id}
            style={[
              styles.progressStep,
              index <= currentStep && styles.progressStepActive,
            ]}
          >
            <Text
              style={[
                styles.progressNumber,
                index <= currentStep && styles.progressNumberActive,
              ]}
            >
              {index + 1}
            </Text>
            <Text
              style={[
                styles.progressText,
                index <= currentStep && styles.progressTextActive,
              ]}
            >
              {step.title}
            </Text>
          </View>
        ))}
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.stepTitle}>{STEPS[currentStep].title}</Text>
        <Text style={styles.stepDescription}>
          {STEPS[currentStep].description}
        </Text>

        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep < STEPS.length - 1 ? (
          <Pressable
            style={[
              styles.nextButton,
              currentStep === 2 && !acceptedHazmat && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={currentStep === 2 && !acceptedHazmat}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
            <ArrowRight size={20} color={colors.text.primary} />
          </Pressable>
        ) : (
          <Pressable
            style={styles.nextButton}
            onPress={() => router.back()}
          >
            <Text style={styles.nextButtonText}>Done</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}