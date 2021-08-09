import {types} from './';

const loadUserPosts = (url) => dispatch => {
    dispatch(isLoading(true));

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
        dispatch(isLoading(false));
    })
        .catch((err) => {
            console.warn(err.message);
        });

};


const loadOneUser = (url) => dispatch => {
    dispatch(isLoading(true));

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
            dispatch(isLoading(false));
        })
        .catch((err) => console.error(err.message));
};

const isLoading = (yesNo) => ({
    type: "IS_LOADING",
    payload: yesNo
});


export default {
    loadUserPosts,
    loadOneUser,
}