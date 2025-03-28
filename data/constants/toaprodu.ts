export const THEME = {
  light: {
    primary: '#ffffff',
    accent: '#cd9f58',
    background: '#ffffff',
    surface: '#f3f4f6',
    border: '#e5e7eb',
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
    },
    status: {
      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
      neutral: '#6b7280',
    }
  },
  dark: {
    primary: '#2b323a',
    accent: '#cd9f58',
    background: '#2b323a',
    surface: '#ffffff',
    border: '#3d4550',
    text: {
      primary: '#ffffff',
      secondary: '#e5e7eb',
    },
    status: {
      success: '#22c55e',
      warning: '#eab308',
      error: '#ef4444',
      neutral: '#6b7280',
    }
  }
};

export const BRANDING = {
  name: 'Tropic Ocean Airways',
  database: 'toaprodu',
  dbShort: 'toa',
  iata: 'TI',
  logo: require('../../assets/images/TOALogoWhite.png'),
};

export const CONTACT = {
  baggageServices: '+64 3 578 8119',
  customerService: '+64 3 578 8118',
  email: 'support@toapair.com'
};

export const BAGGAGE_PRICING = {
  firstBag: {
    price: 30,
    weight: '23kg'
  },
  additionalBag: {
    price: 50,
    weight: '23kg'
  }
};