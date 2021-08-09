import React from "react";
import classes from './App.module.scss';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"; //используем CSS modules
import Avatar from "@material-ui/core/Avatar";
// import { palette, spacing, typography } from '@material-ui/system';
import {useSelector} from 'react-redux';
import {default as sel} from '../redux/load/selectors';
import UsersInDB from "../components/usersInDB";
import AvatarName from "../components/avatarName";

function App() {
    const activeUser = useSelector(sel.getActiveUser);
    const userPosts = useSelector(sel.getActiveUserPosts);

    return (
        <div className={classes.App}>
            <h2>Main Page - User profile</h2>


            <Grid container spacing={2}>

                <Grid item xs={8} className='left-scroll-items'>
                    <Box className='left-header' minHeight='50px' border='1px solid darkgray'>
                        <p>left-header</p>
                        <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc} />
                    </Box>
                        <Box className='Scroll-items' minHeight='350px'
                         display='flex' flex-direction='column' border='1px solid darkgray'>Scroll-items
                    </Box>
                </Grid>

                <Grid item xs={2} className='right-sidebar' display='flex'
                      flex-direction='column'>

                    <Box className='right-header' minHeight='50px' border='1px solid darkgray'><p>right-header</p>
                        <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc} />
                    </Box>

                    <Box className='added-users' minHeight='130px' border='1px solid darkgray'>added users</Box>
                    <Box className='recomended-users' minHeight='130px' border='1px solid darkgray'>
                        <p>recommended users</p>
                        <UsersInDB/>
                    </Box>

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
