import axios from "axios";
import {exercisesIndex} from "../urls/index";

// エクササイズのリストをAPIから取得するための関数
export const fetchExercises =() => {
    return axios.get(exercisesIndex)　// exercisesIndexからエクササイズのリストを取得する
        .then(res => {
            return res.data // レスポンスからデータを抽出して返す
        })
        .catch((e) => console.error(e)) // エラーが発生した場合は、コンソールにエラーメッセージを表示する
}