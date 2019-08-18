import React, {FunctionComponent, useEffect} from "react";
import styled from "styled-components";

type ErrorComponentProps = {
    error: Error,
};

const StyledWrapper = styled.div`
  padding: 20px;
  grid-row: 1;
  grid-column: 1 / -1; 
  
  background-color: var(--red);
  box-shadow: var(--shadow);    
`;

export const ErrorComponent: FunctionComponent<ErrorComponentProps> = ({error}) => {
    useEffect(() => {
        console.error(error);
    }, []);

    return (
        <StyledWrapper>Error! {error.message}</StyledWrapper>
    );
};
