import {REQUEST_STATE} from "../constants";

export const initialState = {
    fetchState: REQUEST_STATE.INITIAL,
    trainingsList: [],
};

export const trainingsActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const trainingsReducer = (state, action) => {
    switch (action.type) {
        case trainingsActionTypes.FETCHING:
            return {
                ...state,
                fetchState: REQUEST_STATE.LOADING,
            };
        case trainingsActionTypes.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                trainingsList: action.payload.trainings,
            };
        default:
            throw new Error();
    }
}
