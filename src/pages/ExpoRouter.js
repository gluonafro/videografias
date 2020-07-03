import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Expo from './Expo'
import Player from './Player'

const ExpoRouter = () => {
    return (
        <Switch>
            <Route exact path="/expo" component={Expo}/>
            <Route path="/expo/:id" component={Player}/>
        </Switch>
    )
}

export default ExpoRouter;