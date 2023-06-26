import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (response.ok) {
        const data = await response.json();
        setPokemonData(data);
      } else {
        setError('Error retrieving Pokémon data. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem(pokemonName)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
    fetchPokemonData();
  }, [pokemonName]);

  const handleBookmarkToggle = () => {
    setIsBookmarked((prevValue) => !prevValue);
    if (!isBookmarked) {
      localStorage.setItem(pokemonName, pokemonData.sprites.front_default)
    } else {
      localStorage.removeItem(pokemonName);
    }
    // Code to handle bookmarking and unbookmarking the Pokémon
  };

  return (
    <div>
      <h2>Details Page</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <h3>{pokemonData.name}</h3>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          {/* Display other details as per your requirement */}
          <button onClick={handleBookmarkToggle}>
            {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;