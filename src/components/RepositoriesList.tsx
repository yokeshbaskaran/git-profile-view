import { useEffect, useState } from "react";
import { IGitHubRepo } from "../interfaces/IGitHubRepo";
import axios from "axios";


const RepositoriesList = (props: { repositoriesUrl: string }) => {
    const { repositoriesUrl } = props;
    const [repositoriesList, setRepositoriesList] = useState<IGitHubRepo[]>([])

    useEffect(() => {
        (async () => {
            const result = await axios.get<IGitHubRepo[]>(repositoriesUrl)
            setRepositoriesList(result.data)
        })()
    }, [repositoriesUrl])


    return (
        <div>
            {!repositoriesList.length && <p>No Repos found.</p>}
            {!!repositoriesList.length && (
                <ul>
                    {
                        repositoriesList.map(repos => (
                            <li key={repos.id}>
                                <a href={repos.html_url} target="_blank" rel="noreferrer">
                                    {repos.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

export default RepositoriesList