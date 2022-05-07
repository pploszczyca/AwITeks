import {PlantSummary} from "../../api";
import {SortByTypes} from "./SortByTypes";
import {sortByFavourite, sortByName, sortBySpeciesName} from "./SortFunctions";

export const sortBy = (data: Array<PlantSummary> | undefined, sortByTypes: SortByTypes): Array<PlantSummary> | undefined => {
    if(data !== undefined) {
        const copyData = [...data]
        switch (sortByTypes) {
            case SortByTypes.SORT_BY_NAME:
                return copyData.sort(sortByName);
            case SortByTypes.SORT_BY_SPECIES_NAME:
                return copyData.sort(sortBySpeciesName);
            case SortByTypes.SORT_BY_FAVOURITE:
                return copyData.sort(sortByFavourite)
        }
    }

    return data
}
