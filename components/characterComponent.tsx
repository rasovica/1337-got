import React from "react";
import styled from "styled-components";
import {Character} from "../models/character";
import {CharacterLink} from "../pages/character/[name]";

type CharacterProps = {
    character: Character
}

// Design stolen from: https://dribbble.com/shots/2378729-Speaker-Profile
const CharacterCard = styled.div<CharacterProps>`
    position: relative;

    min-width: 300px;
    width: 70%;
    height: 400px;

    background-color: ${props => props.character.alive ? 'var(--green)' :  'var(--red)'};
    box-shadow: var(--shadow);    

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
      box-shadow: var(--shadow);    
    }
    
    .card {
      position: absolute;
      left: 35%;
      top: 20%;
    
      width: 70%;
      padding: 10px;
      z-index: 1;

      background-color: white;
      box-shadow: var(--shadow);
      
      &.no-img {
        left: 10%;
        width: 80%;
        transform: translateX(-10px);
      }
      
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
    
    .siblings {
      position: absolute;
      
      top: 50%;
      left: 35%;
      width: 65%;
      max-height: 50%;
    }
`;

export const CharacterComponent: React.FunctionComponent<CharacterProps> = ({character}) => {

    return (
        <CharacterCard character={character}>
            { character.image && <div className="image" style={{backgroundImage: `url(${character.image}`}}/> }
            <div className={character.image ? 'card' : 'card no-img'}>
                <h3 className="name">{ character.name}</h3>
                { character.house && <span className="house">{character.house}</span> }
            </div>
            { character.siblings.length > 0 &&
                <div className={"siblings"}>
                    <h3>Siblings:</h3>
                    <ul>
                        { character.siblings.map(sibling => <CharacterLink key={sibling.name} name={sibling.name}/>)}
                    </ul>
                </div>
            }
        </CharacterCard>
    )
};
