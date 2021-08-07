import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import Grid from '@material-ui/core/Grid';
import Avatar from "@material-ui/core/Avatar";
import AllUserPosts from "../components/AllUserPosts";


const UserPosts = ({userNick}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const url = `/posts/${userNick}`;
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
        ).then(async (data) => {
            await setPosts(data.posts);
        })
            .catch((err) => {
                console.warn(err.message);
            });

    }, [userNick]);


    return (
        <Box className='user-posts'>
            <Box display='flex' justifyContent='center' alignItems='center' marginBottom='20px'>
                <div className='user-avatar'>
                    <Avatar alt="user-avatar"
                            src="https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg"/>

                </div>
                <Box marginLeft='20px' marginRight='20px'><h3>userNick</h3></Box>
                <Button size='small' color="primary">Отслеживать</Button>
            </Box>
            <AllUserPosts data={posts}/>
        </Box>
    )
        ;
};

export default UserPosts;