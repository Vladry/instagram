import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {act, sel} from '../redux/load';
import UserAllPosts from "../components/userAllPosts";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";


const UserPosts = ({match}) => {
    const currentUserPosts = useSelector(sel.getCurrentUserPosts);
    const activeUser = useSelector(sel.getActiveUser);
    const currentUser = useSelector(sel.getCurrentUser);
    const dispatch = useDispatch();
    let userIsBeingFollowed = false;
    if (currentUser.addedByUsersID && currentUser.addedByUsersID.length > 0) {
        userIsBeingFollowed = (currentUser.addedByUsersID.some(id => id === activeUser._id));
    }

    //фечуем все посты текущего юзера
    const userNick = match.params.userNick;
    useEffect(() => {
        dispatch(act.loadUserPosts(`/posts/${userNick}`));

        // фечуем данные текущего юзера
        dispatch(act.loadOneUser(`/users/${userNick}`));
    }, [userNick, useSelector(sel.getUpdatedUser)]);

    return (
        <Box className='user-posts'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='20px'>
                <div className='user-avatar'>
                    <Avatar alt="user-avatar"
                            src={currentUser.avatarSrc}
                    />

                </div>
                <Box marginLeft='20px' marginRight='20px'><h3>Посты пользователя: {currentUser.userNick}</h3></Box>
                <Button size='small' color="primary" onClick={() => {
                    dispatch(act.toggleContactStatus(currentUser.userNick, activeUser._id));
                }}
                    >{userIsBeingFollowed ? 'Отписаться' : 'Подписаться'}</Button>
                    </Box>

                    <UserAllPosts data={currentUserPosts}/>

                    </Box>
                    )
                    ;
                    };

                    export default UserPosts;