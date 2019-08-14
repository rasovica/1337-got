import {CharacterStub} from "../interfaces/allCharactersResponse";
import fetch from "isomorphic-unfetch";
import {BASE_URL, ENDPOINT_ENUM} from "../constants";


export class Character {
    name: string;
    image: string;
    house?: string;
    alive: boolean;
    siblings: Character[] = [];
    siblingsNames: string[];
    culture: string[];
    religion: string[];

    constructor({name, image, house, siblings, alive, culture, religion}: CharacterStub) {
        this.name = name;
        this.image = image;
        this.house = house;
        this.siblingsNames = siblings;
        this.alive = alive;
        this.culture = culture;
        this.religion = religion;
    }

    public static reduce(chr: CharacterStub) {
        return new Character(chr);
    }

    public static async getByName(name: string) {
        const data: CharacterStub = await fetch(BASE_URL + ENDPOINT_ENUM.character + name)
            .then(response => {
                return response.json()
            });
        return this.reduce(data);
    };

    public addSibling(chr: Character) {
        if (this.siblingsNames.includes(chr.name) && !this.isSibling(chr)) {
            this.siblings.push(chr);
        }
    }

    public isSibling(chr: Character) {
        return this.siblings.includes(chr);
    }
}
