import React from 'react';
import Button from '@material-ui/core/Button';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
// управление иконками: https://material-ui.com/ru/components/icons/#font-icons
// поиск иконок:  https://material-ui.com/ru/components/material-icons/

const UserPosts = () => {

    return (
        <div className='user-posts'>
            <div className='user-avatar'><img src = "https://res.cloudinary.com/vladry/image/upload/v1628106616/IMG_20210627_203235_fo4ab5.jpg" width='300px' alt='post_picture'/></div>
            <h3>userNick</h3>
            <Button variant="contained" color="primary">
                Отслеживать
            </Button>
        </div>
    );
};

export default UserPosts;