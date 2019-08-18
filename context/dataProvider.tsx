import React, {Dispatch, useEffect, useReducer} from "react";

import {Characters} from "../models/characters";
import {Episodes} from "../models/episodes";
import {Character} from "../models/character";
import {Episode} from "../models/episode";

type Action = {
        type: Actions.doneLoading,
        payload: {
            charactersObject: Characters,
            episodesObject: Episodes,
        },
    } | {
        type: Actions.setError,
        payload: Error,
    } | {
        type: Actions.moreCharacters
};

enum Actions {
    doneLoading,
    moreCharacters,
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
        case Actions.doneLoading:
            action.payload.episodesObject.connectCharacters(action.payload.charactersObject);

            return {
                ...state,
                charactersObject: action.payload.charactersObject,
                episodesObject: action.payload.episodesObject,
            };
        case Actions.moreCharacters:
            return {
                ...state,
                characters: [
                    ...state.characters,
                    ...state.charactersObject.loadMoreCharacters.next().value
                ],
            };
        case Actions.setError:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

const DataContext = React.createContext<Context>(null);

const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const charactersObject = new Characters();
        const episodesObject = new Episodes();

        Promise.all([
            charactersObject.load(),
            episodesObject.load(),
        ]).then(() => {
            dispatch({type: Actions.doneLoading, payload: {charactersObject, episodesObject}});
        }).catch(error => dispatch({type: Actions.setError, payload: error}))
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
