import fetch from 'isomorphic-unfetch';

import {AllCharactersResponse} from "../interfaces/allCharactersResponse";
import {Character} from "./character";
import {BASE_URL, ENDPOINTS} from "../constants";

type CharacterLookup = {
    [name: string]: Character | undefined;
}

export class Characters {
    private allCharacters: Character[] = [];
    private characterLookup: CharacterLookup = {};

    public loadMoreCharacters?: IterableIterator<Character[]> = null;

    public async load(): Promise<void> {
        const data: AllCharactersResponse = await fetch(BASE_URL + ENDPOINTS.allCharacters)
                        .then(response => {
                            return response.json()
                        });

        this.allCharacters = data.sort((a, b) =>{
            const lowerA = a.name.toLowerCase();
            const lowerB = b.name.toLowerCase();

            if(lowerA < lowerB) { return -1; }
            if(lowerA > lowerB) { return 1; }
            return 0;
        }).map(character => Character.reduce(character));

        this.createSiblings();
        this.loadMoreCharacters = this.paginator();
    }

    public getCharacter(name: string): Character | undefined {
        return this.characterLookup[name];
    }

    public getCharacters(characters: string[]): Character[] {
        return characters
            .map(characterName => this.getCharacter(characterName))
            .filter(item => item !== undefined);
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

    private *paginator(size = 10) {
        let page = 0;
        let data = [];

        do {
            data = this.allCharacters.slice(page * size, (page + 1) * size);
            page += 1;

            yield data;
        } while (data.length > 0);
    }
}
