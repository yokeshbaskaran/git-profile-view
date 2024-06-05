import axios from "axios";
import { useEffect, useState } from "react";
import { IGitHubGist } from "../interfaces/IGitHubGist";

const GistsList = (props: { gistsUrl: string }) => {
  const { gistsUrl } = props;
  const [gistsList, setGistsLists] = useState<IGitHubGist[]>([]);

  useEffect(() => {
    (async () => {
      const url = gistsUrl.replace(/\{.*\}/, "");
      const result = await axios.get<IGitHubGist[]>(url);
      setGistsLists(result.data);
    })();
  }, [gistsUrl]);

  return (
    <>
      <h2 className="my-5 text-center text-4xl font-semibold">Gists List</h2>
      <div className="px-5 py-3">
        {!gistsList.length && <p>No gists found.</p>}
        {!!gistsList.length && (
          <ol className="underline list-decimal">
            {gistsList.map((gist) => (
              <li key={gist.id}>
                <a href={gist.html_url} target="_blank" rel="noreferrer">
                  {gist.description || "No Description!"}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
};

export default GistsList;
