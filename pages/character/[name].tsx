import { useRouter } from 'next/router';
import React, {useContext} from "react";
import Link from "next/link";
import styled from "styled-components";
import {DataContext} from "../../utils/dataProvider";
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

export default () => {
    const context = useContext(DataContext);
    const router = useRouter();
    const name = router.query.name;
    console.log(context);
    const character: Character | null = context.getCharacter(name);

    return (
        <div>{character.name}</div>
    );
}
