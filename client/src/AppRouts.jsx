import React from 'react';
import {Switch, Route} from 'react-router-dom';

import SinglePostPage from './pages/singlePostPage';
import UserPosts from './pages/userPosts';
import ErrorMessage from "./components/ErrorBoundary/ErrorMessage";
import App from './pages/App';
import NavBar from "./components/navBar";
import Utils from "./pages/utils";

const AppRouts = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path={'/'} component={App}/>
                <Route path={'/posts/Vlad'} component={UserPosts}/>
                <Route path={'/post/610d3507990be0484026c701'} component={SinglePostPage}/>
                <Route path={'/utils'} component={Utils}/>
                <Route path={'*'} component={ErrorMessage}/>
            </Switch>
        </div>
    );
};
export default AppRouts;