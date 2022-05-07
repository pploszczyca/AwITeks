import {PlantSummary} from "../../api";

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