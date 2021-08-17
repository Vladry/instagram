import React, {useEffect, useState} from "react";
import classes from './App.module.scss';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useSelector, useDispatch} from 'react-redux';
import Users from "../components/users";
import AvatarName from "../components/avatarName";
import BulkPosts from '../components/bulkPosts';
import {useRouteMatch} from 'react-router-dom';
import ShowMoreButton from '../components/showMoreButton';
import styled from 'styled-components';
import {sel, act} from '../redux/load/';

function App() {

    /*** ИСХОДНЫЕ ЗНАЧЕНИЯ ДЛЯ БЛОКА СПИСКОВ ПОЛЬЗОВАТЕЛЕЙ ***/
    const listLimit = 1; //макс кол-во юзеров к показу по-умолчанию в правых колонках MainPage
    const [biasFList, setBiasFList] = useState(1); //шаги смещения при пролистывании списков followers и recommended юзеров.
    const [biasRList, setBiasRList] = useState(1); //шаги смещения при пролистывании списков followers и recommended юзеров.
    const [amountFollowers, setAmountFollowers] = useState(0); //
    const [amountRecommended, setAmountRecommended] = useState(0); //
    const calcBtnText = () => {
        let followerBtnText = amountFollowers - biasFList;
        followerBtnText = (followerBtnText < 0) ? 0 : followerBtnText; //исключить уход ниже нуля
        let recommendedBtnText = amountRecommended - biasRList;
        recommendedBtnText = (recommendedBtnText < 0) ? 0 : recommendedBtnText;
        return [`${followerBtnText} more`, `${recommendedBtnText} more`]
    };
    const btnText = calcBtnText();

    const [followerUsers, setFollowerUsers] = useState([]);
    const [recommendedUsers, setRecommendedUsers] = useState([]);

    const [btnFolVisible, setBtnFolVisible] = useState(false);
    const [btnRecVisible, setBtnRecVisible] = useState(false);
    const dispatch = useDispatch();

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
            // let lastDate = new Date("2021-01-09T09:18:45.648+00:00").getTime();  // БД не выдаст ни одного поста
        }
        fetchPosts();
        window.scrollTo({
            top: 0,
            behaviour: 'smooth'
        });
    }, [lastDate]);
    /*-----------------------------------------------------------------------------------*/

    const followUnfollowTrigger = ({target}) => {
        dispatch(act.toggleContactStatus(target.textContent, activeUser._id));
    };


    return (
        <div className={classes.App}>
            <h2>Main Page</h2>


            <Grid container spacing={2}>

                <Grid item xs={8} className='left-scroll-items'>
                    <BoxStyled className='left-header' minHeight='30px'>
                        <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}/>
                    </BoxStyled>
                    <BoxStyled className='Scroll-items' minHeight='350px'
                    >Feed

                        <BulkPosts posts={allUsersPosts}/>
                        <Button variant="outlined" color="primary"
                                onClick={incrementDate}>Show More Posts
                        </Button>

                    </BoxStyled>
                </Grid>

                <Grid item xs={2} className='right-sidebar' display='flex'
                      flex-direction='column'>

                    <BoxStyled className='right-header' width='190%'>
                        <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}
                                    large={true}/>
                    </BoxStyled>


                    <BoxStyled className='added-users' minHeight='130px' style={righSidebar}>
                        <p>Followers</p>
                        <Users users={followerUsers} handler={followUnfollowTrigger}/>
                        <ShowMoreButton text={btnText[0]} isVisible={btnFolVisible} handler={showFullLists}/>
                    </BoxStyled>
                    <BoxStyled className='recomended-users' minHeight='130px' style={righSidebar}>
                        <p>Recommended</p>
                        <Users users={recommendedUsers} handler={followUnfollowTrigger}/>
                        <ShowMoreButton text={btnText[1]} isVisible={btnRecVisible} handler={showFullLists}/>
                    </BoxStyled>


                    <BoxStyled className='footer' minHeight='50px' style={righSidebar}>
                        Footer Notes
                    </BoxStyled>
                </Grid>

            </Grid>
        </div>
    );
}

export default App;

const BoxStyled = styled(Box)`
border: 1px solid lightgray;
box-shadow: 4px 4px 8px 1px rgba(34, 60, 80, 0.2);
`;

const righSidebar = {
    width: '190%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '3px auto',
};