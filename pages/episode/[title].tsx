import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import Link from "next/link";

import {DataContext} from "../../context/dataProvider";
import {ErrorComponent} from "../../components/errorComponent";
import {Episode} from "../../models/episode";

type EpisodeProps = {
    episode: Episode
}

const EpisodeWrapper = styled.div<EpisodeProps>`
    display: grid;
    justify-items: center;
    
    .character {
        width: 70%;
        box-shadow: var(--shadow);    
    }
`;

export default () => {
    const [episode, setEpisode] = useState<Episode>(null);
    const router = useRouter();
    const data = useContext(DataContext);
    const title = router.query.title as string;

    useEffect(() => {
        if (data.state.episodesObject) {
            setEpisode(data.state.episodesObject.getEpisode(title));
        }
    }, [data.state.episodesObject]);

    return (
        <EpisodeWrapper episode={episode}>
            {
                data.state.error && <ErrorComponent error={data.state.error}/>
            }
            {
                episode && <div className="episode">
                    { episode.title }
                </div>
            }
        </EpisodeWrapper>
    );
}

const StyledWrapper = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const EpisodeLink = ({children, title}) => {
    return (
        <StyledWrapper>
            <Link href="/episode/[title]" as={`/episode/${title}`}>
                <a>
                    {children}
                </a>
            </Link>
        </StyledWrapper>
    )
};
