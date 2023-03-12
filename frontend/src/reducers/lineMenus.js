import {REQUEST_STATE} from "../constants";

export const initialState = {
    fetchState: REQUEST_STATE.INITIAL, // 取得状況
    postState: REQUEST_STATE.INITIAL, // 登録状況
    lineMenusSummary: null, // 仮メニューデータ
};

export const lineMenusActionType = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    POSTING: 'POSTING',
    POST_SUCCESS: 'POST_SUCCESS',
}

export const lineMunesReducer = (state, action) => {
    switch (action.type) {
        case lineMenusActionType.FETCHING:
            return{
                ...state,
                fetchState: REQUEST_STATE.LOADING,
            };
        case lineMenusActionType.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                lineMenusSummary: action.payload.lineMenusSummary,
            };
        case lineMenusActionType.POSTING:
            return {
                ...state,
                postState: REQUEST_STATE.LOADING,
            };
        case lineMenusActionType.POST_SUCCESS:
            return {
                ...state,
                postState: REQUEST_STATE.OK,
            }
        default:
            throw new Error();
    }
}