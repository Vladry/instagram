import React, {useEffect, useState} from "react";
import classes from './App.module.scss';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"; //используем CSS modules
import {useSelector} from 'react-redux';
import {default as sel} from '../redux/load/selectors';
import UsersInDB from "../components/usersInDB";
import AvatarName from "../components/avatarName";
import BulkPosts from '../components/bulkPosts';
import {useRouteMatch} from 'react-router-dom';

function App() {
    const [allUsersPosts, setAllUsersPosts] = useState([]);
    const [lastDate, setlastDate] = useState({});
    const activeUser = useSelector(sel.getActiveUser);
    const activeUserPosts = useSelector(sel.getActiveUserPosts);
    const match = useRouteMatch();


    const incrementDate = () => {
        if (allUsersPosts.length > 0) {
            setlastDate(Date.parse(allUsersPosts[allUsersPosts.length - 1].date));
        } else {
            setlastDate(new Date("3000-07-26").getTime());
        }
    };

    const fetchPosts = () => {
        const {limit, activeUserId} = match.params;
        const allUsersPostsUrl = `/posts/latest/${lastDate}/${limit}/${activeUserId}`;

        fetch(allUsersPostsUrl, {
            headers: {
                'Context-Type': 'application/json'
            }
        }).then(r => r.json())
            .then(async data => await setAllUsersPosts(data));
    };

    useEffect(() => {
        // Перебор-подстановка дат для тестирования fetch-запроса на сервер:
        if (allUsersPosts.length === 0) {
            setlastDate(new Date("3000-07-26").getTime()); //-БД должна выдать ВСЕ посты
            // let lastDate = new Date("2021-09-02T13:11:35.374+00:00").getTime();
            // let lastDate = new Date("2021-08-01T13:11:35.370Z").getTime();
            // let lastDate = new Date("2021-05-09T09:18:45.647+00:00").getTime();
            // let lastDate = new Date("2021-01-09T09:18:45.648+00:00").getTime();  // БД не выдаст ни одного поста
        }

        fetchPosts();
    }, [lastDate]);


    return (
        <div className={classes.App}>
            <h2>Main Page</h2>


            <Grid container spacing={2}>

                <Grid item xs={8} className='left-scroll-items'>
                    <Box className='left-header' minHeight='50px' border='1px solid darkgray'>
                        <p>left-header</p>
                        <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}/>
                    </Box>
                    <Box className='Scroll-items' minHeight='350px'
                         border='1px solid darkgray'>Latest feed

                        <BulkPosts posts={allUsersPosts}/>
                        <Button variant="outlined" color="primary"
                                onClick={incrementDate}>Show More Posts
                        </Button>

                    </Box>
                </Grid>

                <Grid item xs={2} className='right-sidebar' display='flex'
                      flex-direction='column'>

                    <Box className='right-header' minHeight='50px' border='1px solid darkgray'><p>right-header</p>
                        <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}/>
                    </Box>

                    <Box className='added-users' minHeight='130px' border='1px solid darkgray'>added users</Box>
                    <Box className='recomended-users' minHeight='130px' border='1px solid darkgray'>
                        <p>recommended users</p>
                        <UsersInDB/>
                    </Box>

                    <Box className='footer' minHeight='50px' border='1px solid darkgray'>
                        <Button variant="outlined" color="primary"
                                onClick={null}>Show More Users
                        </Button>
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
}

export default App;
