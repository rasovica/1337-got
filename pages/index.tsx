import React, {useContext, useEffect} from 'react';
import styled from "styled-components";

import {Actions, DataContext} from "../context/dataProvider";
import {CharacterComponent} from "../components/characterComponent";
import {LoadingComponent} from "../components/loadingComponent";
import {ErrorComponent} from "../components/errorComponent";

const StyledIndex = styled.div`
  display: grid;
  flex-grow: 0;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  grid-auto-flow: row;
  grid-auto-rows: minmax(min-content, max-content);
  justify-items: center;
  overflow-y: auto;
  
  @media (max-width: 1200px) {
      grid-template-columns: repeat(1, 1fr);
  }
`;

export default () => {
    const data = useContext(DataContext);

    const scrollHandler = (event) => {
        if (event.target.scrollTop + event.target.clientHeight + 100 >= event.target.scrollHeight) {
            data.dispatch({type: Actions.moreCharacters});
        }
    };

    useEffect(() => {
        if (data.state.charactersObject) {
            data.dispatch({type: Actions.moreCharacters});
        }
    }, [data.state.charactersObject]);

    return (
        <StyledIndex onScroll={(e) => scrollHandler(e)}>
            { data.state.error && <ErrorComponent error={data.state.error}/>}
            { !data.state.charactersObject && <LoadingComponent/>}
            { data.state.characters.map(character => <CharacterComponent character={character} key={character.name}/>) }
        </StyledIndex>
    )
}
