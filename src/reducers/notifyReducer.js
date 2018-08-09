import { NOTIFY_USER } from "../actions/types";
import { actionTypes } from "../../node_modules/redux-firestore";

const initialState = {
	message: null,
	messageType: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case NOTIFY_USER:
			return {
				...state,
				message: action.message,
				messageType: action.messageType
			};
		default:
			return state;
	}
};
