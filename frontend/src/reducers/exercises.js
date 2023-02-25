import {REQUEST_STATE} from "../constants";

export const initialsState = {
    fetchState: REQUEST_STATE.INITIAL,
    exercisesList: [],
};

export const exercisesActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const exercisesReducer = (state, action) => {
    switch (action.type) {
        case exercisesActionTypes.FETCHING:
            return {
                ...state,
                fetchState: REQUEST_STATE.LOADING,
            };
        case exercisesActionTypes.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                exercisesList: action.payload.exercises,
            };
        default:
            throw new Error();
    }
}