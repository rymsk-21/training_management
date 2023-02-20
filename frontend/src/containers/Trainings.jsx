import React, {Fragment} from "react";

export const Trainings = ({
                              match
                          }) => {
    return (
        <Fragment>
            トレーニング一覧
            <p>
                exercisesIdは {match.params.exercisesId}です。
            </p>
        </Fragment>
    )
}