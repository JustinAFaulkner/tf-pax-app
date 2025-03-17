export interface FareFeature {
  icon: string;
  label: string;
  included: boolean;
}

export interface FareOption {
  id: string;
  name: string;
  description: string;
  price: number;
  features: FareFeature[];
}

export const FARE_OPTIONS: FareOption[] = [
  {
    id: 'seat-only',
    name: 'Seat Only',
    description: 'Basic fare with hand luggage only',
    price: 149,
    features: [
      { icon: '✓', label: 'Carry-on bag (7kg)', included: true },
      { icon: '✗', label: 'Checked baggage', included: false },
      { icon: '✗', label: 'Seat selection', included: false },
      { icon: '✗', label: 'Meal included', included: false },
      { icon: '✗', label: 'Flexible change', included: false },
      { icon: '✗', label: 'Refundable', included: false },
    ],
  },
  {
    id: 'smart-saver',
    name: 'Smart Saver',
    description: 'Popular choice with essential features',
    price: 199,
    features: [
      { icon: '✓', label: 'Carry-on bag (7kg)', included: true },
      { icon: '✓', label: 'Checked baggage (23kg)', included: true },
      { icon: '✓', label: 'Seat selection', included: true },
      { icon: '✗', label: 'Meal included', included: false },
      { icon: '✗', label: 'Flexible change', included: false },
      { icon: '✗', label: 'Refundable', included: false },
    ],
  },
  {
    id: 'flexi',
    name: 'Flexi',
    description: 'Full flexibility and premium features',
    price: 299,
    features: [
      { icon: '✓', label: 'Carry-on bag (7kg)', included: true },
      { icon: '✓', label: 'Checked baggage (23kg)', included: true },
      { icon: '✓', label: 'Seat selection', included: true },
      { icon: '✓', label: 'Meal included', included: true },
      { icon: '✓', label: 'Flexible change', included: true },
      { icon: '✓', label: 'Refundable', included: true },
    ],
  },
];