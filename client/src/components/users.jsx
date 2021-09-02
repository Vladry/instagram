import React from 'react';
import styled from 'styled-components';
import AvatarName from '../components/avatarName';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import {useDispatch, useSelector} from 'react-redux';
import {types, sel} from '../redux/load';

const Users = (props) => {
    const dispatch = useDispatch();
    const activeUser = useSelector(sel.getActiveUser);
    const urlPath = '/posts/';
    const {users, isFollower, handler} = props;
    if (!users) return <p>loading</p>;


    const userList = users.map((aUser) => {
        const isLoggedUser = (activeUser.userNick === aUser.userNick);

        return (
            <li key={aUser._id} data-name={aUser._id} style={{display: 'flex', gap: '5px'}}>
                <a href={`${urlPath}${aUser.userNick}`}><AvatarName nick={aUser.userNick}
                    isLoggedUser={isLoggedUser}  src={aUser.avatarSrc}
                /></a>
                {/*в Реакте, чтобы отправить параметр handler, нужно обернуть его в CB ф-цию:*/}
                {!isLoggedUser && isFollower && <P onClick={() => handler(aUser.userNick)}><PersonAddDisabledOutlinedIcon/></P>}
                {!isLoggedUser && !isFollower && <P onClick={() => handler(aUser.userNick)}><PersonAddOutlinedIcon/></P>}
                <button type='button' onClick={() => {
                    dispatch({
                        type: types.SET_ACTIVE_USER,
                        payload: aUser
                    });
                }}
                        style={{fontSize: '10px', color: 'red', border: 'none'}}>
                    {!isLoggedUser && 'log in'}
                </button>
            </li>
        )
    });
    return (
        <>
            <ul>
                {userList}
            </ul>

        </>
    );

};

export default Users;


const P = styled.p`
margin-left: 10px;
    &:hover {
        cursor: pointer
}`;