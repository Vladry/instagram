import {types} from './';

const loadUserPosts = (url) => dispatch => {
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
            console.warn(err.message);
        });

};


const loadOneUser = (url) => dispatch => {
    dispatch(userLoading(true));

    fetch(url, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(r => r.json())
        .then(currentUser => {
            dispatch({
                type: types.LOAD_ACTIVE_USER,
                payload: currentUser
            });
            dispatch(userLoading(false));
        })
        .catch((err) => console.error(err.message));
};

const postsLoading = (yesNo) => ({
    type: types.POSTS_ARE_LOADING,
    payload: yesNo
});
const userLoading = (yesNo) => ({
    type: types.USER_IS_LOADING,
    payload: yesNo
});

const toggleContactStatus = (contactNick, activeUserId) => dispatch => {
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
        .catch((err) => console.error(err.message));


};

export default {
    loadUserPosts,
    loadOneUser,
    toggleContactStatus,
}