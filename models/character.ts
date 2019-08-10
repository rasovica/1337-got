import {CharacterStub} from "../interfaces/allCharactersResponse";


export class Character {
    name: string;
    image: string;
    religion: string;
    siblings: string[];

    constructor({name, image, religion, siblings}) {
        this.name = name;
        this.image = image;
        this.religion = religion;
        this.siblings = siblings;
    }

    public static reduce(chr: CharacterStub) {
        return new Character(chr);
    }
}
