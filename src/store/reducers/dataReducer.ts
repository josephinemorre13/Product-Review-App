import { AnyAction } from 'redux';

// Define initial state
const initialState = {
	data: null,
	loading: false,
	error: null,
};

// Define the data reducer
const dataReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case 'FETCH_DATA_REQUEST':
			return { ...state, loading: true, error: null };
		case 'FETCH_DATA_SUCCESS':
			return { ...state, loading: false, data: action.payload };
		case 'FETCH_DATA_FAILURE':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export default dataReducer;