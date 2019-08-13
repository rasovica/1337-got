import {CharacterStub} from "../interfaces/allCharactersResponse";


export class Character {
    name: string;
    image: string;
    house?: string;
    alive: boolean;
    siblings: Character[] = [];
    siblingsNames: string[];

    constructor({name, image, house, siblings, alive}: CharacterStub) {
        this.name = name;
        this.image = image;
        this.house = house;
        this.siblingsNames = siblings;
        this.alive = alive;
    }

    public static reduce(chr: CharacterStub) {
        return new Character(chr);
    }

    public addSibling(chr: Character) {
        if (this.siblingsNames.includes(chr.name) && !this.isSibling(chr)) {
            this.siblings.push(chr);
        }
    }

    public isSibling(chr: Character) {
        return this.siblings.includes(chr);
    }
}
