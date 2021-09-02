import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import '@material-ui/system';
import AvatarName from "../components/avatarName";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {sel, types} from "../redux/load";
import PostPicture from '../components/postPicture';
import PostDiscription from '../components/postDiscription';
import PostComments from '../components/postComments';

const PostModal = () => {

    const dispatch=useDispatch();
    const aPost = useSelector(sel.getPost);
    const comments = useSelector(sel.getComments);
    const aUser = useSelector(sel.getaUser);

    if (aPost === undefined) return (<p>is loading</p>);

    return (
        <div>
            <button type='button' onClick={()=>{dispatch({type: types.CLOSE_MODAL, payload: false})}}
                    style={{marginBottom: '10px', color: 'red'}}>
                close window
            </button>

            <Grid container spacing={2}>

                <Grid item xs={8} className={`container  boxGenStyle`}>
                    <Box className={`post-picture  boxGenStyle`}>
                        <PostPicture picture={aPost.picture}/>
                    </Box>
                </Grid>

                <Grid item xs={4} display='flex' flex-direction='column'
                      className={`right-sidebar   boxGenStyle`}>
                    <BoxStyled minHeight='50px' className={`right-header   boxGenStyle`}>
                        <a href='#'><AvatarName nick={aUser.userNick} src={aUser.avatarSrc}
                                                large={true}/></a>

                    </BoxStyled>
                    <Box minHeight='60px' className={`post-discription  boxGenStyle`}>
                        <p style={{fontSize: "0.7em", textDecorationLine: 'underline',  marginBottom: '10px', marginTop: '10px'}}>Post Discription:</p>
                        <PostDiscription content={aPost.content}/>
                    </Box>
                    <Box minHeight='220px' className={`comments   boxGenStyle`}>
                        <p style={{fontSize: "0.7em", textDecorationLine: 'underline', marginBottom: '10px', marginTop: '10px'}}>Comments:</p>
                        <PostComments rawComments={comments} showAll={true}/></Box>

                    <Box minHeight='30px' className={`footer   boxGenStyle`}>footer</Box>
                </Grid>

            </Grid>
        </div>
    );
};

export default PostModal;

const BoxStyled = styled(Box)`

`;