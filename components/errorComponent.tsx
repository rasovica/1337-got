import React from "react";
import styled from "styled-components";

type ErrorComponentProps = {
    error: Error,
}

const StyledWrapper = styled.div`
  padding: 20px;
  grid-row: 1;
  grid-column: 1 / -1; 
  border-radius: 5px;
  
  background-color: var(--red);
  box-shadow: var(--shadow);    
`;

export const ErrorComponent = ({error}: ErrorComponentProps) => {

    return <StyledWrapper>Error! {error.message}</StyledWrapper>
};