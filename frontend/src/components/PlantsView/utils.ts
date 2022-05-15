import {PlantSummary} from "../../api";

export enum SortByTypes {
    NO_SORT = 0,
    SORT_BY_NAME = 1,
    SORT_BY_SPECIES_NAME = 2,
    SORT_BY_FAVOURITE = 3
}

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

export function sortByName(firstPlant: PlantSummary, secondPlant: PlantSummary){
    const firstLowerName = firstPlant.name.toLowerCase()
    const secondLowerName = secondPlant.name.toLowerCase()

    if(firstLowerName > secondLowerName){
        return 1;
    } else if (firstLowerName < secondLowerName) {
        return -1;
    }
    return 0;
}

export function sortBySpeciesName(firstPlant: PlantSummary, secondPlant: PlantSummary){
    const firstLowerName = firstPlant.speciesName.toLowerCase()
    const secondLowerName = secondPlant.speciesName.toLowerCase()
    if(firstLowerName > secondLowerName){
        return 1;
    } else if (firstLowerName < secondLowerName) {
        return -1;
    }
    return 0;
}

export function sortByFavourite(firstPlant: PlantSummary, secondPlant: PlantSummary){
    if(firstPlant.isFavourite && !secondPlant.isFavourite){
        return -1;
    }else if(!firstPlant.isFavourite && secondPlant.isFavourite){
        return 1;
    }
    return 0;
}