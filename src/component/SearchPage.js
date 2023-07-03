import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pokemonData, setPokemonData] = useState(null);
  
    const handleSearchInputChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSearch = async () => {
      setIsLoading(true);
      setError(null);
      setPokemonData(null);
  
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
        setPokemonData(response.data);
      } catch (error) {
        setError(error.message);
      }
  
      setIsLoading(false);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleSearch();
    };
  
    return (
      <div>
        <h1>Search Page</h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Pokemon name"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button type="submit">Search</button>
        </form>
  
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        
        {pokemonData && (
          <div>
            <h2>{pokemonData.name}</h2>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </div>
        )}
      </div>
    );
  };
  
  export default SearchPage;
  