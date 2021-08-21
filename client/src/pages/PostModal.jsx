import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import '@material-ui/system';
import {makeStyles} from '@material-ui/core/styles';
import AvatarName from "../components/avatarName";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {sel} from "../redux/load";
// import {useRouteMatch} from 'react-router-dom';
import PostPicture from '../components/postPicture';
import PostDiscription from '../components/postDiscription';
import PostComments from '../components/postComments';

const PostModal = ({match}) => {
    const useStyles = makeStyles({
        // boxGenStyle: {
        // }
    });
    const classes = useStyles();
    const activeUser = useSelector(sel.getActiveUser);
    // const match = useRouteMatch();
    const aPost = useSelector(sel.getPost);
    const comments = useSelector(sel.getComments);
    if (aPost === undefined) return (<p>is loading</p>);
    console.log("in PostModal.  aPost: ", aPost);
    console.log("in PostModal.  aPost.content: ", aPost.content);
    console.log("in PostModal.  aPost.picture: ", aPost.picture);

    // useEffect(() => {
    //     const postId = match.params.postId;
    //     const url = `/post/${postId}`;
    //
    // }, []);

    return (
        <>
            <Box id='header'>
                <h2>user post</h2>
            </Box>

            <Grid container spacing={2}>

                <Grid item xs={8} className={`container  boxGenStyle`}>
                    <Box height='300px' className={`post-picture  ${classes.boxStyle}  boxGenStyle`}>
                        <PostPicture picture={aPost.picture}/>
                    </Box>
                </Grid>

                <Grid item xs={4} display='flex' flex-direction='column'
                      className={`right-sidebar  ${classes.boxStyle} boxGenStyle`}>
                    <BoxStyled minHeight='50px' className={`right-header  ${classes.boxStyle}  boxGenStyle`}>
                        <a href='#'><AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}
                                                large={true}/></a>
                    </BoxStyled>
                    <Box minHeight='60px' className={`post-discription  ${classes.boxStyle}  boxGenStyle`}>
                        <p style={{fontSize: "0.7em", textDecorationLine: 'underline', marginBottom: '3px'}}>Post Discription:</p>
                        <PostDiscription content={aPost.content}/>
                    </Box>
                    <Box minHeight='220px' className={`comments  ${classes.boxStyle}  boxGenStyle`}>
                        <p style={{fontSize: "0.7em", textDecorationLine: 'underline', marginBottom: '3px'}}>Comments:</p>
                        <PostComments comments={comments}/></Box>
                    <Box minHeight='30px' className={`footer  ${classes.boxStyle}  boxGenStyle`}>footer</Box>
                </Grid>

            </Grid>
        </>
    );
};

export default PostModal;

const BoxStyled = styled(Box)`
//border: 1px solid lightgray;
//box-shadow: 4px 4px 8px 1px rgba(34, 60, 80, 0.2);
`;