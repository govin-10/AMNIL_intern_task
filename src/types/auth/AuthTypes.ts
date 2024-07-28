export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
  address?: {
    address: string;
    city: string;
    coordinates?: {
      lat: string;
      lng: string;
    };
    country: string;
    postalCode: string;
    state: string;
    stateCode: string;
  };
  phone: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
