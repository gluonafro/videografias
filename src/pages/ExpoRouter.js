import React from "react";
import { Switch, Route } from "react-router-dom";
import Expo from "./Expo";
import Player from "./Player";

const ExpoRouter = ({ active, setActive, orderedData }) => {
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
          />
        )}
      />
      <Route path="/expo/:id" component={Player} />
    </Switch>
  );
};

export default ExpoRouter;
