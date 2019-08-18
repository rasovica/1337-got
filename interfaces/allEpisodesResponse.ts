export interface EpisodeStub {
    characters: string[];
    places: string[];
    title: string;
    season: number;
    episode: number;
}

export type AllEpisodesResponse = EpisodeStub[];
