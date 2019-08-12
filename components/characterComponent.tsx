import React from "react";
import styled from "styled-components";
import {Character} from "../models/character";

type CharacterProps = {
    character: Character
}

// Design stolen from: https://dribbble.com/shots/2378729-Speaker-Profile
const CharacterCard = styled.div<CharacterProps>`
    position: relative;

    min-width: 500px;
    height: 400px;

    background-color: ${props => props.character.alive ? '#4fe4c1' :  '#f97242'};
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);    

    .image {
      position: absolute;
      left: -10%;
      top: 0;
      bottom: 0;
      
      width: 40%;
      height: 70%;
      margin-top: auto;
      margin-bottom: auto;
      
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);    
    }
    
    .card {
      position: absolute;
      left: 35%;
      top: 20%;
    
      width: 70%;
      padding: 10px;
      z-index: 1;

      background-color: white;
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      
      font-family: 'Raleway', sans-serif;
      font-weight: 300;
      
      .name {
        margin-bottom: 10px;
        margin-top: 10px;
      
        font-size: 24px;
      }
      
      .house {
        color: #5296E3;
        font-size: 18px;
      }    
    }
`;

export const CharacterComponent: React.FunctionComponent<CharacterProps> = ({character}) => {
    console.log(character);

    return (
        <CharacterCard character={character}>
            { character.image && <div className="image" style={{backgroundImage: `url(${character.image}`}}/> }
            <div className="card">
                <h3 className="name">{ character.name}</h3>
                { character.house && <span className="house">{character.house}</span> }
            </div>
        </CharacterCard>
    )
};
