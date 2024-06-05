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

const SampleText = [
  "facebook",
  "meta",
  "google",
  "vuejs",
  "nodejs",
  "tailwindlabs",
  "yokiieditz",
  "github",
  "kunal-kushwaha",
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
      <section className="w-[90%] mx-auto">
        <div className="text-lg">
          <h1 className="my-5 text-center text-5xl font-bold uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 from-30% via-blue-500 to-violet-500">
            Github Profile Viewer
          </h1>
          <Router>
            <nav>
              <ul className="text-lg font-semibold">
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
                    <section className="min-h-[50vh] my-1 py-2 flex justify-start items-start gap-5 max-md:flex-col max-md:gap-8">
                      <div className="yoki w-1/3 max-md:w-[90%] mx-auto p-2 flex flex-col gap-3 items-start max-md:items-center overflow-hidden">
                        <span className="text-3xl">
                          Enter any GitHub username
                        </span>
                        <form className="search-text" onSubmit={searchForUser}>
                          <input
                            className="max-w-[320px] max-md:w-[98%] rounded-full border border-gray-400 shadow-inner shadow-secondary py-2 px-4 text-lg  focus:border-blue-500 outline-none"
                            type="text"
                            placeholder="Search for User:"
                            value={userSearch}
                            onChange={(event) =>
                              setUserSearch(event.target.value)
                            }
                          />
                          <p className="p-1 px-2 text-gray-400">{userSearch}</p>
                        </form>
                        <div className="text-gray-400 p-1">
                          <h3 className="text-gray-800">Sample Text:</h3>
                          <div className="w-full text-center grid grid-cols-3 text-[16px]">
                            {SampleText.map((text, index) => (
                              <span key={index}>{text}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {foundUser ? (
                        <div className="w-2/3 max-md:w-[90%] mx-auto">
                          <div className="flex flex-wrap items-start justify-center gap-2">
                            <div className="p-3">
                              <img
                                className="min-w-[200px] max-h-[350px] rounded-sm border-2 border-white shadow-2xl shadow-blue-200"
                                src={foundUser.avatar_url}
                                alt={foundUser.name}
                              />
                            </div>
                            <div className="pl-2 py-4 flex flex-col gap-3 text-green-700">
                              <h3>
                                <strong>GitHub Username:</strong>
                                {foundUser.login}
                              </h3>
                              <p>
                                <strong>Repo link:</strong>
                                <span className="underline">
                                  {foundUser.html_url}
                                </span>
                              </p>
                              <p>
                                <strong>Name:</strong>
                                {foundUser.name}
                              </p>
                              {foundUser.company && (
                                <p>
                                  <strong>company:</strong>
                                  {foundUser.company}
                                </p>
                              )}
                              <p>
                                <strong>location:</strong>
                                {foundUser.location}
                              </p>
                              <p>
                                <strong>followers:</strong>
                                {foundUser.followers}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className=" w-2/3 max-md:w-[90%] mx-auto">
                          <div className=" my-8 flex flex-wrap items-center justify-center gap-2">
                            <p>No data is here</p>
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
