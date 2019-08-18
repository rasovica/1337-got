import styled from "styled-components";
import Link from "next/link";
import React from "react";

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
