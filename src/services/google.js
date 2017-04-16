import Config from "react-native-config";

export function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${Config.GOOGLE_MAPS_API_KEY}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  });
}

export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    const onSuccess = position => resolve(position.coords);
    const onFailure = error => reject(error);

    navigator.geolocation.getCurrentPosition(onSuccess, onFailure);
  });
}

export function getNearbyPlaces(placeType = "restaurant") {
  const placesUrl = position => {
    return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=${placeType}&location=${position.latitude},${position.longitude}&radius=500&key=${Config.GOOGLE_MAPS_API_KEY}`;
  };

  return getCurrentLocation().then(position => fetch(placesUrl(position)));
}
