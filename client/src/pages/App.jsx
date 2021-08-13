import React, {useEffect, useState} from "react";
import classes from './App.module.scss';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"; //используем CSS modules
import {useSelector} from 'react-redux';
import {default as sel} from '../redux/load/selectors';
import Users from "../components/users";
import AvatarName from "../components/avatarName";
import BulkPosts from '../components/bulkPosts';
import {useRouteMatch} from 'react-router-dom';

function App() {
    const [allUsersPosts, setAllUsersPosts] = useState([]);
    const [friendUsers, setfriendUsers] = useState([]);
    const [recommendedUsers, setRecommendedUsers] = useState([]);
    const [lastDate, setlastDate] = useState({});
    const activeUser = useSelector(sel.getActiveUser);
    const activeUserPosts = useSelector(sel.getActiveUserPosts);
    const match = useRouteMatch();


    const fetchUsers = () => {
        const url = `/users/`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                activeUserId: activeUser._id
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json())
            .then(async data => {
                    await setfriendUsers(data.friendList);
                    await setRecommendedUsers(data.RecommendedList);
                }
            ).catch((err) => console.error(err.message));
    };
    useEffect(() => {
        fetchUsers();
    }, []);


    const followUnfollowTrigger = ({target}) => {
        const {name} = target;
        alert(`к пользователю ${activeUser.userNick} добавлен/удалён friend с _id ${name}`);
        /* в "name" получаем _id юзера, ДОБАВЛЯЕМОГО в друзья к activeUser. TODO:
        * в коллекции users найти activeUser и добавить ему содержимое  "name"-а
        * в массив добавленных юзеров. Потом вынести этот массив в отдельную ref- коллекцию
        * юзеров, добавленных к activeUser
        *                                                                  */
    };

    //*** ПОЛУЧЕНИЕ ПОСТОВ ПОЛЬЗОВАТЕЛЕЙ ***//
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
        if (lastDate.length === 0) return;

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
            setlastDate(Date.parse("2030-09-02T13:11:35.374+00:00")); //-БД должна выдать ВСЕ посты
            // let lastDate = new Date("2021-09-02T13:11:35.374+00:00").getTime(); //либо так получим тот же timestamp
            // let lastDate = new Date("2021-08-01T13:11:35.370Z").getTime();
            // let lastDate = new Date("2021-05-09T09:18:45.647+00:00").getTime();
            // let lastDate = new Date("2021-01-09T09:18:45.648+00:00").getTime();  // БД не выдаст ни одного поста
        }
        fetchPosts();
    }, [lastDate]);

    /*
    friendUsers
recommendedUsers
*/

    const showMoreRecommendedBtn = <Button color="primary" size="small"
                                         onClick={null}>Show More Recommendations
    </Button>;


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


                    <Box className='added-users' minHeight='130px' border='1px solid darkgray'>
                        <p>Followers</p>
                        <Users users={friendUsers} handler={followUnfollowTrigger}/>
                        <Button color="primary" size="small"
                                onClick={null}>Show More followers
                        </Button>
                    </Box>
                    <Box className='recomended-users' minHeight='130px' border='1px solid darkgray'>
                        <p>Recommended</p>
                        <Users users={recommendedUsers} handler={followUnfollowTrigger}/>
                        {showMoreRecommendedBtn}
                    </Box>


                    <Box className='footer' minHeight='50px' border='1px solid darkgray'>
                        Footer Notes
                    </Box>
                </Grid>

            </Grid>
        </div>
    );
}

export default App;
