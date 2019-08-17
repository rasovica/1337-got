import {Character} from "./character";
import {EpisodeStub} from "../interfaces/allEpisodesResponse";

export class Episode {
    charactersNames: string[] = [];
    characters: Character[] = [];
    name: string;
    season: number;
    nr: number;
    totalNr: number;
    director: string;
    airDate: string;

    constructor(episode: EpisodeStub){
        this.name = episode.name;
        this.season = episode.season;
        this.nr = episode.nr;
        this.director = episode.director;
        this.airDate = episode.airDate;
        this.charactersNames = episode.characters;
        this.totalNr = episode.totalNr;
    }

    public static reduce(episode: EpisodeStub): Episode {
        return new Episode(episode);
    }
}
