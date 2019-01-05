import React from 'react';

export class Header extends React.Component {
    render() {
        return (
            <header className='header'>
                <a href="https://przemekkruczek.github.io/InfoMovie/#/" className='header-logo'><img src='images/logo.png' alt='InfoMovie' /><h1 className='header-logo__title'>InfoMovie</h1></a>
                <a href="https://github.com/przemekkruczek" className='header-sign'><h3>Made by Przemyslaw Kruczek</h3></a>
            </header>
        )
    }
}