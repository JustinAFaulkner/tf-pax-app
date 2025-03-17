export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  popular?: boolean;
}

export const AIRPORTS: Airport[] = [
  {
    code: 'BHE',
    name: 'Woodbourne Airport',
    city: 'Blenheim',
    country: 'New Zealand',
    popular: true
  },
  {
    code: 'WLG',
    name: 'Wellington International Airport',
    city: 'Wellington',
    country: 'New Zealand',
    popular: true
  },
  {
    code: 'PCN',
    name: 'Picton Aerodrome',
    city: 'Picton',
    country: 'New Zealand',
    popular: true
  },
  {
    code: 'WSZ',
    name: 'Westport Airport',
    city: 'Westport',
    country: 'New Zealand',
    popular: true
  },
  {
    code: 'TUO',
    name: 'Taupo Airport',
    city: 'Taupo',
    country: 'New Zealand',
    popular: true
  },
  {
    code: 'NSN',
    name: 'Nelson Airport',
    city: 'Nelson',
    country: 'New Zealand',
    popular: true
  }
];