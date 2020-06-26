import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Expo from '../pages/Expo'
import Info from '../pages/Info'
import Comisarios from '../pages/Comisarios'

const Router = () => {
    return (
        <div>
            <Switch>
                <Route path="/info" component={Info}/>
                <Route path="/expo" component={Expo}/>
                <Route path="/comisarios" component={Comisarios}/>
                <Route path="/" component={Home}/>
            </Switch>
        </div>
        )
}


export default Router;