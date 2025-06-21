export interface WeatherData {
  time: string[];
  temperature_2m_mean?: number[];
  temperature_2m_max?: number[];
  temperature_2m_min?: number[];
  precipitation_sum?: number[];
  wind_speed_10m_max?: number[];
  // Hourly data
  temperature_2m?: number[];
  relative_humidity_2m?: number[];
  apparent_temperature?: number[];
  precipitation?: number[];
  surface_pressure?: number[];
  wind_speed_10m?: number[];
}

export interface ChartData {
  date: string;
  [key: string]: any;
}

export interface Location {
  name: string;
  lat: number;
  lon: number;
}

export interface Parameter {
  key: string;
  label: string;
  color: string;
}

export type PageType = 'overview' | 'details';
