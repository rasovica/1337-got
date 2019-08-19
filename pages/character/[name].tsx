import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {useRouter} from "next/router";

import {DataContext} from "../../context/dataProvider";
import {Character} from "../../models/character";
import {ErrorComponent} from "../../components/errorComponent";
import {CharacterLink} from "../../components/characterLinkComponent";

type CharacterProps = {
    character: Character;
};

const CharacterWrapper = styled.div<CharacterProps>`
    display: grid;
    justify-items: center;
    
    .character {
        width: 500px;
        padding: 20px;

        background-color: ${props => props.character && props.character.alive ? 'var(--green)' :  'var(--red)'};
        box-shadow: var(--shadow);
        
        text-align: center;
        
        .about {
            display: flex;
            flex-direction: row;
            
            div {
              width: 100%;
            }
            
            .image {
                width: 100%;
                height: 300px;
                
                background-repeat: no-repeat;
                background-size: contain;
                background-position: top center;
            }
        }
        
        @media (max-width: 580px) {
            &.character {
                width: 300px;            
            }
        }
    }
`;

export default () => {
    const [character, setCharacter] = useState<Character>(null);
    const router = useRouter();
    const data = useContext(DataContext);
    const name = router.query.name as string;

    useEffect(() => {
        if (data.state.charactersObject) {
            setCharacter(data.state.charactersObject.getCharacter(name));
        }
    }, [data.state.charactersObject]);

    return (
        <CharacterWrapper character={character}>
            {
                data.state.error && <ErrorComponent error={data.state.error}/>
            }
            {
                character &&
                <div className="character">
                    <h2>{character.name}</h2>
                    {
                        character.religion.length > 0 &&
                        <h3>Religion: {character.religion[0]}</h3>
                    }
                    <div className="about">
                        {
                            character.siblings.length > 0 &&
                            <div>
                                <h4>Siblings: </h4>
                                {
                                    character.siblings.map(sibling =>
                                        <CharacterLink key={sibling.name} name={sibling.name}>
                                            <span>{sibling.name}</span>
                                        </CharacterLink>
                                    )
                                }
                            </div>
                        }
                        {
                            character.image && <div className="image" style={{backgroundImage: `url(${character.image})`}}/>
                        }
                    </div>
                </div>
            }
        </CharacterWrapper>
    );
}
