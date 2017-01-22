import Config from 'react-native-config';

export function getPlaceDetails(placeId) {
	let url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${Config.GOOGLE_MAPS_API_KEY}`

	return new Promise((resolve, reject) => {
		fetch(url)
		  	.then(response => response.json())
		  	.then(json => resolve(json))
		  	.catch(error => reject(error));
	})
}
