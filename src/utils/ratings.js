import _ from 'lodash';

export const calcRatings = (userRatings) => {
	let bathroom = 0;
	let bathroomCount = 0;
	let entrance = 0;
	let entranceCount = 0;
	let parking  = 0;
	let parkingCount = 0;

	_.forOwn(userRatings, function(value, key) {
		_.forOwn(value, function(rating, key) {
			switch(key){
				case 'bathroom':
					bathroom += rating;
					bathroomCount += 1;
					return;
				case 'entrance':
					entrance += rating;
					entranceCount += 1;
					return;
				case 'parking':
					parking += rating;
					parkingCount += 1;
					return;
			}
		});
	});

	let bathroomRes = bathroomCount > 0 ? bathroom/bathroomCount : null;
	let entranceRes = entranceCount > 0 ? entrance/entranceCount : null;
	let parkingRes = parkingCount > 0 ? parking/parkingCount : null

	return { bathroom: bathroomRes, entrance: entranceRes, parking: parkingRes}
}
