import Firestack from 'react-native-firestack';
const firestack = new Firestack();

export function getPlaceRatings(placeId) {
	return new Promise((resolve, reject) => {
		firestack.database.ref(`/ratings/${placeId}`).once('value')
			.then(snapshot => resolve(snapshot.val()))
			.catch(error => reject(error));;
	});
}

export function getPlaceReviews(placeId) {
	return new Promise((resolve, reject) => {
		firestack.database.ref(`/reviews/${placeId}`).once('value')
			.then(snapshot => resolve(snapshot.val()))
			.catch(error => reject(error));;
	});
}

export function firebaseFacebookAuth(facebookToken) {
	return new Promise((resolve, reject) => {
		firestack.auth.signInWithProvider('facebook', facebookToken, '')
			.then(credentials => resolve(credentials))
	    .catch(error => reject(error))
	});
}
