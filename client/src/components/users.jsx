import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/avatar';
import Box from '@material-ui/core/box';
import AvatarName from '../components/avatarName';
import {useSelector} from "react-redux";
import {default as sel} from "../redux/load/selectors";

const Users = (props) => {
    const {users, handler} = props;
    console.log("users: ", users);
    // if( !Array.isArray(users) ) users = [];

    const userList = users.map((aUser, index) => (
        <li key={aUser._id} data-name={aUser._id}>
            <AvatarName nick={aUser.userNick} src={aUser.avatarSrc}/>
        </li>
    ));
    console.log("userList: ", userList);
    return (
        <>
            <ul onClick={users.handler}>
                {userList}
            </ul>

        </>
    );

};

export default Users;

