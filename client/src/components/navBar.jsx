import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';


const NavBar = () => {
    return(
    <StyledNav>
        <LiStyled className='nav-navlink'><StyledNavLink exact to={`/posts/latest/0/3/610d38873740f644cccc1cf1`}>Главная</StyledNavLink></LiStyled>
        <LiStyled className='nav-navlink'><StyledNavLink to={'/post/610d3507990be0484026c701'}>MODAL</StyledNavLink></LiStyled>
{/*        <LiStyled className='nav-navlink'><StyledNavLink to={`/posts/Vlad`}>Vlad</StyledNavLink></LiStyled>
        <LiStyled className='nav-navlink'><StyledNavLink to={`/posts/Ilya`}>Ilya</StyledNavLink></LiStyled>
        <LiStyled className='nav-navlink'><StyledNavLink to={`/posts/Taras`}>Taras</StyledNavLink></LiStyled>
        <LiStyled className='nav-navlink'><StyledNavLink to={`/posts/Andrey`}>Andrey</StyledNavLink></LiStyled>
        <LiStyled className='nav-navlink'><StyledNavLink to={`/posts/Ira`}>Ira</StyledNavLink></LiStyled>
        <LiStyled className='nav-navlink'><StyledNavLink to={`/posts/Tanya`}>Tanya</StyledNavLink></LiStyled>
        <LiStyled className='nav-navlink'><StyledNavLink to={`/posts/Lena`}>Lena</StyledNavLink></LiStyled>*/}
        <LiStyled className='nav-navlink'><StyledNavLink to={'/utils'}>utils</StyledNavLink></LiStyled>
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
