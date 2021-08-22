import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {sel} from "../redux/load";

const NavBar = () => {
    const startingDate = new Date("3000-07-26").getTime();
    return(
    <StyledNav>
        <StyledNavLink exact to={`/posts/latest/`}>Feed</StyledNavLink>
        {/*<StyledNavLink exact to={`/posts/latest/${startingDate}/3/${useSelector(sel.getActiveUser)._id}`}>Feed</StyledNavLink>*/}
{/*     <StyledNavLink to={'/post/610d3507990be0484026c701'}>MODAL</StyledNavLink>
        <StyledNavLink to={`/posts/Vlad`}>Vlad</StyledNavLink>
        <StyledNavLink to={`/posts/Ilya`}>Ilya</StyledNavLink>
        <StyledNavLink to={`/posts/Taras`}>Taras</StyledNavLink>
        <StyledNavLink to={`/posts/Andrey`}>Andrey</StyledNavLink>
        <StyledNavLink to={`/posts/Ira`}>Ira</StyledNavLink>
        <StyledNavLink to={`/posts/Tanya`}>Tanya</StyledNavLink>
        <StyledNavLink to={`/posts/Lena`}>Lena</StyledNavLink>*/}
        <StyledNavLink to={'/utils'}>utils</StyledNavLink>
    </StyledNav>
);

};
export default NavBar;

const LiStyled = styled.li`
  margin: 0 8px;
`;

const StyledNavLink = styled(NavLink)`
font-size: 10px;
color: darkgreen;
text-decoration: none;
   margin: 2px 8px;
&.active {
color: darkred;
margin: 0 10px; //дополнительно выделяет активную ссылку отступами справа и слева
}`;

const StyledNav = styled.nav`
display: flex;
justify-content: center;
//gap: 6%;
margin-top: 6px;
margin-bottom: 20px;
 list-style-type: none;
 background-color: lightgray;
 //max-width: 80%;
`;
