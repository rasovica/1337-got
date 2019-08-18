import React, {FunctionComponent} from "react";

import {Episode} from "../models/episode";
import {EpisodeLink} from "../pages/episode/[title]";

type EpisodeComponentProps = {
    episode: Episode
};

export const EpisodeComponent: FunctionComponent<EpisodeComponentProps> = ({episode}) => {

    return (
        <EpisodeLink title={episode.title}>
            <div>
                { episode.title }
            </div>
        </EpisodeLink>
    );
};
