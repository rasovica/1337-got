import { useRouter } from 'next/router';
import React from "react";
import Link from "next/link";
import styled from "styled-components";

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
    const router = useRouter();

    return (
        <div>{router.query.name}</div>
    );
}
