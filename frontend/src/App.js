import React from "react";
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// components
import {Exercises} from "./containers/Exercises";
import {Trainings} from "./containers/Trainings";
import {Orders} from "./containers/Orders";

function App() {
    return (
        <Router>
            <Switch>
                // エクササイズ一覧
                <Route
                    exact
                    path="/exercises">
                    <Exercises/>
                </Route>
                // トレーニング一覧
                <Route
                    excat
                    path="/trainings">
                    <Trainings/>
                </Route>
                // 仮メニュー選択画面
                <Route
                    exact
                    path="/orders">
                    <Orders/>
                </Route>
                <Route
                    exact
                    path="/exercises/:exercisesId/trainings"
                    render={({match}) =>
                        <Trainings
                            match={match}
                        />
                    }
                />
            </Switch>
        </Router>
    );
}

export default App;
