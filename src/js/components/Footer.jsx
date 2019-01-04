import React from 'react';

export class Footer extends React.Component {
    render() {
        return (
            <section className='footer'>
                <div>
                    <a target="_blank" href="https://www.themoviedb.org/" className='footer__API'><h3 className='footer__API-logo'>API: The Movie Database (TMDb)</h3></a>
                </div>
            </section>
        )
    }
}