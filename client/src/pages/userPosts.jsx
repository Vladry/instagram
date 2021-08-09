import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {act} from '../redux/load';
import {sel} from '../redux/load';

import UserAllPosts from "../components/userAllPosts";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";


const UserPosts = ({match}) => {
    const activeUserPosts = useSelector(sel.getActiveUserPosts);
    const activeUser      = useSelector(sel.getActiveUser);
    const dispatch = useDispatch();

    useEffect(() => {
        //фечуем все посты текущего юзера
        const userNick = match.params.userNick;
        dispatch(act.loadUserPosts(`/posts/${userNick}`));

        // фечуем данные текущего юзера
        dispatch(act.loadOneUser(`/users/${userNick}`));

    }, []);


    return (
        <Box className='user-posts'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='20px'>
                <div className='user-avatar'>
                    <Avatar alt="user-avatar"
                            src={activeUser.avatarSrc}
                    />

                </div>
                <Box marginLeft='20px' marginRight='20px'><h3>Страница пользователя: {activeUser.userNick}</h3></Box>
                <Button size='small' color="primary">Отслеживать</Button>
            </Box>

            <UserAllPosts data={activeUserPosts}/>

        </Box>
    )
        ;
};

export default UserPosts;