import { useEffect, useState } from "react";
import { IGitHubRepo } from "../interfaces/IGitHubRepo";
import axios from "axios";

const RepositoriesList = (props: { repositoriesUrl: string }) => {
  const { repositoriesUrl } = props;
  const [repositoriesList, setRepositoriesList] = useState<IGitHubRepo[]>([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get<IGitHubRepo[]>(repositoriesUrl);
      setRepositoriesList(result.data);
    })();
  }, [repositoriesUrl]);

  return (
    <>
      <h2 className="my-3 text-center text-4xl font-semibold">
        Repositories List
      </h2>
      <div className="px-5 py-3">
        {!repositoriesList.length && <p>No Repos found.</p>}
        {!!repositoriesList.length && (
          <ol className="underline list-decimal">
            {repositoriesList.map((repos) => (
              <li key={repos.id}>
                <a href={repos.html_url} target="_blank" rel="noreferrer">
                  {repos.name}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
};

export default RepositoriesList;
