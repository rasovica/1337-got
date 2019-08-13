import React, {useContext} from 'react';
import {DataContext} from "../utils/dataProvider";
import {CharacterComponent} from "../components/characterComponent";
import styled from "styled-components";
import {LoadingComponent} from "../components/loadingComponent";
import {ErrorComponent} from "../components/errorComponent";

const StyledIndex = styled.div`
  height: 100vh;
  
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  grid-auto-flow: row;
  grid-auto-rows: minmax(min-content, max-content);
  justify-items: center;
  overflow-y: scroll;
  
  @media (max-width: 1200px) {
      grid-template-columns: repeat(1, 1fr);
  }
`;

export default () => {
    const data = useContext(DataContext);
    const scrollHandler = (event) => {
        if (event.target.scrollTop + event.target.clientHeight + 100 >= event.target.scrollHeight) {
            data.loadMoreCharacters();
        }
    };

    return (
        <StyledIndex onScroll={(e) => scrollHandler(e)}>
            { data.error && <ErrorComponent error={data.error}/>}
            { !data.error && data.characters.length === 0 && <LoadingComponent/>}
            { data.characters.map(character => <CharacterComponent character={character} key={character.name}/>) }
        </StyledIndex>
    )
}
