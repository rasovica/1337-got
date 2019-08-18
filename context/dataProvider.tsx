import React, {Dispatch, useEffect, useReducer} from "react";

import {Characters} from "../models/characters";
import {Episodes} from "../models/episodes";
import {Character} from "../models/character";
import {Episode} from "../models/episode";

type Action = {
    type: Actions;
    payload?: any;
}

enum Actions {
    setCharacters,
    moreCharacters,
    setEpisodes,
    setError,
}

type Context = {
    state: State;
    dispatch: Dispatch<Action>;
}

type State = {
    error?: Error;
    characters: Character[];
    charactersObject?: Characters;
    episodes: Episode[];
    episodesObject?: Episodes;
}

const initialState: State = {
    error: null,
    characters: [],
    charactersObject: null,
    episodes: [],
    episodesObject: null,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case Actions.setCharacters:
            return {
                ...state,
                charactersObject: action.payload,
            };
        case Actions.setEpisodes:
            return {
                ...state,
                episodesObject: action.payload,
            };
        case Actions.moreCharacters:
            return {
                ...state,
                characters: [...state.characters, ...state.charactersObject.loadMoreCharacters.next().value],
            };
        case Actions.setError:
            return {
                ...state,
                error: action.payload,
            };
        default:
            throw new Error('Non action');
    }
};

const DataContext = React.createContext<Context>(null);

const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const charactersObject = new Characters();

        charactersObject.load()
            .then(() => {
                dispatch({type: Actions.setCharacters, payload: charactersObject});

                const episodesObject = new Episodes();

                episodesObject.load(charactersObject).then(() => {
                    dispatch({type: Actions.setEpisodes, payload: episodesObject})
                });
            })
            .catch(error => dispatch({type: Actions.setError, payload: error}))
    }, []);

    return (
        <DataContext.Provider value={{
            state,
            dispatch,
        }}>
            { children }
        </DataContext.Provider>
    )
};

export {DataProvider, DataContext, Actions};
