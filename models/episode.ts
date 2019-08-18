import {Character} from "./character";
import {EpisodeStub} from "../interfaces/allEpisodesResponse";

export class Episode {
    characterNames: string[];
    places: string[];
    title: string;
    season: number;
    episode: number;
    id: string;

    characters: Character[] = [];

    constructor(episode: EpisodeStub){
        this.places = episode.places;
        this.characterNames = episode.characters;
        this.title = episode.title;
        this.season = episode.season;
        this.episode = episode.episode;
        this.id = `S${episode.season}E${episode.episode}`;
    }

    public static reduce(episode: EpisodeStub): Episode {
        return new Episode(episode);
    }
}
