import React from 'react';
import axios from "axios";

export class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            postsMovie:{
                title: [],
                release_date: [],
                budget: [],
                homepage: [],
                overview: [],
                img: [],
                production_companies: [],
                production_countries: [],
                revenue: [],
                runtime: [],
                vote_average: [],
                cast: [],
                genres: []
            }
        }
    }
    getData = (id) => {
    const urlMovie = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=2586d8c9b6eae4a74cc8c40a8c975f80&language=en-US&append_to_response=credits';
    axios.get(urlMovie)
        .then(res => {
            this.setState({
                postsMovie: {
                    title: res.data.original_title,
                    release_date: res.data.release_date,
                    budget: res.data.budget,
                    homepage: res.data.homepage,
                    overview: res.data.overview,
                    img: res.data.poster_path,
                    production_companies: res.data.production_companies,
                    production_countries: res.data.production_countries,
                    revenue: res.data.revenue,
                    runtime: res.data.runtime,
                    vote_average: res.data.vote_average,
                    cast: res.data.credits.cast,
                    genres: res.data.genres
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        this.getData(id);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            const id = nextProps.match.params.id
            this.getData(id);
        }
    }

    render() {
        return (
            <div>
            <section className='movie'>
                <div className='movie__image'>
                    <img src={'https://image.tmdb.org/t/p/w300/' + this.state.postsMovie.img}/>
                </div>
                <article className='movie__article'>
                    <h2 className='movie__header'>{this.state.postsMovie.title}</h2>
                    <ul>
                        <li className='movie__list'><span className='movie__list--bold'>Release date: </span>{this.state.postsMovie.release_date}</li>
                        <li className='movie__list'><span className='movie__list--bold'>Running time: </span>{this.state.postsMovie.runtime} minutes</li>
                        <li className='movie__list'><span className='movie__list--bold'>Rating: </span>{this.state.postsMovie.vote_average}</li>
                            <li className='movie__list'><span className='movie__list--bold'>Budget: </span>{this.state.postsMovie.budget !== 0 ? parseInt(this.state.postsMovie.budget).toLocaleString() + '$' : 'no data'}</li>
                            <li className='movie__list'><span className='movie__list--bold'>Revenue: </span>{this.state.postsMovie.revenue !== 0 ? parseInt(this.state.postsMovie.revenue).toLocaleString() + '$' : 'no data'}</li>
                            <li className='movie__list'><span className='movie__list--bold'>Homepage: </span><a href={this.state.postsMovie.homepage}>{this.state.postsMovie.homepage !== null ? this.state.postsMovie.homepage : 'no data'}</a></li>
                        <li className='movie__list'><span className='movie__list--bold'>Production countries: </span>{this.state.postsMovie.production_countries.map((element, i) => {
                            if (i < this.state.postsMovie.production_countries.length - 1) {
                                return this.state.postsMovie.production_countries[i].name+', '
                            }else {
                                return this.state.postsMovie.production_countries[i].name
                            }
                        })}</li>
                        <li className='movie__list'><span className='movie__list--bold'>Production companies: </span>{this.state.postsMovie.production_companies.map((element, i) => {
                            if (i < this.state.postsMovie.production_companies.length - 1) {
                                return this.state.postsMovie.production_companies[i].name + ', '
                            } else {
                                return this.state.postsMovie.production_companies[i].name
                            }
                        })}</li>
                        <li className='movie__list'><span className='movie__list--bold'>Genres: </span>{this.state.postsMovie.genres.map((element, i) => {
                            if (i < this.state.postsMovie.genres.length - 1) {
                                return this.state.postsMovie.genres[i].name + ', '
                            } else {
                                return this.state.postsMovie.genres[i].name
                            }
                        })}</li>
                        <li className='movie__list-overview'><span className='movie__list--bold'></span>{this.state.postsMovie.overview}</li>
                    </ul>
                </article>
            </section>
            <section className='cast'>
                <h3>Cast</h3>
                <div className='cast__actors'>
                        {this.state.postsMovie.cast.map((element, i) => {
                            if (i <= 5) {
                                return <div key={i} className='cast__actors-person'><p>{element.name}</p><img className='cast__actors-img' src={element.profile_path === null ? 'http://via.placeholder.com/200x300' : 'https://image.tmdb.org/t/p/w200/' + element.profile_path}/></div>
                                }
                            }
                        )}
                </div>
            </section>
            </div>
        )
    }
}