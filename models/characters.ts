import fetch from 'isomorphic-unfetch';
import {AllCharactersResponse} from "../interfaces/allCharactersResponse";
import {Character} from "./character";


export class Characters {
    private allCharacters: Character[] = [];

    public async load(): Promise<void> {
        const data: AllCharactersResponse = await fetch('https://api.got.show/api/book/characters')
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
}
