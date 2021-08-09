import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/avatar';
import Box from '@material-ui/core/box';
import AvatarName from '../components/avatarName';
import {useSelector} from "react-redux";
import {default as sel} from "../redux/load/selectors";
const UsersInDB = () => {
    const activeUser = useSelector(sel.getActiveUser);

    return (
        <>

            <AvatarName nick="Andrey"   src= "https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Andrey_avatar_bxcjny.jpg" />
            <AvatarName nick="Ilya"     src= "https://res.cloudinary.com/vladry/image/upload/v1628196848/avatars/Ilya_avatar_ecn4wr.jpg" />
            <AvatarName nick="Taras"    src= "https://res.cloudinary.com/vladry/image/upload/v1628196607/avatars/Taras_avatar_hnldon.jpg" />

        </>
    );

};

export default UsersInDB;

