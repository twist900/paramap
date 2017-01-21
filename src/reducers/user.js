import {
	SKIPPED_AUTH,
	AUTH_SUCCESS
} from '../actions/user';

const initialState = {
	skippedAuth: false,
	authenticating: false,
	facebookToken: null,
	facebookProfile: null
};

export function user(state = initialState, action) {
	switch (action.type) {
		case AUTH_SUCCESS :
      return Object.assign({}, state, {
        authenticating: false,
        facebookToken: action.facebookToken,
        facebookProfile: action.facebookProfile,
		   });
    case SKIPPED_AUTH:
    	return Object.assign({}, state, {
    		skippedAuth: true
    	});
		default:
			return state;
	}
}
