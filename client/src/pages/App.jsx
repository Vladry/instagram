import React, {useEffect, useState, useRef} from "react";
import classes from './App.module.scss';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useSelector, useDispatch} from 'react-redux';
import Users from "../components/users";
import AvatarName from "../components/avatarName";
import BulkPosts from '../components/bulkPosts';
import ShowMoreButton from '../components/showMoreButton';
import styled from 'styled-components';
import {sel, act} from '../redux/load/';
import ModalCustom from '../components/modalCustom';
import {types} from "../redux/load";

function App() {

    const elemRef = useRef();
    const rangeInput = useRef();
    /*** ИСХОДНЫЕ ЗНАЧЕНИЯ ДЛЯ БЛОКА СПИСКОВ ПОЛЬЗОВАТЕЛЕЙ ***/
// listLimit - макс кол-во юзеров к показу по-умолчанию в правых колонках MainPage
    const initListLimit = localStorage['rangeDefaultValue'] ?
        JSON.parse(localStorage['rangeDefaultValue']) : 3;
    const [listLimit, setListLimit] = useState(initListLimit);
    const [biasFList, setBiasFList] = useState(listLimit); //шаги смещения при пролистывании списков followers и recommended юзеров.
    const [biasRList, setBiasRList] = useState(listLimit); //шаги смещения при пролистывании списков followers и recommended юзеров.
    const [amountFollowers, setAmountFollowers] = useState(0);
    const [amountRecommended, setAmountRecommended] = useState(0);
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
        } else if (target.textContent === btnText[1]) {
            if (recommendedUsers.length === 0) {
                setBtnRecVisible(false);
            }
            setBiasRList(biasRList + listLimit);
            if (biasRList + 1 >= amountRecommended) {
                setBtnRecVisible(false);
            }

        } else {
            setBiasFList(0);
            setBiasRList(0);
            fetchUsers("followers", listLimit);
            fetchUsers("recommended", listLimit);
        }
    };

    const fetchUsers = (userType, limit) => {

        const url = `/users/`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                activeUserId: activeUser._id,
                limit: limit,
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
                        if (userList.length > 0) setBtnFolVisible(true);

                    } else if (userType === "recommended") {
                        setRecommendedUsers(userList);
                        setAmountRecommended(amount);
                        if (userList.length > 0) setBtnRecVisible(true);
                    }

                }
            ).catch((err) => console.error(err.message));
    };

    /*** ПОЛУЧЕНИЕ Followers ПОЛЬЗОВАТЕЛЕЙ ***/
    useEffect(() => {
        fetchUsers("followers", biasFList);
    }, [biasFList, useSelector(sel.getUpdatedUser)]);
    /*** ПОЛУЧЕНИЕ Recommended ПОЛЬЗОВАТЕЛЕЙ ***/
    useEffect(() => {
        fetchUsers("recommended", biasRList);
    }, [biasRList, useSelector(sel.getUpdatedUser)]);

    /*-----------------------------------------------------------------------------------*/


    /*** БЛОК ПОДГОТОВКИ К ПОЛУЧЕНИЮ СПИСКОВ ПОСТОВ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ И ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ В СИСТЕМЕ ***/
        // сюда порциями будут поступать блоки постов юзера, с пагинацией по клику (в будущем по infinity scroll):
    const posts = useSelector(sel.getAllUsersPosts);
    const [lastDate, setlastDate] = useState(Date.parse("2030-09-02T13:11:35.374+00:00"));
    const activeUser = useSelector(sel.getActiveUser);
    const postsPerBatch = 3;

    /*** ПОЛУЧЕНИЕ ПОСТОВ ПОЛЬЗОВАТЕЛЕЙ ***/
    const incrementDate = () => {
        if (posts && posts.length > 0) {
            setlastDate(Date.parse(posts[posts.length - 1].date));
        } else {
            setlastDate(new Date("3000-07-26").getTime());
            // альтернативы:
            //  Date.parse("2030-09-02T13:11:35.374+00:00");
            //  new Date("2021-09-02T13:11:35.374+00:00").getTime();
        }
    };
    const fetchPosts = () => {
        fetch(`/posts/latest/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lastDate: lastDate,
                limit: postsPerBatch,
                activeUserId: activeUser._id
            })

        }).then(r => r.json())
            .then(data => {
                dispatch({type: types.GET_ALL_USERS_POSTS, payload: data});
            });
    };

    useEffect(() => {
        fetchPosts();
    }, [lastDate, useSelector(sel.getChangedPost), useSelector(sel.getActiveUser)]);

    const resetDate = () => {
        setlastDate(new Date("3000-07-26").getTime());
    };
    /*-----------------------------------------------------------------------------------*/

    const followUnfollowTrigger = (nick) => {
        dispatch(act.toggleContactStatus(nick, activeUser._id));
    };

    let clickManagerCounter = 0;
    const clickManager = ({target}) => {
        clickManagerCounter += 1;

        setTimeout(() => {
            if (clickManagerCounter === 1) onePostHandler(target);
            else if (clickManagerCounter > 1) likeHandler(target);
            clickManagerCounter = 0;
        }, 300);
    };

    const onePostHandler = (target) => {
        if (!target.src) return;
        dispatch(act.getPostAndComments(target.src));
    };

    const likeHandler = (target) => {
        if (!target.src) return;
        if (target.id === 'like') {
            const postId = target.getAttribute('data-name');
            dispatch(act.updateLikeStatus(postId, activeUser._id));
        }
    };

    const scrollHandler = () => {
        const position = elemRef.current? elemRef.current.getBoundingClientRect().y : 0;
        if (position < 100) {
            incrementDate();
        }
    };

    return (
        <div className={classes.App}

        >
            <h3>Задай шаг списков контактов:</h3>

            <input type='range' ref={rangeInput} min='0' max='8' defaultValue={listLimit}
                   onMouseUp={(e) => {
                       localStorage['rangeDefaultValue'] = rangeInput.current.value;
                       setListLimit(+rangeInput.current.value);
                       showFullLists(e);
                   }
                   }
            />
            <span>{listLimit}</span>

            <Grid container spacing={2}>

                <Grid item xs={8} className='left-scroll-items'>
                    <BoxStyled className='left-header' minHeight='30px'>
                        <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}/>
                    </BoxStyled>

                    <BoxStyled onScroll={scrollHandler} overflow='scroll' height='500px' className='scroll-items' minHeight='350px'>
                        <BulkPosts scrollRef={elemRef} allUsersPosts_={posts}
                                   clickManager={clickManager}
                        />
                        <p>
                                Congrats! Вы умудрились просмотреть все посты существующих пользователей Instagram-а!
                        </p>
                    </BoxStyled>
                </Grid>

                <Grid item xs={2} className='right-sidebar' display='flex'
                      flex-direction='column'>

                    <BoxStyled className='right-header' width='190%'>
                        <a href={`/posts/${activeUser.userNick}`}>
                            <AvatarName nick={activeUser.userNick} src={activeUser.avatarSrc}
                                        large={true}/></a>
                    </BoxStyled>


                    <BoxStyled className='added-users' minHeight='130px' style={righSidebar}>
                        <p>Followers</p>
                        <Users users={followerUsers} isFollower={true}
                               handler={followUnfollowTrigger} resetDate={resetDate}/>
                        <ShowMoreButton text={btnText[0]} isVisible={btnFolVisible} handler={showFullLists}/>
                    </BoxStyled>
                    <BoxStyled className='recomended-users' minHeight='130px' style={righSidebar}>
                        <p>Recommended</p>
                        <Users users={recommendedUsers} isFollower={false}
                               handler={followUnfollowTrigger} resetDate={resetDate}/>
                        <ShowMoreButton text={btnText[1]} isVisible={btnRecVisible} handler={showFullLists}/>
                    </BoxStyled>


                    <BoxStyled className='footer' minHeight='50px' style={righSidebar}>
                        Footer Notes
                    </BoxStyled>
                </Grid>

            </Grid>
            <ModalCustom/>
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