export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipId: string;
  miles: number;
  status: string;
  avatar: string;
}

export const CURRENT_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  membershipId: 'SK123456',
  miles: 12500,
  status: 'Silver',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&q=80'
};