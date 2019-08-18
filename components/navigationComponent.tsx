import React from "react";
import styled from "styled-components";
import Link from "next/link";
import {useRouter} from "next/router";

const StyledWrapper = styled.div` 
  display: flex;
  
  justify-content: center;

  margin-bottom: 50px;
  margin-top: 20px;
  
  a {
    margin-left: 20px;
    margin-right: 20px;
    
    color: inherit;
    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
    
    :hover {
      border-bottom: 1px solid black;
    }
    
    &.active {
      border-bottom: 1px solid black;
    }
  }
`;

export const NavigationComponent = () => {
    const router = useRouter();
    const isSubPage = router.route !== '/' && router.route !== '/episodes';

    return (
        <div>
            <StyledWrapper>
                <Link href="/">
                    <a className={router.route === '/' ? 'active' : undefined}>Characters</a>
                </Link>
                <Link href="/episodes">
                    <a className={router.route === '/episodes' ? 'active' : undefined}>Episodes</a>
                </Link>
                { isSubPage && <a href="#" onClick={router.back}>Back</a> }
            </StyledWrapper>
        </div>
    )
};
