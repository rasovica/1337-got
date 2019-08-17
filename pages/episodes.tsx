import React, {useContext} from "react";
import styled from "styled-components";
import {DataContext} from "../utils/dataProvider";
import {EpisodeComponent} from "../components/episodeComponents";
import {ErrorComponent} from "../components/errorComponent";
import {LoadingComponent} from "../components/loadingComponent";

const StyledWrapper = styled.div`
  flex-grow: 0;

  display: flex;
  flex-direction: column; 
  justify-items: center;
  
  .content {
    display: flex;
    flex-direction: column;
    justify-items: center;

    .scrollable {
      overflow-y: auto;
      flex-grow: 0;
    }
  }
`;

export default () => {
    const data = useContext(DataContext);

    return (
        <StyledWrapper>
            { data.error && <ErrorComponent error={data.error}/>}
            { !data.error && data.characters.length === 0 && <LoadingComponent/>}
            <div className="content">
                <input type="text"/>
                <div className="scrollable">
                    { data.episodes.map(episode => <EpisodeComponent episode={episode}/>) }
                </div>
            </div>
        </StyledWrapper>
    )
}
