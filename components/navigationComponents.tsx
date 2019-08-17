import React from "react";
import styled from "styled-components";
import Link from "next/link";


const StyledWrapper = styled.div` 
  margin-bottom: 50px;
`;

export const NavigationComponent = () => {

    return (
        <div>
            <StyledWrapper>
                <Link href="/">
                    Characters
                </Link>
                <Link href="/episodes">
                    <a>Episodes</a>
                </Link>
            </StyledWrapper>
        </div>
    )
};
