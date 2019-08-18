import {Episode} from "./episode";
import {BASE_URL, ENDPOINTS} from "../constants";
import {AllEpisodesResponse} from "../interfaces/allEpisodesResponse";
import {Characters} from "./characters";

type seasonGroupingType = Record<number, Episode[]>;

export class Episodes {
    allEpisodes: Episode[] = [];
    groupedBySeason: seasonGroupingType = {};

    public async load(characters: Characters): Promise<void> {
        const data: AllEpisodesResponse = await fetch(BASE_URL + ENDPOINTS.allEpisodes)
            .then(response => {
                return response.json()
            });

        this.allEpisodes = data.map(Episode.reduce).sort((a, b) => {
            return a.season * 100 + a.episode -  b.season * 100 + b.episode;
        });
        this.allEpisodes.forEach(item => {
            if (!(item.season in this.groupedBySeason)) {
                this.groupedBySeason[item.season] = [];
            }

            item.characters = characters.getCharacters(item.characterNames);
            this.groupedBySeason[item.season].unshift(item);
        });
    }

    public getEpisode = (title: string): Episode | undefined => {
        return this.allEpisodes.find(item => item.title === title);
    };
}
