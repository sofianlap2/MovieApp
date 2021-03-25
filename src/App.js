import './App.css';
import React , {useEffect , useState }from 'react'
import Movie from './components/Movie';

const FEATURED_API= "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

function App() {

  const [movies,setMovies]= useState([])
  const [searchTerm, setSearchTerm] = useState('')

useEffect(() => {
  fetchApi(FEATURED_API)
}, [])

const fetchApi = (API) => {
  fetch(API).then(res=>res.json()).then(res=>{
    setMovies(res.results)
  })
}

const handleSubmit = (e) => {
  e.preventDefault()
  fetchApi(SEARCH_API+searchTerm)
  setSearchTerm('')
}

const handleCHange = (e)=>{
  e.preventDefault();
  setSearchTerm(e.target.value)
}

  return (
    <React.Fragment>
      <header>
      <form onSubmit={handleSubmit}>
        <input 
        className="search"
        type="search" 
        placeholder="Search"
        onChange={handleCHange}
        value={searchTerm}
        />
      </form>
      </header>
      <div className="movies-container">
      {movies.length > 0 && movies.map(movie=> <Movie key={movie.id} {...movie} />)}
    </div>
    </React.Fragment>
  );
}

export default App;
