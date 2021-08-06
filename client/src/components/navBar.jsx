import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';


const NavBar = () => {
    return(
    <StyledNav>
        <li className='nav-navlink'><StyledNavLink exact to={'/posts/Vlad'}>Страница постов userNick</StyledNavLink></li>
        <li className='nav-navlink'><StyledNavLink to={'/post/610d3507990be0484026c701'}>Один пост(модалка)userNick</StyledNavLink></li>
        <li className='nav-navlink'><StyledNavLink exact to={'/'}>Главная</StyledNavLink></li>
    </StyledNav>
);

};
export default NavBar;


const StyledNavLink = styled(NavLink)`
color: #cc6600;
text-decoration: none;
`;

const StyledNav = styled.nav`
display: flex;
justify-content: center;
gap: 7%;
margin-top: 10px;
margin-bottom: 20px;
 list-style-type: none;
`;
