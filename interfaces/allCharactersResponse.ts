export interface CharacterStub {
    name: string;
    image: string;
    religion: string;
    siblings: string[];
}

export type AllCharactersResponse = CharacterStub[];
