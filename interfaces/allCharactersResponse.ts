export interface CharacterStub {
    name: string;
    image: string;
    siblings: string[];
    house?: string;
    alive: boolean;
    culture: string[];
    religion: string[];
}

export type AllCharactersResponse = CharacterStub[];
