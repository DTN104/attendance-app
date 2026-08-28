import * as Location from 'expo-location';

import { getDistanceMeters, OFFICE_LOCATION } from '@/utils/location';

export async function getCurrentLocation() {
  if (!(await Location.hasServicesEnabledAsync())) {
    throw new Error('Vui lòng bật dịch vụ định vị.');
  }

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== Location.PermissionStatus.GRANTED) {
    throw new Error('Bạn chưa cấp quyền truy cập vị trí.');
  }

  const { coords, timestamp } = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  const [geocodedAddress] = await Location.reverseGeocodeAsync({
    latitude: coords.latitude,
    longitude: coords.longitude,
  }).catch(() => []);
  const distanceMeters = getDistanceMeters(coords, OFFICE_LOCATION);

  return {
    accuracy: coords.accuracy,
    address: formatAddress(geocodedAddress),
    capturedAt: new Date(timestamp).toISOString(),
    distanceMeters,
    isWithinOffice: distanceMeters <= OFFICE_LOCATION.radiusMeters,
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
}

function formatAddress(address?: Location.LocationGeocodedAddress) {
  if (!address) return 'Không xác định được địa chỉ';
  if (address.formattedAddress) return address.formattedAddress;

  return [...new Set([
    address.name,
    address.street,
    address.district,
    address.city,
    address.region,
  ].filter(Boolean))].join(', ') || 'Không xác định được địa chỉ';
}
