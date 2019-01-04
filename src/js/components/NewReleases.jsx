import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';


export class NewReleases extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            posts:[]
        }
    }
    componentDidMount(){
        const url = 'https://api.themoviedb.org/3/movie/popular?api_key=2586d8c9b6eae4a74cc8c40a8c975f80';
        axios.get(url)
            .then(res => {
                const movies = res.data.results.map(element => ({ id: element.id, img: element.poster_path, title: element.title, release: element.release_date, rating: element.vote_average}));
                this.setState({
                    posts: movies
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <section className='newReleases'>
                <h2>New Releases</h2>
                <div className='newReleases__load'>
                    {this.state.posts.map(movie =>
                        <Link to={'/movie/'+ movie.id} key={movie.id} className='newReleases__load-container'><img src={'https://image.tmdb.org/t/p/w200/' + movie.img} className='newReleases__load-img'/>
                            <div className='newReleases__load-info'>
                                <h4>{movie.title}</h4>
                                <p>{movie.release}</p>
                                <p>Rating: {movie.rating}</p>
                            </div>
                        </Link>)}
                </div>
            </section>
        )
    }
}