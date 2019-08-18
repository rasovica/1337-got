import React, {useContext, useState} from "react";
import styled from "styled-components";
import {DataContext} from "../context/dataProvider";
import {ErrorComponent} from "../components/errorComponent";
import {LoadingComponent} from "../components/loadingComponent";
import {SeasonComponent} from "../components/seasonComponent";

const StyledWrapper = styled.div`
  flex-grow: 0;

  display: flex;
  flex-direction: column; 
  justify-items: center;
  overflow-y: hidden;
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
        
    .search {
      width: 200px;
      border: 2px solid black;
      border-radius: 4px;
      
      margin-bottom: 20px;
      margin-top: 20px;
      
      font-family: 'Raleway', sans-serif;
      font-size: 18px;
    }
  

    .scrollable {
      flex-grow: 0;
      
      display: grid;
      width: 100%;
      justify-content: center;
      overflow-y: auto;
      
      padding-bottom: 20px;
    }
  }
`;

export default () => {
    const data = useContext(DataContext);
    const [filter, setFilter] = useState<string>('');

    return (
        <StyledWrapper>
            <div className="content">
                <input value={filter} onChange={event => setFilter(event.target.value)} type="text" className="search"
                       placeholder="Search (title, S1E1)..."/>
                <div className="scrollable">
                    {data.state.error && <ErrorComponent error={data.state.error}/>}
                    {!data.state.episodesObject && <LoadingComponent/>}
                    {data.state.episodesObject && Object.keys(data.state.episodesObject.groupedBySeason)
                        .map(season => <SeasonComponent
                            key={season}
                            season={season}
                            episodes={data.state.episodesObject.groupedBySeason[season]}
                            filter={filter}/>
                        )
                    }
                </div>
            </div>
        </StyledWrapper>
    )
}
