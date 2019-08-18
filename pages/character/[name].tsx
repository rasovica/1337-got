import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import styled from "styled-components";
import {DataContext} from "../../context/dataProvider";
import {useRouter} from "next/router";
import {Character} from "../../models/character";
import {ErrorComponent} from "../../components/errorComponent";

type CharacterProps = {
    character: Character
}

const CharacterWrapper = styled.div<CharacterProps>`
    display: grid;
    justify-items: center;
    
    .character {
        width: 70%;
        background-color: ${props => props.character && props.character.alive ? 'var(--green)' :  'var(--red)'};
        box-shadow: var(--shadow);    
    }
`;

export default () => {
    const [character, setCharacter] = useState(null);
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
                character && <div className="character">
                    { character.name }
                </div>
            }
        </CharacterWrapper>
    );
}

const StyledWrapper = styled.div`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const CharacterLink = ({children, name}) => {
    return (
        <StyledWrapper>
            <Link href="/character/[name]" as={`/character/${name}`}>
                <a>
                    {children}
                </a>
            </Link>
        </StyledWrapper>
    )
};
