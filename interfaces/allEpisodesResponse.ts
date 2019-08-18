export interface EpisodeStub {
    characters: string[];
    deaths: string[];
    places: string[];
    title: string;
    season: number;
    episode: number;
    directed_by: string;
}

export type AllEpisodesResponse = EpisodeStub[];
