import React from 'react';
import Nav from './Nav';

function Header(props) {
    return (
        <div className='header'>
            St<span className='monkey'>🐵</span>ck   M<span className='monkey'>🐵</span>nkey
            <Nav />
        </div>
    );
}

export default Header;