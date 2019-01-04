import React from 'react';
import {Header} from './Header.jsx';
import {SeekForm} from './SeekForm.jsx';
import {NewReleases} from './NewReleases.jsx';
import {Movie} from './Movie.jsx';
import {Footer} from './Footer.jsx';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
    BrowserRouter
} from 'react-router-dom';

export class App extends React.Component{
    render(){
        return <HashRouter>
            <div>
                <Header />
                <SeekForm />
                <Switch>
                    <Route exact path="/" component={NewReleases} />
                    <Route path="/movie/:id" component={Movie} />
                </Switch>
                <Footer/>
            </div>
        </HashRouter>
    }
}