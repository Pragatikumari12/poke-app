import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import axios from 'axios';
const DetailsPage = () => {
    const history = useHistory();
    const { id } = useParams();
  
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
  
    useEffect(() => {
      const fetchPokemonDetails = async () => {
        setIsLoading(true);
        setError(null);
  
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
          setPokemon(response.data);
        } catch (error) {
          setError(error.message);
        }
  
        setIsLoading(false);
      };
  
      fetchPokemonDetails();
    }, [id]);
  
    const handleBookmarkToggle = () => {
      setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
    };
  
    const handleBackClick = () => {
      history.goBack();
    };
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!pokemon) {
      return <p>Pokemon not found.</p>;
    }
  
    return (
      <div>
        <h1>Details Page</h1>
  
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
  
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          {/* Add other details as needed */}
  
          <button onClick={handleBookmarkToggle}>
            {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          </button>
  
          <button onClick={handleBackClick}>Back</button>
        </div>
      </div>
    );
  };
  
  export default DetailsPage;
  