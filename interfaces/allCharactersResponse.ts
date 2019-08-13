export interface CharacterStub {
    name: string;
    image: string;
    spouse: string[];
    children: string[];
    house?: string;
    alive: boolean;
}

export type AllCharactersResponse = CharacterStub[];
