import React, {Fragment, useEffect, useReducer} from "react";
import styled from "@emotion/styled";
import {Link} from "react-router-dom"

// components
import Skeleton from "@material-ui/lab/Skeleton"

// api
import {fetchExercises} from "../apis/exercises";

// reducers
import {
    initialsState,
    exercisesActionTypes,
    exercisesReducer,
} from "../reducers/exercises";

// constants
import {REQUEST_STATE} from "../constants";

// images
import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png'
import ExerciseImage from '../images/exercise-image.jpg'

// css
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 600px;
`;

const ExercisesContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const ExercisesContentWrapper = styled.div`
  width: 450px;
  height: 300px;
  padding: 48px;
`;

const ExercisesImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

// エクササイズ一覧を表示するコンポーネント
export const Exercises = () => {
    // Reducerを使用して、アプリケーションの状態を管理
    const [state, dispatch] = useReducer(exercisesReducer, initialsState);

    useEffect(() => {
        dispatch({type: exercisesActionTypes.FETCHING});
        // コンポーネントがマウントされたときに、実行される副作用
        fetchExercises()
            .then((data) =>
                dispatch({
                    type: exercisesActionTypes.FETCH_SUCCESS,
                    payload: {
                        exercises: data.exercises
                    }
                })
            )　// APIから取得したデータをコンソールに出力
    }, [])


    return (
        <Fragment>
            <HeaderWrapper>
                <MainLogoImage src={MainLogo} alt="main logo"/>
            </HeaderWrapper>
            <MainCoverImageWrapper>
                <MainCover src={MainCoverImage} alt="main cover"/>
            </MainCoverImageWrapper>
            <ExercisesContentsList>
                {
                    state.fetchState === REQUEST_STATE.LOADING ?
                        // データ取得流は、ローディングアニメーションを表示
                        <Fragment>
                            <Skeleton variant="rect" width={450} height={300}/>
                            <Skeleton variant="rect" width={450} height={300}/>
                            <Skeleton variant="rect" width={450} height={300}/>
                        </Fragment>
                        :
                        // エクササイズ一覧を表示
                        state.exercisesList.map((item, index) =>
                            <Link to={`/exercises/${item.id}/trainings`} key={index} style={{textDecoration: 'node'}}>
                                <ExercisesContentWrapper>
                                    <ExercisesImageNode src={ExerciseImage}/>
                                    <MainText>{item.name}</MainText>
                                    <SubText> {`カテゴリー: ${item.category}`}</SubText>
                                    <SubText> {`トレーニング完了時間: ${item.time_required}分`}</SubText>
                                </ExercisesContentWrapper>
                            </Link>
                        )
                }
            </ExercisesContentsList>
        </Fragment>
    )
}

// 学習メモ
// useEffectは、Reactの関数コンポーネントで副作用を扱うためのフック。
// 副作用とは、例えばAPIからデータを取得する、ブラウザのタイトルを変更する、など、コンポーネントの状態を変更する処理のことを指す。