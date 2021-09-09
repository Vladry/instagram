import {types} from './';

export const loadUserPosts = (url) => async dispatch => {
    dispatch(postsLoading(true));
    try {
        const data = await fetch(url, {
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
        );
        dispatch({
            type: types.LOAD_USER_POSTS,
            payload: data
        });
    } catch {
        console.warn("на этапе получения постов пользователя возникла ошибка. Проверьте соединение")
    }

    dispatch(postsLoading(false));
};

export const loadOneUser = (url) => async dispatch => {
    dispatch(userLoading(true));
    try {
        const currentUser = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json());

        dispatch({
            type: types.LOAD_CURRENT_USER,
            payload: currentUser
        });
        dispatch(userLoading(false));

    } catch {
        console.error("Ошибка загрузки пользователя.")
    }
};

export const postsLoading = (yesNo) => ({
    type: types.POSTS_ARE_LOADING,
    payload: yesNo
});

export const userLoading = (yesNo) => ({
    type: types.USER_IS_LOADING,
    payload: yesNo
});

export const toggleContactStatus = (contactNick, activeUserId) => async dispatch => {
    const url = `/users/`;

    try {
        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                contactNick,
                activeUserId
            }),
            headers: {"Content-Type": "application/json"}
        })
            .then(r => r.json());

        dispatch({
            type: types.TOGGLE_CONTACT_STATUS,
            payload: res
        });
    } catch {
        console.error("Что-то пошло не так при смене статуса пользователя")
    }


};

export const getPostAndComments = (pictureSrc) => async dispatch => {
    const url = `/post/`;
    try {
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({pictureSrc}),
            headers: {"Content-Type": "application/json"}
        }).then(r => r.json());

        dispatch({
            type: types.GET_POST_COMMENTS_USER,
            payload: res
        });
    } catch {
        console.error("ошибка получения постов данного пользователя - проверьте подключение к интернет")
    }
    dispatch({type: types.OPEN_MODAL, payload: true});
};

export const updateLikeStatus = (postId, activeUserId) => async dispatch => {

    dispatch({type: types.CLEAR_ALL_USERS_POSTS});
    try {
        const res = await fetch('/post/likes', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                postId, activeUserId
            })
        }).then(r => r.json());

        dispatch({
            type: types.UPDATE_LIKE_STATUS,
            payload: res
        });
    } catch {
        console.warn("Сбой данный при получении данных при обновлении статуса лайка поста")
    }
};

const fetchPosts = (lastDate, postsPerBatch, activeUserId) => async dispatch => {
    const data = await fetch(`/posts/latest/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lastDate: lastDate,
            limit: postsPerBatch,
            activeUserId: activeUserId
        })
    }).then(r => r.json());

    dispatch({type: types.GET_ALL_USERS_POSTS, payload: data});
};


export default {
    loadUserPosts,
    loadOneUser,
    toggleContactStatus,
    getPostAndComments,
    updateLikeStatus,
    fetchPosts,
}