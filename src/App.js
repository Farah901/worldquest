import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS for the styling

function Api() {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch countries data on initial load
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Calculate the data for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const currentCountries = countries.slice(startIndex, startIndex + itemsPerPage);

  // Total pages based on countries length and items per page
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  // Handlers for pagination buttons
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Countries</h1>
      <div className="country-list">
        {currentCountries.map((country) => (
          <div key={country.cca3} className="country-card">
            <h2>{country.name.common}</h2>
            <strong>Region: </strong>{country.continents && country.continents[0]} <br />
            <strong>Capital: </strong>{country.capital && country.capital[0]} <br />
            
            <img
              src={country.flags.png}
              alt={`${country.name.common} flag`}
              className="flag-image"
            />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button className="pagination-button" onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span className="pagination-text">
          Page {page} of {totalPages}
        </span>
        <button className="pagination-button" onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Api;
