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

const PostModal = () => {
console.log("почему я постоянно пере-рендериваюсь?");
    const [postUser, setPostUser] = useState('');
    const useStyles = makeStyles({
        // boxGenStyle: {
        // }
    });
    const classes = useStyles();
    const activeUser = useSelector(sel.getActiveUser);
    const aPost = useSelector(sel.getPost);
    const comments = useSelector(sel.getComments);
    const aUser = useSelector(sel.getaUser);


useEffect(() => {
    if (aPost === undefined) return (<p>is loading</p>);
    const url = `/users_/${aPost.postedBy}`;
    fetch(url, {
        headers: {'Content-Type': 'application/json'}
    }).then(r => r.json())
        .then(res => setPostUser(res));
}, []);

    if (aPost === undefined) return (<p>is loading</p>);

    return (
        <>
            <Box id='header'>
                <h2 style={{fontSize: '8px', marginBottom: '8px'}}>modal</h2>
            </Box>

            <Grid container spacing={2}>

                <Grid item xs={8} className={`container  boxGenStyle`}>
                    <Box className={`post-picture  ${classes.boxStyle}  boxGenStyle`}>
                        <PostPicture picture={aPost.picture}/>
                    </Box>
                </Grid>

                <Grid item xs={4} display='flex' flex-direction='column'
                      className={`right-sidebar  ${classes.boxStyle} boxGenStyle`}>
                    <BoxStyled minHeight='50px' className={`right-header  ${classes.boxStyle}  boxGenStyle`}>
                        <a href='#'><AvatarName nick={aUser.userNick} src={aUser.avatarSrc}
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


`;