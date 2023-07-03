import React, { useEffect, useState } from 'react';
import axios from 'axios';
const ListingPage = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
  
    const loadPokemonList = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`);
        setPokemonList((prevList) => [...prevList, ...response.data.results]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        setError(error.message);
      }
  
      setIsLoading(false);
    };
  
    useEffect(() => {
      loadPokemonList();
    }, []);
  
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      ) {
        loadPokemonList();
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <div>
        <h1>Listing Page</h1>
  
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
  
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    );
  };
  
  export default ListingPage;
  