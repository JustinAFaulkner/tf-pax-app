import { format, addDays } from 'date-fns';

export interface Bag {
  tagNumber: string;
  weight: string;
  status: 'not_received' | 'received' | 'awaiting_loading' | 'loaded' | 'offloaded' | 'delivered';
  routing: string;
  lastScan: Date;
}

export interface Baggage {
  count: number;
  bags?: Bag[];
}

export interface Passenger {
  name: string;
  type: 'Adult' | 'Child' | 'Infant';
  seat: string;
  meal: string;
  checkedIn: boolean;
  baggage: Baggage;
  frequentFlyerStatus?: string;
  fareType?: string;
}

export interface Payment {
  amount: number;
  method: string;
  date: Date;
}

export interface Booking {
  id: string;
  from: string;
  to: string;
  date: Date;
  duration: string;
  flightNumber: string;
  gate: string;
  status: string;
  bookingReference: string;
  passengers: Passenger[];
  payment: Payment;
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  price: number;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: '1',
    city: 'Blenheim',
    country: 'New Zealand',
    price: 199,
    image: 'https://images.unsplash.com/photo-1578261472329-9ef5b5ad4718?w=800&q=80',
  },
  {
    id: '2',
    city: 'Wellington',
    country: 'New Zealand',
    price: 149,
    image: 'https://images.unsplash.com/photo-1589871973318-9ca1258faa5d?w=800&q=80',
  },
  {
    id: '3',
    city: 'Picton',
    country: 'New Zealand',
    price: 179,
    image: 'https://images.unsplash.com/photo-1578261472329-9ef5b5ad4718?w=800&q=80',
  },
  {
    id: '4',
    city: 'Westport',
    country: 'New Zealand',
    price: 229,
    image: 'https://images.unsplash.com/photo-1578261472329-9ef5b5ad4718?w=800&q=80',
  },
  {
    id: '5',
    city: 'Taupo',
    country: 'New Zealand',
    price: 249,
    image: 'https://images.unsplash.com/photo-1578261472329-9ef5b5ad4718?w=800&q=80',
  },
  {
    id: '6',
    city: 'Nelson',
    country: 'New Zealand',
    price: 189,
    image: 'https://images.unsplash.com/photo-1578261472329-9ef5b5ad4718?w=800&q=80',
  }
];

export const BOOKINGS: Record<string, Booking> = {
  '1': {
    id: '1',
    from: 'Blenheim (BHE)',
    to: 'Wellington (WLG)',
    date: new Date(2025, 3, 15, 12),
    duration: '0h 30m',
    flightNumber: 'S8266',
    gate: 'A12',
    status: 'On Time',
    bookingReference: 'ABCD123',
    passengers: [
      {
        name: 'John Doe',
        type: 'Adult',
        seat: '12A',
        meal: 'Regular',
        checkedIn: true,
        baggage: {
          count: 2,
          bags: [
            {
              tagNumber: 'SA123456',
              weight: '18kg',
              status: 'loaded',
              routing: 'BHE → WLG',
              lastScan: new Date(2025, 3, 15, 11, 30),
            },
            {
              tagNumber: 'SA123457',
              weight: '15kg',
              status: 'loaded',
              routing: 'BHE → WLG',
              lastScan: new Date(2025, 3, 15, 11, 35),
            }
          ]
        },
        frequentFlyerStatus: 'Gold',
        fareType: 'Flexi'
      },
      {
        name: 'Jane Doe',
        type: 'Adult',
        seat: '12B',
        meal: 'Vegetarian',
        checkedIn: true,
        baggage: {
          count: 0
        },
        frequentFlyerStatus: 'Silver',
        fareType: 'Flexi'
      }
    ],
    payment: {
      amount: 398,
      method: 'Visa ****1234',
      date: new Date(2025, 2, 1)
    }
  },
  '2': {
    id: '2',
    from: 'Wellington (WLG)',
    to: 'Picton (PCN)',
    date: new Date(2025, 3, 16, 8, 30),
    duration: '0h 30m',
    flightNumber: 'S8111',
    gate: 'A3',
    status: 'Scheduled',
    bookingReference: 'EFGH456',
    passengers: [
      {
        name: 'John Doe',
        type: 'Adult',
        seat: '14C',
        meal: 'Regular',
        checkedIn: true,
        baggage: {
          count: 1,
          bags: [
            {
              tagNumber: 'SA123458',
              weight: '20kg',
              status: 'awaiting_loading',
              routing: 'WLG → PCN',
              lastScan: new Date(2025, 3, 16, 7, 45),
            }
          ]
        },
        frequentFlyerStatus: 'Gold',
        fareType: 'Saver'
      }
    ],
    payment: {
      amount: 149,
      method: 'Visa ****1234',
      date: new Date(2025, 2, 15)
    }
  },
  '3': {
    id: '3',
    from: 'Wellington (WLG)',
    to: 'Westport (WSZ)',
    date: new Date(2025, 3, 16, 14, 15),
    duration: '0h 45m',
    flightNumber: 'S8345',
    gate: 'B2',
    status: 'Scheduled',
    bookingReference: 'IJKL789',
    passengers: [
      {
        name: 'John Doe',
        type: 'Adult',
        seat: '8A',
        meal: 'Regular',
        checkedIn: false,
        baggage: {
          count: 0
        },
        frequentFlyerStatus: 'Gold',
        fareType: 'Saver'
      }
    ],
    payment: {
      amount: 229,
      method: 'Visa ****1234',
      date: new Date(2025, 2, 20)
    }
  }
};

export const UPCOMING_FLIGHTS = [
  BOOKINGS['1'],
  BOOKINGS['2'],
  BOOKINGS['3']
];

export interface BaggageStatus {
  text: string;
  color: string;
}

export const getBaggageStatusText = (status: string): BaggageStatus => {
  const statusMap: Record<string, BaggageStatus> = {
    not_received: { text: 'Not yet received', color: '#6b7280' },
    received: { text: 'Received', color: '#22c55e' },
    awaiting_loading: { text: 'Awaiting loading', color: '#eab308' },
    loaded: { text: 'Loaded', color: '#22c55e' },
    offloaded: { text: 'Offloaded', color: '#22c55e' },
    delivered: { text: 'Delivered to claim', color: '#22c55e' },
  };
  return statusMap[status] || { text: 'Unknown', color: '#6b7280' };
};