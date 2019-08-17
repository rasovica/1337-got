import {Episode} from "./episode";
import {BASE_URL, ENDPOINT_ENUM} from "../constants";
import {AllEpisodesResponse} from "../interfaces/allEpisodesResponse";
import {Characters} from "./characters";

type seasonGroupingType = {
    [season: number]: Episode[];
}

export class Episodes {
    allEpisodes: Episode[] = [];
    groupedBySeason: seasonGroupingType = {};

    public async load(characters: Characters): Promise<void> {
        const data: AllEpisodesResponse = await fetch(BASE_URL + ENDPOINT_ENUM.allEpisodes)
            .then(response => {
                return response.json()
            });

        this.allEpisodes = data.data.map(Episode.reduce).sort((a, b) => a.totalNr - b.totalNr);
        this.allEpisodes.forEach(item => {
            if (!(item.season in this.groupedBySeason)) {
                this.groupedBySeason[item.season] = [];
            }

            item.characters = characters.getCharacters(item.charactersNames);
            this.groupedBySeason[item.season].push(item);
        });
    }
}
