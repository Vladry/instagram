import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {act} from "../redux/load";
import {useDispatch} from 'react-redux';
import ModalCustom from "./modalCustom";
import styled from "styled-components";

const UserAllPosts = ({data}) => {
    const dispatch = useDispatch();


    const onePostHandler = ({target}) => {
        if (!target.src) return;
        dispatch(act.getPostAndComments(target.src));
    };

        let allPosts = [];
        if (data) {
            allPosts = data.map((aPost, index) => {
                const {date, content, picture, likes} = aPost;
                return (
                    <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                        <Box>
                            <StyledImg data-name={index} src={picture} width='190px'
                                 alt='a-post-picture'/>
                        </Box>
                    </Grid>
                );
            })
        }

        return (
            <Grid container spacing={1} justifyContent='space-between' wrap='wrap' alignItems='center'
                  onClick={onePostHandler} >
                {allPosts}
                <ModalCustom/>
            </Grid>
        );
    }
;

export default UserAllPosts;

const StyledImg = styled.img`
border-radius: 10px;
border: 3px solid cadetblue;
transition-duration: 0.1s;
&:hover {
filter: brightness(0.6);
transition-duration: 0.1s;
};
`;