import React , { Component } from 'react';
import './App.css';
import MovieRow from './components/MovieRow';
import $ from 'jquery';

class App extends Component {

    constructor(props) {
      super(props) 

      this.state = {

      }

   /*   console.log("This is my starting ")

    const movies = [
      {id: 0 , poster_src : "https://movieposters2.com/images/1587986-b.jpg", 
       title : "Avengers Infinity War" , overview: "this is overview 1" },
      {id: 1 , poster_src : "https://3.bp.blogspot.com/_K4ncs0BvIRA/TFnotdzCrJI/AAAAAAAAI9I/oSn9pCPM5Rs/w1200-h630-p-k-no-nu/AvengersPoster-thumb-266x400-16592.jpg",
       title : "Avengers" , overview: "this is overview 2" },
    ]     

    var movieRows = []
    movies.forEach( (movie) => {
      console.log(movie.title)

      const movieRow = <MovieRow movie={movie} />

      movieRows.push(movieRow)
    })

      this.state = {rows : movieRows} */

      this.performSearch("avengers")
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  } 

  performSearch(searchTerm) {
    console.log("perform search using moviesdb")
    const urlString = `https://api.themoviedb.org/3/search/movie?api_key=2dc9865438a2d89a90db5bfccfed601c&query=${searchTerm}`
    $.ajax ({
      url : urlString,

      success : (searchResults) => {
        console.log ("Fetched data successfully")
     // console.log(searchResults)
      
        const results = searchResults.results
     //   console.log(results[0])

        var movieRows= []
       
        results.forEach((movie) => {
         
          movie.poster_src = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
          const movieRow = <MovieRow key = {movie.id} movie= {movie} />
          movieRows.push(movieRow)

        })    

        this.setState ({rows:movieRows})

      },
      error : (xhr, status, err) => {
        console.log("Failed to fetch")
      },
    })
  }

    render() {
      return (
        <div >

          <table  className = "titleheader" >
            <tbody>
              <tr>
                <td>
                  <img alt = "app logo" width = "20%"  src= "cinema.svg" />
                </td>
                <td >
                  <h1>MoviesDB Search </h1> 
                </td>
              </tr>
            </tbody>
          </table>

          <input  style = {{ width: "100%" , display: "block" , fontSize: 24 , paddingLeft:"10px" , 
                            marginTop : "15px",marginBottom : "15px" , marginLeft: "7px",marginRight : "7px"}}  
            onChange = {this.searchChangeHandler.bind(this)}
            placeholder = "Search Movie" />

          {this.state.rows}

        </div>
      );
    }
}

export default App;
