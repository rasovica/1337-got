import React, {useMemo, useState} from "react";
import {Characters} from "../models/characters";

const emptyState = {
    loadMoreCharacters: null,
    characters: [],
    charactersPaginator: null,
    episodes: [],
};
const DataContext = React.createContext(emptyState);

const DataProvider = ({ children }) => {
    const [data, setData] = useState(emptyState);
    useMemo(() => {
        const characters = new Characters();
        characters.load().then(() => {
            const charactersPaginator = characters.paginator();

            setData({
                ...emptyState,
                characters: [...data.characters, ...charactersPaginator.next().data],
                charactersPaginator,
            })
        });
    }, []);

    return (
        <DataContext.Provider value={data}>
            { children }
        </DataContext.Provider>
    )
};

export {DataProvider, DataContext};
