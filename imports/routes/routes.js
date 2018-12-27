import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import SignUp from '../ui/SignUp';
import Link from '../ui/Link';
import Login from '../ui/Login';
import NotFound from '../ui/NotFound';

const history = createHistory({
    forceRefresh: true
});

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

export const onAuthChange = (isAuthenticated) => {

    const pathname = history.location.pathname;
    isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    isAuthenticatedPage = authenticatedPages.includes(pathname);

    if(isAuthenticated && isUnauthenticatedPage){
        history.replace('/links');
    }
    else if (isAuthenticatedPage && !isAuthenticated) {
        history.replace('/');
    }

};

export const routes = (

    <Router history={history}>
        <Switch>
            <Route path="/" exact={true} component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/links" component={Link}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </Router>


);