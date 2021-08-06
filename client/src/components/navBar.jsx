import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = () => {
return(
    <nav>
        <li className='nav-navlink'><NavLink exact to={'/posts/Vlad'}>Страница постов userNick</NavLink></li>
        <li className='nav-navlink'><NavLink to={'/post/610d3507990be0484026c701'}>Один пост (модалка) userNick</NavLink></li>
        <li className='nav-navlink'><NavLink exact to={'/'}>Главная</NavLink></li>
    </nav>
);
};

export default NavBar;