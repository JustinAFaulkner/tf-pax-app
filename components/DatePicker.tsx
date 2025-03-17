import { Platform, Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface DatePickerProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DatePicker({ label, value, onChange, minimumDate, maximumDate }: DatePickerProps) {
  const [show, setShow] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const { colors } = useTheme();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty spaces for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (minimumDate && date < new Date(minimumDate.setHours(0, 0, 0, 0))) return true;
    if (maximumDate && date > new Date(maximumDate.setHours(23, 59, 59, 999))) return true;
    return false;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    label: {
      fontSize: 12,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
      marginBottom: 4,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.border,
      borderRadius: 12,
      padding: 16,
    },
    value: {
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    placeholder: {
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.secondary,
      fontFamily: 'Inter-Regular',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 16,
      width: '90%',
      maxWidth: 400,
    },
    calendarHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    navigationButton: {
      padding: 8,
    },
    monthText: {
      fontSize: 18,
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    weekDays: {
      flexDirection: 'row',
      marginBottom: 8,
    },
    weekDay: {
      flex: 1,
      textAlign: 'center',
      color: colors.text.secondary,
      fontSize: 14,
      fontFamily: 'Inter-Regular',
    },
    daysGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    dayButton: {
      width: '14.28%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedDay: {
      backgroundColor: colors.accent,
      borderRadius: 20,
    },
    disabledDay: {
      opacity: 0.3,
    },
    dayText: {
      color: colors.text.primary,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
    },
    selectedDayText: {
      color: colors.text.primary,
      fontFamily: 'Inter-SemiBold',
    },
    disabledDayText: {
      color: colors.text.secondary,
    },
  });

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
          <Calendar size={20} color={colors.text.secondary} />
          <input
            type="date"
            value={value ? format(value, 'yyyy-MM-dd') : ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              onChange(date);
            }}
            min={minimumDate ? format(minimumDate, 'yyyy-MM-dd') : undefined}
            max={maximumDate ? format(maximumDate, 'yyyy-MM-dd') : undefined}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: colors.text.primary,
              fontFamily: 'Inter-Regular',
              fontSize: '16px',
              marginLeft: '12px',
              outline: 'none',
              width: '100%',
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.inputContainer} onPress={() => setShow(true)}>
        <Calendar size={20} color={colors.text.secondary} />
        <Text style={value ? styles.value : styles.placeholder}>
          {value ? format(value, 'MMM d, yyyy') : 'Select date'}
        </Text>
      </Pressable>

      <Modal
        visible={show}
        transparent
        animationType="fade"
        onRequestClose={() => setShow(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShow(false)}>
          <Pressable style={styles.modalContent} onPress={e => e.stopPropagation()}>
            <View style={styles.calendarHeader}>
              <Pressable
                onPress={() => setCurrentMonth(prev => subDays(prev, 30))}
                style={styles.navigationButton}
              >
                <ChevronLeft size={24} color={colors.text.primary} />
              </Pressable>
              <Text style={styles.monthText}>
                {format(currentMonth, 'MMMM yyyy')}
              </Text>
              <Pressable
                onPress={() => setCurrentMonth(prev => addDays(prev, 30))}
                style={styles.navigationButton}
              >
                <ChevronRight size={24} color={colors.text.primary} />
              </Pressable>
            </View>

            <View style={styles.weekDays}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <Text key={day} style={styles.weekDay}>{day}</Text>
              ))}
            </View>

            <View style={styles.daysGrid}>
              {getDaysInMonth(currentMonth).map((date, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.dayButton,
                    date && value && format(date, 'yyyy-MM-dd') === format(value, 'yyyy-MM-dd') && styles.selectedDay,
                    date && isDateDisabled(date) && styles.disabledDay,
                  ]}
                  onPress={() => {
                    if (date && !isDateDisabled(date)) {
                      onChange(date);
                      setShow(false);
                    }
                  }}
                  disabled={!date || isDateDisabled(date)}
                >
                  <Text style={[
                    styles.dayText,
                    date && value && format(date, 'yyyy-MM-dd') === format(value, 'yyyy-MM-dd') && styles.selectedDayText,
                    date && isDateDisabled(date) && styles.disabledDayText,
                  ]}>
                    {date ? format(date, 'd') : ''}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}