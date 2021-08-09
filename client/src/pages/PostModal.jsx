import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";
import '@material-ui/system';

const PostModal = ({match}) => {


    useEffect(() => {
        const postId = match.params.postId;
        const url = `/post/${postId}`;

    }, []);

    return (
        <>
            <Box className='header'>
                <h2>this is a page with a single post of a user</h2>
            </Box>

            <Grid container spacing={2}>

                <Grid item xs={8} className='left-scroll-items'>
                    <Box className='left-header' minHeight='50px' border='1px solid darkgray'>left-header
                        <Avatar alt="user-avatar"
                                src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg"/>
                    </Box>
                    <Box border='1px solid darkgray' height='300px'>Big Picture</Box>
                </Grid>

                <Grid  item xs={2} className='right-sidebar' display='flex' flex-direction='column' >
                    <Box className='right-header' minHeight='50px' border='1px solid darkgray'>right-header
                        <Avatar alt="user-avatar"
                                src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg"/>
                    </Box>
                    <Box className='added-users' minHeight='60px' border='1px solid darkgray'>Post Discription</Box>
                    <Box className='recomended-users' minHeight='220px' border='1px solid darkgray'>Comments</Box>
                    <Box className='footer' minHeight='30px' border='1px solid darkgray'>footer</Box>
                </Grid>

            </Grid>
        </>
    );
};

export default PostModal;