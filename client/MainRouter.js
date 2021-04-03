import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Signin from './auth/Signin';
import Home from './core/Home'
import Profile from './user/Profile';
import Signup from './user/Signup';
import Users from './user/Users';

const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/users' component={Users} />
                <Route path='/signup' component={Signup} />
                <Route path='/signin' component={Signin} />
                <Route path='/user/:userId' component={Profile} />
            </Switch>
        </div>
    )
}

export default MainRouter;