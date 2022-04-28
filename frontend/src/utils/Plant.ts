
export enum Insolation {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
};


export enum Fertilization {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
};


export interface Species {
    id: number;
    name: string;
    maxAge: number;
    neededInsolation: Insolation;
    waterDose: number;
    waterRoutine: number;
    fertilizationRoutine: number;
    fertilizationDose: Fertilization;
};


export interface Plant {
    id: number;
    name: string;
    species: Species;
    note: string;
    actualInsolation: Insolation;
    isFavourite: boolean;
    imgUrl: string;
    lastWatering: Date;
    lastFertilization: Date;
}


export interface PlantSummary {
    id: number;
    name: string;
    speciesName: string; // not sure how this should be called
    isFavourite: boolean;
    imgUrl: string;
};



