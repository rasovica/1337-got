import React, {useCallback, useMemo, useState} from "react";
import {Characters} from "../models/characters";

const emptyState = {
    loadMoreCharacters: null,
    charactersPaginator: null,
    characters: [],
};
const DataContext = React.createContext(emptyState);

const DataProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [charactersPaginator, setCharactersPaginator] = useState(null);

    const loadMoreCharacters = useCallback(() => {
        setCharacters([...characters, ...charactersPaginator.next().data])
    }, [characters, charactersPaginator]);

    useMemo(() => {
        const charactersObject = new Characters();

        charactersObject.load()
            .then(() => {
               const charactersObjectPaginator = charactersObject.paginator();

               setCharacters(charactersObjectPaginator.next().data);
               setCharactersPaginator(charactersObjectPaginator);
            });
    }, []);

    return (
        <DataContext.Provider value={{
            characters,
            loadMoreCharacters,
            charactersPaginator,
        }}>
            { children }
        </DataContext.Provider>
    )
};

export {DataProvider, DataContext};
