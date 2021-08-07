import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";


const UserPosts = () => {

    return (
        <Box className='user-posts'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='20px'>
                <div className='user-avatar'>
                    <Avatar alt="user-avatar"
                            src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg"/>

                </div>
                <Box marginLeft='20px' marginRight='20px'><h3>userNick</h3></Box>
                <Button size='small' color="primary">Отслеживать</Button>
            </Box>

            <Grid container spacing={1} justifyContent='space-between' wrap='wrap' flexDirection='row'
                  flex='0 0 33%'>
                {/*<Grid item sm={2} md={3} lg={4} xl={4}>all my pictures in Grid go here</Grid>*/}
                <Grid item xs={6} sm={4} md={3} lg={2}><Box border='1px solid darkgray'>all my pictures in Grid go here
                    <img src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg" width='120px'
                         alt='user-avatar'/>
                </Box></Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}><Box border='1px solid darkgray'>all my pictures in Grid go here
                    <img src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg" width='120px'
                         alt='user-avatar'/>
                </Box></Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}><Box border='1px solid darkgray'>all my pictures in Grid go here
                    <img src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg" width='120px'
                         alt='user-avatar'/>
                </Box></Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}><Box border='1px solid darkgray'>all my pictures in Grid go here
                    <img src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg" width='120px'
                         alt='user-avatar'/>
                </Box></Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}><Box border='1px solid darkgray'>all my pictures in Grid go here
                    <img src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg" width='120px'
                         alt='user-avatar'/>
                </Box></Grid>
                <Grid item xs={6} sm={4} md={3} lg={2}><Box border='1px solid darkgray'>all my pictures in Grid go here
                    <img src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg" width='120px'
                         alt='user-avatar'/>
                </Box></Grid>


            </Grid>
        </Box>
    )
        ;
};

export default UserPosts;