import {types} from './';

export const loadUserPosts = (url) => dispatch => {
    dispatch(postsLoading(true));
    fetch(url, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((res) => {
            if (!res.ok) {
                throw new Error()
            } else {
                return res.json()
            }
        }
    ).then((data) => {
        dispatch({
            type: types.LOAD_USER_POSTS,
            payload: data
        });
        dispatch(postsLoading(false));
    })
        .catch((err) => {
            console.warn("на этапе получения постов пользователя возникла ошибка. Проверьте соединение");
        });

};

export const loadOneUser = (url) => dispatch => {
    dispatch(userLoading(true));

    fetch(url, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => r.json())
        .then(currentUser => {
            dispatch({
                type: types.LOAD_CURRENT_USER,
                payload: currentUser
            });
            dispatch(userLoading(false));
        })
        .catch((err) => console.error("Ошибка загрузки пользователя."));
};

export const postsLoading = (yesNo) => ({
    type: types.POSTS_ARE_LOADING,
    payload: yesNo
});

export const userLoading = (yesNo) => ({
    type: types.USER_IS_LOADING,
    payload: yesNo
});

export const toggleContactStatus = (contactNick, activeUserId) => dispatch => {
    const url = `/users/`;
    fetch(url, {
        method: "PUT",
        body: JSON.stringify({
            contactNick,
            activeUserId
        }),
        headers: {"Content-Type": "application/json"}
    })
        .then(r => r.json())
        .then(res => {
            dispatch({
                type: types.TOGGLE_CONTACT_STATUS,
                payload: res

            });
        })
        .catch((err) => console.error("Что-то пошло не так при смене статуса пользователя"));


};

export const getPostAndComments = (pictureSrc) => dispatch => {
    const url = `/post/`;

    fetch(url, {
        method: "POST",
        body: JSON.stringify({pictureSrc}),
        headers: {"Content-Type": "application/json"}

    }).then(r => r.json()).then(res => {
        dispatch({
            type: types.GET_POST_COMMENTS_USER,
            payload: res
        });
        dispatch({type: types.OPEN_MODAL, payload: true});
    }).catch(err => console.error(err.message));
};

export const updateLikeStatus = (postId, activeUserId) => dispatch => {

    dispatch({type: types.CLEAR_ALL_USERS_POSTS});

    fetch('/post/likes', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            postId, activeUserId
        })
    }).then(r => r.json())
        .then(res => {
                dispatch({
                    type: types.UPDATE_LIKE_STATUS,
                    payload: res
                });
            }
        ).catch(err => console.warn("Сбой данный при получении данных при обновлении статуса лайка поста"));

};


export default {
    loadUserPosts,
    loadOneUser,
    toggleContactStatus,
    getPostAndComments,
    updateLikeStatus,
}