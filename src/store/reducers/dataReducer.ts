import { AnyAction } from 'redux';

// Define initial state
const initialState = {
	categories: null,
	products: null,
	// reviews: null,
	loading: false,
	error: null,
};

// Define the data reducer
const dataReducer = (state = initialState, action: AnyAction) => {
	switch (action.type) {
		case 'FETCH_DATA_REQUEST':
			return { ...state, loading: true, error: null };
		case 'FETCH_DATA_SUCCESS':
			return { 
				...state, 
				loading: false, 
				products: action.payload.products, 
				categories: action.payload.categories, 
				// products: action.payload.products, 
				// reviews: action.payload.products 
			};
		case 'FETCH_DATA_FAILURE':
			return { ...state, loading: false, error: action.payload.error };
		default:
			return state;
	}
};

export default dataReducer;