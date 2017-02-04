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

	let bathroomRating = bathroomCount > 0 ? bathroom/bathroomCount : 0;
	let entranceRating = entranceCount > 0 ? entrance/entranceCount : 0;
	let parkingRating = parkingCount > 0 ? parking/parkingCount : 0;


	return { bathroom: { rating: bathroomRating.toFixed(1), count: bathroomCount },
					 entrance: { rating: entranceRating.toFixed(1), count: entranceCount},
					 parking:  { rating: parkingRating.toFixed(1),  count: parkingCount} }
}
