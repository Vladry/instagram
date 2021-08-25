import React from 'react';
import styled from 'styled-components';
import AvatarName from '../components/avatarName';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import {useDispatch} from 'react-redux';
import {types} from '../redux/load';

const Users = (props) => {
    const dispatch = useDispatch();
    const urlPath = '/posts/';
    const {users, isFollower, handler} = props;
    if (!users) return <p>loading</p>;


    const userList = users.map((aUser) => (
        <li key={aUser._id} data-name={aUser._id} style={{display: 'flex', gap: '5px'}}

            onClick={
                () => {
                    dispatch({
                        type: types.LOAD_ACTIVE_USER,
                        payload: aUser.userNick
                    });
                }
            }

        >
            <a href={`${urlPath}${aUser.userNick}`}><AvatarName nick={aUser.userNick}
                                                                loggedInUser={false}
                                                                src={aUser.avatarSrc}
            /></a>
            {/*в Реакте, чтобы отправить параметр handler, нужно обернуть его в CB ф-цию:*/}
            {isFollower && <P onClick={() => handler(aUser.userNick)}><PersonAddDisabledOutlinedIcon/></P>}
            {!isFollower && <P onClick={() => handler(aUser.userNick)}><PersonAddOutlinedIcon/></P>}
        </li>
    ));
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