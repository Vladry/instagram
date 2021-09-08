import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const NavBar = () => {
    return(
    <StyledNav>
        <StyledNavLink exact to={`/posts/latest/`}>Feed</StyledNavLink>
        {/*<StyledNavLink to={'/utils'}>utils</StyledNavLink>*/}
    </StyledNav>
);

};
export default NavBar;

const LiStyled = styled.li`
  margin: 0 8px;
`;

const StyledNavLink = styled(NavLink)`
font-size: 20px;
border: 2px solid darkred;
border-radius: 6px;
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
margin-bottom: 10px;
 list-style-type: none;
 background-color: lightgray;
 //max-width: 80%;
`;
