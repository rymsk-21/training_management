import axios from 'axios';
import {lineMenus, lineMenusReplace} from "../urls/index";

export const postLineMenus = (params) => {
    return axios.post(lineMenus,
        {
            training_id: params.trainingId,
            count: params.count,
        }
    )
        .then(res => {
            return res.data
        })
        .catch((e) => {
            throw e;
        })
};

export const replaceLineMenus = (params) => {
    return axios.put(lineMenusReplace,
        {
            training_id: params.trainingId,
            count: params.count,
        }
    )
        .then(res => {
            return res.data
        })
        .catch((e) => {
            throw e;
        })
};

export const fetchLineMenus = () => {
    return axios.get(lineMenus)
        .then(res => {
            return res.data
        })
        .catch((e) => {
            throw e;
        })
}