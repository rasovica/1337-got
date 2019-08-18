import {Character} from "./character";
import {EpisodeStub} from "../interfaces/allEpisodesResponse";

export class Episode {
    characterNames: string[];
    deathNames: string[];
    places: string[];
    title: string;
    season: number;
    episode: number;
    directedBy: string;
    id: string;

    characters: Character[] = [];
    deaths: Character[] = [];

    constructor(episode: EpisodeStub){
        this.places = episode.places;
        this.characterNames = episode.characters;
        this.deathNames = episode.deaths;
        this.title = episode.title;
        this.season = episode.season;
        this.episode = episode.episode;
        this.id = `S${episode.season}E${episode.episode}`;
        this.directedBy = episode.directed_by;
    }

    public static reduce(episode: EpisodeStub): Episode {
        return new Episode(episode);
    }
}
