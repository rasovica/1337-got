import React, {FunctionComponent, useMemo} from "react";
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
  width: 300px;
`;

export const SeasonComponent: FunctionComponent<SeasonComponentProps> = ({season, episodes, filter}) => {
    const filteredEpisodes = useMemo(() => {
        const filterPredicate = (item: Episode) => {
            const lowercaseFilter = filter.toLowerCase();
            const lowercaseTitle = item.title.toLowerCase();
            const lowercaseId = item.id.toLowerCase();

            return lowercaseTitle.includes(lowercaseFilter) || lowercaseId.includes(lowercaseFilter);
        };

        return episodes.filter(filterPredicate);
    }, [episodes, filter]);

    return (
        filteredEpisodes.length > 0 &&
        <StyledWrapper>
            <h3>Season { season }</h3>
            <div>
                { filteredEpisodes.map(episode => <EpisodeComponent key={episode.id} episode={episode}/>) }
            </div>
        </StyledWrapper>
    )
};
