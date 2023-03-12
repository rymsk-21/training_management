import React, {Fragment, useEffect, useReducer} from "react";
import {fetchLineMenus} from "../apis/line_menus";

// reducers
import {
    initialState,
    lineMenusActionType,
    lineMunesReducer,
} from "../reducers/lineMenus";

export const Orders = () => {
    const [state, dispatch] = useReducer(lineMunesReducer, initialState);

    useEffect(() => {
        dispatch({type: lineMenusActionType.FETCHING })
        fetchLineMenus()
            .then((data) =>
                dispatch({
                    type: lineMenusActionType.FETCH_SUCCESS,
                    payload: {
                        lineMenusSummary: data
                    }
                })
            )
            .catch((e) => console.error(e));
    }, []);

    return (
        <Fragment>
            メニュー確定画面
        </Fragment>
    )
}
