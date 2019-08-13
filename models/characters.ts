import fetch from 'isomorphic-unfetch';

import {AllCharactersResponse} from "../interfaces/allCharactersResponse";
import {Character} from "./character";
import {BASE_URL} from "../constants";

type CharacterLookup = {
    [name: string]: Character | undefined;
}

export class Characters {
    private allCharacters: Character[] = [];
    private characterLookup: CharacterLookup = {};

    public async load(): Promise<void> {
        const data: AllCharactersResponse = await fetch(BASE_URL)
                        .then(response => {
                            return response.json()
                        });

        this.allCharacters = data.sort((a, b) =>{
            const lowerA = a.name.toLowerCase();
            const lowerB = b.name.toLowerCase();

            if(lowerA < lowerB) { return -1; }
            if(lowerA > lowerB) { return 1; }
            return 0;
        }).map(Character.reduce);

        this.createSiblings();
    }

    public paginator(size = 10) {
        let page = 0;

        return {
            next: () => {
                const data = this.allCharacters.slice(page * size, (page + 1) * size);
                page += 1;

                return {data, done: data.length === 0}
            }
        };
    }

    private createSiblings() {
        this.allCharacters.forEach((character: Character) => {
            if (this.characterLookup[character.name]) {
                // TODO: Do something
                throw new Error('Duplicate slug found');
            }

            this.characterLookup[character.name] = character;
            character.siblingsNames.forEach((siblingName) => {
                if (this.characterLookup[siblingName]) {
                    this.characterLookup[siblingName].addSibling(character);
                    character.addSibling(this.characterLookup[siblingName]);
                }
            });
        });
    }
}
