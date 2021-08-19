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

const PostModal = ({match}) => {
const useStyles = makeStyles({
    // boxGenStyle: {
    //     border: '1px solid lightgray',
    // }
});
const classes = useStyles();
    const activeUser = useSelector(sel.getActiveUser);
    // const match = useRouteMatch();

    useEffect(() => {
        const postId = match.params.postId;
        const url = `/post/${postId}`;

    }, []);

    return (
        <>
            <Box id='header'>
                <h2>user post</h2>
            </Box>

            <Grid container spacing={2}>

                <Grid item xs={8} className= {`container  boxGenStyle`}>
                    <Box height='300px' className= {`post-picture  ${classes.boxStyle}  boxGenStyle`}>Big Picture</Box>
                </Grid>

                <Grid  item xs={4} display='flex'  flex-direction='column'
                       className= {`right-sidebar  ${classes.boxStyle} boxGenStyle`}>
                    <BoxStyled minHeight='50px' className= {`right-header  ${classes.boxStyle}  boxGenStyle`}>
                        <a href='#'><AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}
                                    large={true}/></a>
                    </BoxStyled>
                    <Box minHeight='60px' className= {`post-discription  ${classes.boxStyle}  boxGenStyle`}>Post Discription</Box>
                    <Box minHeight='220px' className= {`comments  ${classes.boxStyle}  boxGenStyle`}>Comments</Box>
                    <Box minHeight='30px' className= {`footer  ${classes.boxStyle}  boxGenStyle`}>footer</Box>
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