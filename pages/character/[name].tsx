import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import styled from "styled-components";
import {DataContext} from "../../utils/dataProvider";
import {useRouter} from "next/router";
import {Character} from "../../models/character";

const StyledLi = styled.li`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const CharacterLink = ({name}) => {
    return (
        <StyledLi>
            <Link href="/character/[name]" as={`/character/${name}`}>
                <a>{name}</a>
            </Link>
        </StyledLi>
    )
};

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
    const name = router.query.name.toString();

    useEffect(() => {
        if (data.charactersObject) {
            setCharacter(data.charactersObject.getCharacter(name));
        } else {
            Character.getByName(name).then(setCharacter);
        }
    }, [data]);

    return (
        <CharacterWrapper character={character}>
            {
                character && <div className="character">
                    { character.name }
                </div>
            }
        </CharacterWrapper>
    );
}
