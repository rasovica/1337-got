import React from "react";

import {Episode} from "../models/episode";
import {EpisodeLink} from "../pages/episode/[title]";

type EpisodeComponentProps = {
    episode: Episode
}

export const EpisodeComponent = ({episode}: EpisodeComponentProps) => {
    return (
        <EpisodeLink title={episode.title}>
            <div>
                { episode.title }
            </div>
        </EpisodeLink>
    )
};
