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
import ShowMoreButton from '../components/showMoreButton';

function App() {

    /*** ИСХОДНЫЕ ЗНАЧЕНИЯ ДЛЯ БЛОКА СПИСКОВ ПОЛЬЗОВАТЕЛЕЙ ***/
    const listLimit = 1; //макс кол-во юзеров к показу по-умолчанию в правых колонках MainPage
    const [biasFList, setBiasFList] = useState(1); //шаги смещения при пролистывании списков followers и recommended юзеров.
    const [biasRList, setBiasRList] = useState(1); //шаги смещения при пролистывании списков followers и recommended юзеров.
    const [amountFollowers, setAmountFollowers] = useState(0); //
    const [amountRecommended, setAmountRecommended] = useState(0); //
    const btnText = [`Show other ${amountFollowers - biasFList} Followers`, `Show other ${amountRecommended - biasRList} Recommendations`];

    const [followerUsers, setFollowerUsers] = useState([]);
    const [recommendedUsers, setRecommendedUsers] = useState([]);

    const [btnFolVisible, setBtnFolVisible] = useState(false);
    const [btnRecVisible, setBtnRecVisible] = useState(false);

    /*** УПРАВЛЕНИЕ ФЕТЧЕВАНИЕМ СПИСКОВ ПОЛЬЗОВАТЕЛЕЙ ***/
    const showFullLists = ({target}) => {
        if (target.textContent === btnText[0]) {
            setBiasFList(biasFList + listLimit);
            if (biasFList + 1 >= amountFollowers) {
                setBtnFolVisible(false)
            }

            //а фетчинг теперь произойдет после пере-рендеринга в useEffect()
        } else {
            if (recommendedUsers.length === 0) {
                setBtnRecVisible(false);
            }
            setBiasRList(biasRList + listLimit);
            if (biasRList + 1 >= amountRecommended) {
                setBtnRecVisible(false);
            }
            //а фетчинг теперь произойдет после пере-рендеринга в useEffect()
        }
    };
    const fetchUsers = (userType, offset) => {
        const url = `/users/`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                activeUserId: activeUser._id,
                skip: offset,
                limit: listLimit,
                userType: userType
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json())
            .then(data => {
                    const [userList, amount] = data;
                    if (userType === "followers") {
                        setFollowerUsers(userList);
                        setAmountFollowers(amount);

                    } else if (userType === "recommended") {
                        setRecommendedUsers(userList);
                        setAmountRecommended(amount);
                    }

                }
            ).catch((err) => console.error(err.message));
    };
    /*** ПОЛУЧЕНИЕ Followers ПОЛЬЗОВАТЕЛЕЙ ***/
    useEffect(() => {
        fetchUsers("followers", biasFList);
    }, [biasFList]);
    /*** ПОЛУЧЕНИЕ Recommended ПОЛЬЗОВАТЕЛЕЙ ***/
    useEffect(() => {
        fetchUsers("recommended", biasRList);
    }, [biasRList]);
    /*** БЛОК ВКЛЮЧЕНИЯ КНОПОК ПОКАЗА ДОП.СПИСКОВ ФОЛЛОВЕРОВ И РЕКОММЕНДОВАННЫХ***/
    useEffect(() => {
        setBtnFolVisible(true);
        setBtnRecVisible(true);
    }, []);
    /*-----------------------------------------------------------------------------------*/


    /*** БЛОК ПОДГОТОВКИ К ПОЛУЧЕНИЮ СПИСКОВ ПОСТОВ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ И ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ В СИСТЕМЕ ***/
        // сюда порциями будут поступать блоки постов юзера, с пагинацией по клику (в будущем по infinity scroll):
    const [allUsersPosts, setAllUsersPosts] = useState([]);
    const [lastDate, setlastDate] = useState({});
    const activeUser = useSelector(sel.getActiveUser);
    const activeUserPosts = useSelector(sel.getActiveUserPosts);
    const match = useRouteMatch();

    /*** ПОЛУЧЕНИЕ ПОСТОВ ПОЛЬЗОВАТЕЛЕЙ ***/
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
    /*-----------------------------------------------------------------------------------*/

    const followUnfollowTrigger = ({target}) => {
        const {name} = target;
        alert(`к пользователю ${activeUser.userNick} добавлен/удалён friend с _id ${name}`);
        /* в "name" получаем _id юзера, ДОБАВЛЯЕМОГО в друзья к activeUser. TODO:
        * в коллекции users найти activeUser и добавить ему содержимое  "name"-а
        * в массив добавленных юзеров. Потом вынести этот массив в отдельную ref- коллекцию
        * юзеров, добавленных к activeUser
        *                                                                  */
    };


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
                        <Users users={followerUsers} handler={followUnfollowTrigger}/>
                        <ShowMoreButton text={btnText[0]} isVisible={btnFolVisible} handler={showFullLists}/>
                    </Box>
                    <Box className='recomended-users' minHeight='130px' border='1px solid darkgray'>
                        <p>Recommended</p>
                        <Users users={recommendedUsers} handler={followUnfollowTrigger}/>
                        <ShowMoreButton text={btnText[1]} isVisible={btnRecVisible} handler={showFullLists}/>
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
