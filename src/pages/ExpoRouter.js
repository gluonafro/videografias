import React from "react";
import { Switch, Route } from "react-router-dom";
import Expo from "./Expo";
import Player from "./Player";
import PlayerMobile from "./PlayerMobile";
import { useIsMobile } from "../hooks/useMediaQuery";

const ExpoRouter = ({ active, setActive, orderedData, setOrderedData }) => {
  const isMobile = useIsMobile();
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
      <Route
        path="/expo/:id"
        render={({ match }) =>
          isMobile ? (
            <PlayerMobile match={match} />
          ) : (
            <Player
              match={match}
              active={active}
              setActive={setActive}
              orderedData={orderedData}
            />
          )
        }
      />
    </Switch>
  );
};

export default ExpoRouter;
