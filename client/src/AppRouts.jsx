import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import PostModal from './pages/PostModal';
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
                <Route exact path={'/'} render={()=><Redirect to={`/posts/latest/:date/:limit/:activeUserId`}/> }/>
                <Route path={`/posts/latest/:date/:limit/:activeUserId`} component={App}/>
                <Route exact path={`/posts/:userNick`} render = { (rProps)=> <UserPosts {...rProps} /> } />
                <Route path={'/post/'}   component={PostModal}/>
                {/*<Route path={'/post/:postId'}    component={PostModal}/>*/}
                {/*<Route path={'/post/:postId'}    render = { (rProps)=> <PostModal {...rProps} /> } />*/}
                <Route path={'/utils'} component={Utils}/>
                <Route path={'*'} component={ErrorMessage}/>
                {/*<Route path={'posts/:id'} component={NavBar} />*/}
            </Switch>
        </div>
    );
};
export default AppRouts;