import React, {useCallback, useEffect, useState} from "react";
import {Characters} from "../models/characters";
import {Episodes} from "../models/episdoes";

const emptyState = {
    loadMoreCharacters: null,
    charactersPaginator: null,
    error: null,
    characters: [],
    charactersObject: null,
    episodes: [],
    episodesObject: null,
};
const DataContext = React.createContext(emptyState);

const DataProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [charactersPaginator, setCharactersPaginator] = useState(null);
    const [charactersObject, setCharactersObject] = useState(null);
    const loadMoreCharacters = useCallback(() => {
        setCharacters([...characters, ...charactersPaginator.next().data])
    }, [characters, charactersPaginator]);

    const [episodes, setEpisodes] = useState([]);
    const [episodesObject, setepisodesObject] = useState(null);


    const [error, setError] = useState(null);

    useEffect(() => {
        const charactersObject = new Characters();

        charactersObject.load()
            .then(() => {
               const charactersObjectPaginator = charactersObject.paginator();

               setCharacters(charactersObjectPaginator.next().data);
               setCharactersPaginator(charactersObjectPaginator);
               setCharactersObject(charactersObject);

               const episodesObject = new Episodes();
               episodesObject.load(charactersObject).then(
                   () => {
                       setEpisodes(episodesObject.allEpisodes);
                       setepisodesObject(episodesObject);
                   }
               );
            })
            .catch(setError);
    }, []);

    return (
        <DataContext.Provider value={{
            characters,
            loadMoreCharacters,
            charactersPaginator,
            charactersObject,

            episodes,
            episodesObject,

            error,
        }}>
        { children }
        </DataContext.Provider>
    )
};

export {DataProvider, DataContext};
