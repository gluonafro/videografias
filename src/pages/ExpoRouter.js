import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Expo from "./Expo";
import Player from "./Player";
import PlayerMobile from "./PlayerMobile";
import { useIsMobile } from "../hooks/useMediaQuery";
import { data } from "../resources/data.json";

const ExpoRouter = (props) => {
  const isMobile = useIsMobile();
  const [zoomMob, setZoomMob] = React.useState(true);
  const [scrollPos, setScrollPos] = React.useState(-50);

  return (
    <Switch>
      <Route
        exact
        path="/expo"
        render={({ match }) => (
          <Expo
            match={match}
            zoomMob={zoomMob}
            setZoomMob={setZoomMob}
            scrollPos={scrollPos}
            setScrollPos={setScrollPos}
            {...props}
          />
        )}
      />
      <Route
        path="/expo/:id"
        render={({ match }) =>
          !data[match.params.id] ? (
            <Redirect to="/expo" />
          ) : isMobile ? (
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
