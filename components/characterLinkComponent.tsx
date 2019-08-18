import styled from "styled-components";
import Link from "next/link";
import React from "react";

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
