import React from 'react';
import {useHistory} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const UserAllPosts = ({data}) => {
    const history = useHistory();

        let postSelected = null;
        const showOnePost = ({target}) => {
            // console.log(target.src); //получили ссылку на картинку
            postSelected = data[target.getAttribute('data-name')];
            console.dir(postSelected);
            history.push('/posts/1');
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
                  onClick={showOnePost}>
                {allPosts}
            </Grid>
        );
    }
;

export default UserAllPosts;