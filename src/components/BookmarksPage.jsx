import React, { useState, useEffect } from 'react';

const BookmarksPage = () => {
  const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);

  useEffect(() => {
    // Retrieve bookmarked Pokémon from local storage or state management store
    // const savedBookmarks = [...localStorage];
    // if (savedBookmarks) {
    //   setBookmarkedPokemon(JSON.parse(savedBookmarks));
    // }
    
  }, []);

  const handleRemoveBookmark = (pokemonName) => {
    // Remove the Pokémon from bookmarks
    const updatedBookmarks = bookmarkedPokemon.filter((name) => name !== pokemonName);
    setBookmarkedPokemon(updatedBookmarks);
    localStorage.setItem('bookmarkedPokemon', JSON.stringify(updatedBookmarks));
  };


  return (
    <div>
      <h2>Bookmarks Page</h2>
      <div className="pokemon-grid">
        {bookmarkedPokemon.map((pokemon) => (
          <div key={pokemon.name}>
            <h3>{pokemon.name}</h3>
            {/* Display Pokémon image and other details as per your requirement */}
            <button onClick={() => handleRemoveBookmark(pokemon.name)}>
              Remove Bookmark
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarksPage;