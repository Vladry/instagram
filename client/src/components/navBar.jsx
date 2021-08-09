import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';


const NavBar = () => {
    const currentUserNick = localStorage.getItem("userNick") || "Vlad";
    return(
    <StyledNav>
        <li className='nav-navlink'><StyledNavLink exact to={'/'}>Главная</StyledNavLink></li>
        <li className='nav-navlink'><StyledNavLink to={`/posts/${currentUserNick}`}>Посты пользователя {currentUserNick}</StyledNavLink></li>
        <li className='nav-navlink'><StyledNavLink to={'/post/610d3507990be0484026c701'}>MODAL userNick</StyledNavLink></li>
        <li className='nav-navlink'><StyledNavLink to={'/utils'}>utils</StyledNavLink></li>
    </StyledNav>
);

};
export default NavBar;


const StyledNavLink = styled(NavLink)`
color: darkgreen;
text-decoration: none;
&.active {
color: darkred;
}`;

const StyledNav = styled.nav`
display: flex;
justify-content: center;
gap: 7%;
margin-top: 6px;
margin-bottom: 20px;
 list-style-type: none;
 background-color: lightgray;
 max-width: 70%;
`;
