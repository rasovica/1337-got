import React, {useMemo, useState} from "react";
import {Characters} from "../models/characters";

const emptyState = {
    loadCharacters: null,
    characters: [],
    episodes: [],
};
const DataContext = React.createContext(emptyState);

const DataProvider = ({ children }) => {
    const [data, setData] = useState(emptyState);
    useMemo(() => {
        const characters = new Characters();
        characters.load().then(() => {
            const paginator = characters.paginator();

            setData({
                ...emptyState,
                loadCharacters: paginator,
                characters: [...data.characters, ...paginator.next().data]
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
