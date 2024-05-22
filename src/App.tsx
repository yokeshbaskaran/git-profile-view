import "./App.css";
import { FormEvent, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { IGitHubUser } from "./interfaces/IGitHubUser";
import axios from "axios";
import RepositoriesList from "./components/RepositoriesList";
import GistsList from "./components/GistsList";
import FollowersList from "./components/FollowersList";

const NavLinks = [
  {
    linkName: "repositories",
    linkTitle: "Repositories",
  },
  {
    linkName: "gists",
    linkTitle: "Gists",
  },
  {
    linkName: "followers",
    linkTitle: "Followers",
  },
];

const App = () => {
  const [userSearch, setUserSearch] = useState<string>("");
  const [foundUser, setFoundUser] = useState<IGitHubUser>();

  const performSearchRequest = async () => {
    try {
      const trimValues = userSearch.trim();
      const response = await axios.get<IGitHubUser>(
        `https://api.github.com/users/${trimValues}`
      );
      // console.log(response.data);
      setFoundUser(response.data);
    } catch (error) {
      console.error();
    }
  };

  const searchForUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    performSearchRequest();
  };

  return (
    <>
      <section className="App">
        <div>
          <h1>Github Viewer</h1>
          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {NavLinks.map((link, index) => (
                  <li key={index}>
                    {!foundUser && <span>{link.linkTitle}</span>}
                    {foundUser && (
                      <Link to={`/${link.linkName}`}>{link.linkTitle}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <section>
                      <h2>Search for User:</h2>
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Enter any GITHUB username</span>
                        <div style={{ color: "grey" }}>Sample: kunal-kushwaha, Yokiieditz</div>
                        <br /><br />
                      </div>
                      <form className="search-text" onSubmit={searchForUser}>
                        <input
                          type="text"
                          value={userSearch}
                          onChange={(event) =>
                            setUserSearch(event.target.value)
                          }
                        />
                        <p>{userSearch}</p>
                      </form>
                      {foundUser && (
                        <div>
                          <h3>{foundUser.login}</h3>
                          <div className="user-details">
                            <div>
                              <p>
                                <strong>Name:</strong>
                                {foundUser.name}
                              </p>
                              <p>
                                <strong>company:</strong>
                                {foundUser.company}
                              </p>
                              <p>
                                <strong>location:</strong>
                                {foundUser.location}
                              </p>
                              <p>
                                <strong>followers:</strong>
                                {foundUser.followers}
                              </p>
                            </div>
                            <img
                              src={foundUser.avatar_url}
                              alt={foundUser.name}
                            />
                          </div>
                        </div>
                      )}
                    </section>
                  }
                />
                <Route
                  path="/repositories"
                  element={
                    foundUser && (
                      <RepositoriesList
                        repositoriesUrl={foundUser?.repos_url}
                      />
                    )
                  }
                />

                <Route
                  path="/gists"
                  element={
                    foundUser && <GistsList gistsUrl={foundUser?.gists_url} />
                  }
                />

                <Route
                  path="/followers"
                  element={
                    foundUser && (
                      <FollowersList followersUrl={foundUser?.followers_url} />
                    )
                  }
                />
              </Routes>
            </main>
          </Router>
        </div>
      </section>
    </>
  );
};

export default App;
