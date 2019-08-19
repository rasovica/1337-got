import React, {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import styled from "styled-components";

import {DataContext} from "../../context/dataProvider";
import {ErrorComponent} from "../../components/errorComponent";
import {Episode} from "../../models/episode";
import {CharacterLink} from "../../components/characterLinkComponent";

type EpisodeProps = {
    episode: Episode
};

const EpisodeWrapper = styled.div<EpisodeProps>`
    display: grid;
    justify-items: center;
    
    .episode {
        width: 70%;
        padding: 20px;
        
        box-shadow: var(--shadow);   
        background-color: #4fe4c1;
        
        text-align: center;
        
        .about {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          
          div {
            display: flex;
            flex-direction: column;
          }
        }
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
                episode &&
                <div className="episode">
                    <h2>{episode.id}: {episode.title}</h2>
                    <h3>Directed by: {episode.directedBy}</h3>
                    <div className="about">
                        {
                            episode.places.length !== 0 &&
                            <div>
                                <h4>Places: </h4>
                                {episode.places.map(place => <span key={place}>{place}</span>)}
                            </div>
                        }
                        {
                            episode.deaths.length !== 0 &&
                            <div>
                                <h4>Deaths: </h4>
                                {
                                    episode.deaths.map(character =>
                                        <CharacterLink name={character.name} key={character.name}>
                                            <span>{character.name}</span>
                                        </CharacterLink>
                                    )
                                }
                            </div>
                        }
                    </div>
                </div>
            }
            {
                data.state.episodesObject && !episode && <ErrorComponent error={new Error("Can't find episode")}/>
            }
        </EpisodeWrapper>
    );
}
