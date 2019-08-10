import React from "react";
import styled from "styled-components";
import {Character} from "../models/character";

const CharacterCard = styled.div`
    background-color: #fafafa;
    min-width: 500px;
    height: 600px;
`;

type CharacterProps = {
    character: Character
}

export const CharacterComponent: React.FunctionComponent<CharacterProps> = ({character}) => {
    return (
        <CharacterCard>
            { character.name}
        </CharacterCard>
    )
};
