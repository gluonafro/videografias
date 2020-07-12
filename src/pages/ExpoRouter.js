import React from "react";
import { Switch, Route } from "react-router-dom";
import Expo from "./Expo";
import Player from "./Player";

const ExpoRouter = ({ active, setActive, orderedData, setOrderedData }) => {
  return (
    <Switch>
      <Route
        exact
        path="/expo"
        render={({ match }) => (
          <Expo
            match={match}
            active={active}
            setActive={setActive}
            orderedData={orderedData}
            setOrderedData={setOrderedData}
          />
        )}
      />
      <Route path="/expo/:id" component={(match) => <Player match={match} active={active} setActive={setActive} orderedData={orderedData}/>} />
    </Switch>
  );
};

export default ExpoRouter;
