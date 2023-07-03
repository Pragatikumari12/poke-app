import React, { useState, useEffect } from 'react';
const BookmarksPage = () => {
    const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);
  
    useEffect(() => {
      // Retrieve bookmarked Pokémon from local storage
      const storedBookmarks = localStorage.getItem('bookmarkedPokemon');
      if (storedBookmarks) {
        setBookmarkedPokemon(JSON.parse(storedBookmarks));
      }
    }, []);
  
    const handleRemoveBookmark = (pokemonId) => {
      // Remove the Pokémon from bookmarks
      const updatedBookmarks = bookmarkedPokemon.filter((pokemon) => pokemon.id !== pokemonId);
      setBookmarkedPokemon(updatedBookmarks);
  
      // Update local storage with updated bookmarks
      localStorage.setItem('bookmarkedPokemon', JSON.stringify(updatedBookmarks));
    };
  
    return (
      <div>
        <h1>Bookmarks Page</h1>
  
        {bookmarkedPokemon.length === 0 ? (
          <p>No bookmarked Pokémon</p>
        ) : (
          <ul>
            {bookmarkedPokemon.map((pokemon) => (
              <li key={pokemon.id}>
                <h3>{pokemon.name}</h3>
                <button onClick={() => handleRemoveBookmark(pokemon.id)}>Remove Bookmark</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default BookmarksPage;
  