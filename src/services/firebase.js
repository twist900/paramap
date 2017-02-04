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
		const onSuccess = snapshot => resolve(snapshot.val());
		const onFailure = error => reject(error);

		firestack.database.ref(`/reviews/${placeId}`).on('value', onSuccess, onFailure);
	});
}

export function postPlaceReview(placeId, review) {
	return new Promise((resolve, reject) => {
		firestack.auth.getCurrentUser()
			.then((user) => {
				review.reviewer = user.user.uid;
				firestack.database.ref(`/reviews/${placeId}`).push(review)
					.then((res) => { resolve(res) })
					.catch((err) => { reject(err) })
			})
			.catch((err) => { reject(err) })
	})
}

export function postPlaceRating(placeId, rating) {
	return new Promise((resolve, reject) => {
		firestack.auth.getCurrentUser()
			.then((user) => {
				rating.reviewer = user.user.uid;
				firestack.database.ref(`/ratings/${placeId}`).push(rating)
					.then((res) => { resolve(res) })
					.catch((err) => { reject(err) })
			})
			.catch((err) => { reject(err) })
	})
}

export function firebaseFacebookAuth(facebookToken) {
	return new Promise((resolve, reject) => {
		firestack.auth.signInWithProvider('facebook', facebookToken, '')
			.then(credentials => resolve(credentials))
	    .catch(error => reject(error))
	});
}

export function postProfile(uid, profile) {
	return new Promise((resolve, reject) => {
		firestack.database.ref(`/users/${uid}`).set(profile)
			.then((res) => { resolve(res) })
			.catch((err) => { reject(err) })
	})
}

export function getProfile(uid) {
	return new Promise((resolve, reject) => {
		firestack.database.ref(`/users/${uid}`).once('value')
			.then(snapshot => resolve(snapshot.val()))
			.catch(error => reject(error));;
	});
}
