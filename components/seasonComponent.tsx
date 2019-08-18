import React from "react";
import styled from "styled-components";

import {Episode} from "../models/episode";
import {EpisodeComponent} from "./episodeComponent";

type SeasonComponentProps = {
  season: string;
  episodes: Episode[];
  filter: string;
};

const StyledWrapper = styled.div`
  padding-bottom: 20px;
`;

export const SeasonComponent = ({season, episodes, filter}: SeasonComponentProps) => {
    const filterPredicate = (item: Episode) => {
        const lowercaseFilter = filter.toLowerCase();
        const lowercaseTitle = item.title.toLowerCase();
        const lowercaseId = item.id.toLowerCase();

        return lowercaseTitle.includes(lowercaseFilter) || lowercaseId.includes(lowercaseFilter);
    };

    const filteredEpisodes = episodes.filter(filterPredicate);

    return (
        filteredEpisodes.length > 0 && <StyledWrapper>
            <h3>Season { season }</h3>
            <div>
                { filteredEpisodes.map(episode => <EpisodeComponent episode={episode}/>) }
            </div>
        </StyledWrapper>
    )
};
