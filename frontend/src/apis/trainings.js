import axios from "axios";
import {trainingsIndex} from "../urls/index";

export const fetchTrainings = (trainingId) => {
    return axios.get(trainingsIndex(trainingId))
        .then(res => {
            return res.data
        })
        .catch((e) => console.error(e))
}