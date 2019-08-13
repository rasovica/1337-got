export interface CharacterStub {
    name: string;
    image: string;
    siblings: string[];
    house?: string;
    alive: boolean;
}

export type AllCharactersResponse = CharacterStub[];
