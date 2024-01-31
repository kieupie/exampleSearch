import { useState } from 'react';
import './App.css';

function App() {

  const [results, setResult] = useState([]);
  const [searchText, setSearchText] = useState('');

  const debounce = (callback, delay) => {
    let timeOut = null;

    return (...args) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        callback(...args);
      }, delay);
    }
  }


  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value.trim());

    fetch(
      'https://dummyjson.com/users/search?' +
      new URLSearchParams({
        q: e.target.value,
      })
    )
      .then((res) => res.json())
      .then((res) => {
        setResult(res?.users);
      })
      .catch((err) => {
        console.error("Error: " + err);
      });
  }

  console.log("Hello user", results)

  return (
    <>
      <header>
        <ul>
          <li>
            <a className="links" href="#user">
              <button className="signbutton" type="button">
                Sign in
              </button>
            </a>
          </li>
          <li>
            <a href="#grid">
              <img
                className="grid"
                src="https://cdn3.iconfinder.com/data/icons/navigation-and-settings/24/Material_icons-01-11-512.png"
                title="Google apps"
                alt="Google apps"
              />
            </a>
          </li>
          <li>
            <a href="#images">Images</a>
          </li>
          <li>
            <a href="#gmail">Gmail</a>
          </li>
        </ul>
      </header>
      <div className="logo">
        <img
          alt="Google"
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        />
      </div>
      <div className="bar">
        <i className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#5F6368">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </i>
        <input
          className="searchbar"
          type="text"
          title="Search"
          name="search_text"
          id="search-field"
          value={searchText}
          onChange={debounce(handleSearchChange, 1000)}
        />
        <a href="#">
          <img
            className="voice"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Google_mic.svg/716px-Google_mic.svg.png"
            title="Search by Voice"
            alt="Voice Search"
          />
        </a>
      </div>
      {results && results.length > 0 &&
        <div className="result-list">
          <div id="result-box">
            {results.map((result) => (
              <p key={result.id}>
                {result.firstName} {result.lastName}
              </p>
            ))}
          </div>
        </div>
      }
      <div className="buttons">
        <button className="button" type="button">
          #Debounce
        </button>
        <button className="button" type="button">
          #Throttle
        </button>
      </div>
    </>
  );
}

export default App;