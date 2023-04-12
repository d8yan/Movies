import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBox = ({ movies, setSearchResults }) => {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Hello Search")
    }

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(movies)

        const resultArray = movies.filter(movie => movie.title.includes(e.target.value))
        console.log(resultArray)
        setSearchResults(resultArray)
    }

    return (
        <header>
            <form className='search' onSubmit={handleSubmit}>
                <input className='search_input' placeholder='Search' type='text' id='search' onChange={handleSearchChange} />

                <button className='search_button'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>


            </form>
        </header >
    );
};

export default SearchBox;