import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Expo from '../pages/Expo'
import Info from '../pages/Info'
import Comisarios from '../pages/Comisarios'
import Player from '../pages/Player'
import ExpoRouter from '../pages/ExpoRouter'

const Router = () => {
    return (
        <div>
            <Switch>
                <Route path="/info" component={Info}/>
                <Route path="/expo" component={ExpoRouter}/>
                <Route path="/comisarios" component={Comisarios}/>
                <Route exact path="/" component={Home}/>
            </Switch>
        </div>
        )
}


export default Router;