import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';


const NavBar = () => {
    return(
    <StyledNav>
        <li className='nav-navlink'><StyledNavLink exact to={`/posts/latest/0/3/610d38873740f644cccc1cf1`}>Главная</StyledNavLink></li>
        <li className='nav-navlink'><StyledNavLink to={`/posts/Vlad`}>Посты пользователя Vlad</StyledNavLink></li>
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
