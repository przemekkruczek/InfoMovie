import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class SeekForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            results: [],
            className: 'form__list'
        }
    }
    handleSubmit = (e) => e.preventDefault();
    handleNameChange = () => {

        let valueInput = document.querySelector('.searchBar').value;

        
        document.addEventListener('click', () => {
            if (event.target.closest('.form__list')) return;
            this.setState({
                className: 'nodisplay'
            });
        })

        if (valueInput === '') {
            this.setState({
                className: 'nodisplay'
            });
        } else{
            this.setState({
                className: 'form__list'
            });
        }

        const urlSeek = 'https://api.themoviedb.org/3/search/movie?api_key=2586d8c9b6eae4a74cc8c40a8c975f80&language=en-US&query=' + valueInput + '&page=1&include_adult=false';

        axios.get(urlSeek)
            .then(res => {
                const moviesSeek = res.data.results.map(element => ({ id: element.id, img: element.poster_path, title: element.original_title, release: element.release_date, rating: element.vote_average }));
                this.setState({
                    results: moviesSeek
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    handleClick = () => {
        document.querySelector('.searchBar').value = '';
        this.setState({
            className: 'nodisplay'
        });
    };

    render() {
        return (
            <form className='form' onSubmit={this.handleSubmit}>
                <div className="input_box">
                    <div className="avatar">
                        <i className="fas fa-search"></i>
                    </div>
                    <div className="line"></div>
                    <input type='text' onChange={this.handleNameChange} placeholder='Find movies...' className='searchBar'/>
                </div>
                <ul className={this.state.className}>
                    {this.state.results.map((element) => { return(
                        <li key={element.id} onClick={this.handleClick} className={'form__list-element'}>
                            <Link to={'/movie/' + element.id} className={'form__list-link'}>
                                <img src={'https://image.tmdb.org/t/p/w200' + element.img} className={'form__list-img'}/>
                                <div>
                                    <p className={'form__list-description'}>Title: {element.title}</p>
                                    <p className={'form__list-description'}>Release date: {element.release}</p>
                                    <p className={'form__list-description'}>Rating: {element.rating}</p>
                                </div>
                            </Link>
                        </li>
                        )
                    })}
                </ul>
            </form>
        )
    }
}