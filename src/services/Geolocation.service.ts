export type LongitudeKey = 'lng' | 'long' | 'longitude';
export type LatitudeKey = 'lat' | 'latitude';

export type LatitudeValue = number | string;
export type LongitudeValue = number | string;

export type GeolocationPoint = Record<LongitudeKey | LatitudeKey | string, LatitudeValue | LongitudeValue>;

export default class GeolocationService {
  public static getCurrentPosition(navigator: Navigator): GeolocationPoint {
    let pos = {
      latitude: 0,
      longitude: 0,
    } as GeolocationPoint;

    navigator.geolocation.getCurrentPosition(
      location => {
        if (location) {
          pos.latitude = location.coords.latitude;
          pos.longitude = location.coords.longitude;
        }
      },
      e => {
        console.error('getCurrentPosition err', e);
      }
    );

    return pos;
  }
  public static createPoint(lat: LatitudeValue, lng: LongitudeValue): GeolocationPoint {
    return {
      latitude: lat,
      longitude: lng,
    };
  }
}
