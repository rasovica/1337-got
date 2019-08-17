export interface EpisodeStub {
    characters: string[];
    name: string;
    season: number;
    nr: number;
    totalNr: number;
    director: string;
    airDate: string;
}

export interface AllEpisodesResponse {
    message: string;
    data: EpisodeStub[];
}
