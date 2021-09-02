import React from 'react';
import Grid from '@material-ui/core/Grid';
import {act} from "../redux/load";
import {useDispatch} from 'react-redux';
import ModalCustom from "./modalCustom";


import UserCard from '../components/userCard';

const UserAllPosts = ({data}) => {
        const dispatch = useDispatch();


        const onePostHandler = ({target}) => {
            if (!target.src) return;
            dispatch(act.getPostAndComments(target.src));
        };

        let allPosts = [];
        if (data) {
            allPosts = data.map(  (aPost) =>
                <UserCard post={aPost}/>)
        }

        return (
            <Grid container spacing={1} justifyContent='space-between' wrap='wrap' alignItems='center'
                  onClick={onePostHandler}>
                {allPosts}
                <ModalCustom/>
            </Grid>
        );
    }
;

export default UserAllPosts;


