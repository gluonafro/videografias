import React from "react";
import { Switch, Route } from "react-router-dom";
import Expo from "./Expo";
import Player from "./Player";
import PlayerMobile from "./PlayerMobile";
import { useIsMobile } from "../hooks/useMediaQuery";

const ExpoRouter = (props) => {
  const isMobile = useIsMobile();
  return (
    <Switch>
      <Route
        exact
        path="/expo"
        render={({ match }) => <Expo match={match} {...props} />}
      />
      <Route
        path="/expo/:id"
        render={({ match }) =>
          isMobile ? (
            <PlayerMobile match={match} />
          ) : (
            <Player
              match={match}
              active={props.active}
              setActive={props.setActive}
              orderedData={props.orderedData}
            />
          )
        }
      />
    </Switch>
  );
};

export default ExpoRouter;
