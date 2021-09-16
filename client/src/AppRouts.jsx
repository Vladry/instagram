import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import PostModal from './pages/PostModal';
import UserPosts from './pages/userPosts';
import ErrorMessage from "./components/ErrorBoundary/ErrorMessage";
import App from './pages/App';
import NavBar from "./components/navBar";


const AppRouts = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path={'/'} render={()=><Redirect to={`/posts/latest/`}/> }/>
                <Route path={`/posts/latest/`} component={App}/>
                <Route exact path={`/posts/:userNick`} component={UserPosts}/> />
                <Route path={'/post/'}   component={PostModal}/>
                <Route path={'*'} component={ErrorMessage}/>
            </Switch>
        </div>
    );
};
export default AppRouts;