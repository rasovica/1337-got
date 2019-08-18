import React from "react";

import {Episode} from "../models/episode";

type EpisodeComponentProps = {
    episode: Episode
}

export const EpisodeComponent = ({episode}: EpisodeComponentProps) => {
    return (
        <div>
            { episode.title }
        </div>
    )
};
