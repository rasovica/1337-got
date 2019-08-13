import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  padding: 20px;
  grid-row: 1;
  grid-column: 1 / -1; 
  border-radius: 5px;
  
  background-color: var(--green);
  box-shadow: var(--shadow);    
`;

export const LoadingComponent = () => {

    return <StyledWrapper>Loading...</StyledWrapper>
};
