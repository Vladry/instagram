import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const AllUserPosts = ({data}) => {
        let allPosts = [];
        if (data) {
            allPosts = data.map((aPost, index) => {
                const {date, content, picture, likes} = aPost;

                return (
                    <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                        <Box>
                            <img src={picture} width='190px'
                                 alt='user-avatar'/>
                        </Box>
                    </Grid>
                );
            })
        }

        return (
            <Grid container spacing={1} justifyContent='space-between' wrap='wrap' alignItems='center'>
                {allPosts}
            </Grid>
        );
    }
;

export default AllUserPosts;