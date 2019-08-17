import React, {useCallback, useEffect, useState} from "react";
import {Characters} from "../models/characters";

const emptyState = {
    loadMoreCharacters: null,
    charactersPaginator: null,
    error: null,
    characters: [],
    charactersObject: null,
};
const DataContext = React.createContext(emptyState);

const DataProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [charactersPaginator, setCharactersPaginator] = useState(null);
    const [charactersObject, setCharactersObject] = useState(null);
    const [error, setError] = useState(null);

    const loadMoreCharacters = useCallback(() => {
        setCharacters([...characters, ...charactersPaginator.next().data])
    }, [characters, charactersPaginator]);

    useEffect(() => {
        const charactersObject = new Characters();

        charactersObject.load()
            .then(() => {
               const charactersObjectPaginator = charactersObject.paginator();

               setCharacters(charactersObjectPaginator.next().data);
               setCharactersPaginator(charactersObjectPaginator);
               setCharactersObject(charactersObject);
            })
            .catch(setError);
    }, []);

    return (
        <DataContext.Provider value={{
            characters,
            error,
            loadMoreCharacters,
            charactersPaginator,
            charactersObject,
        }}>
        { children }
        </DataContext.Provider>
    )
};

export {DataProvider, DataContext};
