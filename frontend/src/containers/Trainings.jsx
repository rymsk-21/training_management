import React, {Fragment, useEffect, useReducer, useState} from 'react';
import styled from 'styled-components';
import {useHistory, Link} from 'react-router-dom';

// components
import {LocalMallIcon} from '../components/Icons';
import {TrainingWrapper} from '../components/TrainingWrapper';
import Skeleton from '@material-ui/lab/Skeleton';
import {TrainingOrderDialog} from '../components/TrainingOrderDialog'

// reducers
import {
    initialState as trainingsInitialState,
    trainingsActionTypes,
    trainingsReducer,
} from "../reducers/trainings";

// api
import {fetchTrainings} from "../apis/trainings";

// image
import MainLogo from "../images/logo.png";
import TrainingImage from "../images/training-image.jpg"

// constants
import {COLORS} from '../style_constants';
import {REQUEST_STATE} from "../constants";
import {NewOrderConfirmDialog} from "../components/NewOrderConfirmDialog";
import {postLineMenus, replaceLineMenus} from "../apis/line_menus";
import {HTTP_STATUS_CODE} from "../constants";

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const TrainingsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Trainings = ({
                              match
                          }) => {
    const initialState = {
        isOpenOrderDialog: false,
        selectedTraining: null,
        selectedTrainingCount: 1,
        isOpenNewOrderDialog: false,
        existingExerciseName: '',
        newExerciseName: '',
    }
    // トレーニングリストの状態と更新関数を管理するために、useReducerフックを使う
    const [state, setState] = useState(initialState);
    const [trainingsState, dispatch] = useReducer(trainingsReducer, trainingsInitialState)
    const history = useHistory();

    // 初回レンダリング後に、トレーニングデータを取得してtrainingStateを更新する
    useEffect(() => {
        dispatch({type: trainingsActionTypes.FETCHING});
        // match.params,exercisesIdを使用してトレーニングデータを取得する
        fetchTrainings(match.params.exercisesId)
            .then((data) => {
                dispatch({
                    type: trainingsActionTypes.FETCH_SUCCESS,
                    payload: {
                        trainings: data.trainings
                    }
                })
            })
    }, []);

    const submitOrder = () => {
        postLineMenus({
            trainingId: state.selectedTraining.id,
            count: state.selectedTrainingCount,
        }).then(() => history.push('/orders'))
            .catch((e) => {
                if (e.response.state === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
                    setState({
                        ...state,
                        isOpenOrderDialog: false,
                        isOpenNewOrderDialog: false,
                        existingExerciseName: e.response.data.existing_exercise,
                        newExerciseName: e.response.data.new_exercise,
                    })
                } else {
                    throw e;
                }
            })
    };

    const replaceOrder = () => {
        replaceLineMenus({
            trainingId: state.selectedTraining.id,
            count: state.selectedTrainingCount,
        }).then(() => history.push('/orders'))
    }

    return (
        // アプリのヘッダーを表示する
        <Fragment>
            <HeaderWrapper>
                <Link to="/exercise">
                    <MainLogoImage src={MainLogo} alt="main logo"/>
                </Link>
                <BagIconWrapper>
                    <Link to="/orders">
                        <ColoredBagIcon fontSize="large"/>
                    </Link>
                </BagIconWrapper>
            </HeaderWrapper>
            {/*trainingStateに基づいて、トレーニングリストを表示するか、スケルトン要素を表示するかを判断する*/}
            <TrainingsList>
                {
                    trainingsState.fetchState === REQUEST_STATE.LOADING ?
                        // データを取得中であれば、スケルトン要素を表示する
                        <Fragment>
                            {
                                [...Array(12).keys()].map(i =>
                                    <ItemWrapper key={i}>
                                        <Skeleton key={i} variant="rect" width={450} height={180}/>
                                    </ItemWrapper>
                                )
                            }
                        </Fragment>
                        :
                        // データを取得できた場合は、トレーニングリストを表示する
                        trainingsState.trainingsList.map(training =>
                            <ItemWrapper key={training.id}>
                                <TrainingWrapper
                                    training={training}
                                    onClickTrainingWrapper={
                                        (training) => setState({
                                            ...state,
                                            selectedTraining: training,
                                            isOpenOrderDialog: true,
                                        })
                                    }
                                    imageUrl={TrainingImage}
                                />
                            </ItemWrapper>
                        )
                }
            </TrainingsList>
            {
                state.isOpenOrderDialog &&
                <TrainingOrderDialog
                    isOpen={state.isOpenOrderDialog}
                    training={state.selectedTraining}
                    countNumber={state.selectedTrainingCount}
                    onClickCountUp={() => setState({
                        ...state,
                        selectedTrainingCount: state.selectedTrainingCount + 1,
                    })}
                    onClickCountDown={() => setState({
                        ...state,
                        selectedTrainingCount: state.selectedTrainingCount - 1,
                    })}
                    onClickOeder={() => submitOrder()}
                    onClose={() => setState({
                        ...state,
                        isOpenOrderDialog: false,
                        selectedTraining: null,
                        selectedTrainingCount: 1,
                    })}
                />
            }
            {
                state.isOpenNewOrderDialog &&
                <NewOrderConfirmDialog
                    isOpen={state.isOpenNewOrderDialog}
                    onClose={() => setState({...state, isOpenNewOrderDialog: false})}
                    existingExerciseName={state.existingExerciseName}
                    newExerciseName={state.newExerciseName}
                    onClickSubmit={() => replaceOrder()}
                />
            }
        </Fragment>
    )
}