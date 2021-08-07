import React, {useState, useEffect} from "react";
import classes from './App.module.scss';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SendOutlinedIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Button from "@material-ui/core/Button"; //используем CSS modules
import Avatar from "@material-ui/core/Avatar";

function App() {
    localStorage.setItem('userNick', "Vlad");

    return (
        <div className={classes.App}>
            <h2>Main Page - User profile</h2>


            <Grid container spacing={2}>

                <Grid item xs={8} className='left-scroll-items'>
                    <Box className='left-header' minHeight='50px' border='1px solid darkgray'>left-header
                        <Avatar alt="user-avatar" src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg"/></Box>
                    <Box className='Scroll-items' minHeight='350px'
                         display='flex' flexDirection='column' border='1px solid darkgray'>Scroll-items</Box>
                </Grid>

                <Grid item xs={2} className='right-sidebar' display='flex'
                      flexDirection='column' justifyContent='center'>

                    <Box className='right-header' minHeight='50px' border='1px solid darkgray'>right-header
                        <Avatar alt="user-avatar" src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg"/></Box>

                    <Box className='added-users' minHeight='130px' border='1px solid darkgray'>added users</Box>
                    <Box className='recomended-users' minHeight='130px' border='1px solid darkgray'>recommended users</Box>

                    <Box className='footer' minHeight='50px' border='1px solid darkgray'>
                        <Button variant="outlined" color="primary" onClick={() => {
                            alert('clicked')
                        }}>
                        </Button>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
}

export default App;
