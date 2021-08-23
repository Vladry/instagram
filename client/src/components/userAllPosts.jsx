import React from 'react';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {act} from "../redux/load";
import {useDispatch} from 'react-redux';

const UserAllPosts = ({data}) => {
    const history = useHistory();
    const dispatch = useDispatch();


    const onePostHandler = ({target}) => {
        if (!target.src) return;
        dispatch(act.getPostAndComments(target.src));
        history.push('/post/');
    };

        let allPosts = [];
        if (data) {
            allPosts = data.map((aPost, index) => {
                const {date, content, picture, likes} = aPost;
                return (
                    <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                        <Box>
                            <img data-name={index} src={picture} width='190px'
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
            </Grid>
        );
    }
;

export default UserAllPosts;