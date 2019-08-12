import {CharacterStub} from "../interfaces/allCharactersResponse";


export class Character {
    name: string;
    image: string;
    house?: string;
    siblings: string[];
    alive: boolean;

    constructor({name, image, house, siblings, alive}: CharacterStub) {
        this.name = name;
        this.image = image;
        this.house = house;
        this.siblings = siblings;
        this.alive = alive;
    }

    public static reduce(chr: CharacterStub) {
        return new Character(chr);
    }
}
