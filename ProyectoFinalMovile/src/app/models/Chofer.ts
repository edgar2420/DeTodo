export interface Registro {
  id?: number;
  fullname: string;
  email: string;
  password: string;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_color: string;
  vehicle_plate: string;
}

export interface Login {
  token: string | null;
  id?: number;
  name: string;
  password: string;
  access_token: string;
}

export interface TripData {
  name: string;
  latOrigin: number;
  lngOrigin: number;
  latDestination: number;
  lngDestination: number;
  date: string;
  price: number;
  seats: number;
  startTime: string;
  stops: Stop[];
  [key: string]: any;
}

export interface Stop {
  lat: number;
  lng: number;
  time: string;
}
