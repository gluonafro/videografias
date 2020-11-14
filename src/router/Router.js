import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Info from "../pages/Info";
import Comisarios from "../pages/Comisarios";
import ExpoRouter from "../pages/ExpoRouter";
import { data } from "../resources/data.json";
import randomArray from "../utils/randomArray";

const Router = () => {
  const [active, setActive] = useState(0);
  const [orderedData, setOrderedData] = useState(randomArray(data.length));
  const [orderBy, setOrderBy] = useState("random");

  return (
    <div>
      <Switch>
        <Route
          path="/expo"
          render={() => (
            <ExpoRouter
              active={active}
              setActive={setActive}
              orderedData={orderedData}
              setOrderedData={setOrderedData}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
            />
          )}
        />
        <Route path="/comisarios" component={Comisarios} />
        <Route path="/info" component={Info} />
        <Route exact path="/" component={Home} />
        <Redirect from="/*" to="/expo" />
      </Switch>
    </div>
  );
};

export default Router;
