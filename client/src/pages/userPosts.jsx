import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from "@material-ui/core/Avatar";
import UserAllPosts from "../components/userAllPosts";


const UserPosts = ({match}) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const userNick = match.params.userNick;
//фечуемся, чтобы получить все посты данного юзера
        const postsUrl = `/posts/${userNick}`;
        fetch(postsUrl, {
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
        ).then(async (data) => {
            await setPosts(data);

        })
            .catch((err) => {
                console.warn(err.message);
            });

        // теперь фечуемся, чтобы получить данные юзера (нужна аватарка)
        const userUrl = `/users/${userNick}`;

        fetch(userUrl, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async r => await r.json())
        // .then( async res => await console.dir(res)).catch((err) => console.error(err.message));
        .then( async res => await setUser(res)).catch((err) => console.error(err.message));
    }, []);
    console.log(user);

    return (
        <Box className='user-posts'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='20px'>
                <div className='user-avatar'>
                    <Avatar alt="user-avatar"
                            src={user.avatarSrc}
                    />

                </div>
                <Box marginLeft='20px' marginRight='20px'><h3>Страница пользователя: {user.userNick}</h3></Box>
                <Button size='small' color="primary">Отслеживать</Button>
            </Box>

            <UserAllPosts data={posts}/>

        </Box>
    )
        ;
};

export default UserPosts;