import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { Plane, X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { getThemeConstants, type AirlineTheme } from '@/data/constants/theme';

const AIRLINES: AirlineTheme[] = ['sounds', 'toa'];

interface AirlineSelectorProps {
  visible: boolean;
  onClose: () => void;
}

export function AirlineSelector({ visible, onClose }: AirlineSelectorProps) {
  const { colors, airline, setAirline } = useTheme();

  const handleSelect = (selectedAirline: AirlineTheme) => {
    setAirline(selectedAirline);
    onClose();
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 24,
      width: '90%',
      maxWidth: 400,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 20,
      color: colors.text.primary,
      fontFamily: 'Inter-Bold',
    },
    closeButton: {
      padding: 8,
      marginRight: -8,
    },
    airlineOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      backgroundColor: colors.border,
    },
    airlineOptionActive: {
      backgroundColor: colors.accent,
    },
    airlineIcon: {
      width: 40,
      height: 40,
      backgroundColor: colors.background,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    airlineContent: {
      marginLeft: 16,
      flex: 1,
    },
    airlineName: {
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    airlineDescription: {
      fontSize: 14,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginTop: 2,
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Airline</Text>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={24} color={colors.text.primary} />
            </Pressable>
          </View>

          {AIRLINES.map((airlineId) => {
            const { BRANDING } = getThemeConstants(airlineId);
            return (
              <Pressable
                key={airlineId}
                style={[
                  styles.airlineOption,
                  airline === airlineId && styles.airlineOptionActive,
                ]}
                onPress={() => handleSelect(airlineId)}
              >
                <View style={styles.airlineIcon}>
                  <Plane size={24} color={colors.text.primary} />
                </View>
                <View style={styles.airlineContent}>
                  <Text style={styles.airlineName}>{BRANDING.name}</Text>
                  <Text style={styles.airlineDescription}>
                    {BRANDING.database}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}