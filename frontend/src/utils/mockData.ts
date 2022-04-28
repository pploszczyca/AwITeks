import { CalendarNotification, NotificationSeverity } from "./CalendarNotification";
import { Fertilization, Insolation, Plant, PlantSummary } from "./Plant";
import {Plant as BackPlant} from "../api"

export const mockPlantSummaries: PlantSummary[] = [
    {
        id: 1,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 2,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 3,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 4,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 5,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 6,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 7,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 8,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    },
    {
        id: 9,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        speciesName: "kaktus pospolity"
    }
]


export const mockPlantTypes: string[] = ["kaktus", "paprotka", "dynia", "ziemniak", "kaktus2", "ziemniak2", "kaktus", "paprotka", "dynia", "ziemniak", "kaktus2", "ziemniak2", "kaktus", "paprotka", "dynia", "ziemniak", "kaktus2", "ziemniak2"];


export const mockCalendarNotifications: CalendarNotification[] = [
    {
        day: 6,
        month: 3,
        year: 2022,
        items: [
            {
                notificationId: 1,
                plantId: 3,
                severity: NotificationSeverity.LOW
            }
        ]
    },
    {
        day: 8,
        month: 3,
        year: 2022,
        items: [
            {
                notificationId: 2,
                plantId: 5,
                severity: NotificationSeverity.MEDIUM
            }
        ]
    },
    {
        day: 13,
        month: 3,
        year: 2022,
        items: [
            {
                notificationId: 3,
                plantId: 1,
                severity: NotificationSeverity.HIGH
            }
        ]
    },
    {
        day: 25,
        month: 3,
        year: 2022,
        items: [
            {
                notificationId: 4,
                plantId: 1,
                severity: NotificationSeverity.MEDIUM
            }
        ]
    },
    {
        day: 13,
        month: 2,
        year: 2022,
        items: [
            {
                notificationId: 5,
                plantId: 1,
                severity: NotificationSeverity.MEDIUM
            }
        ]
    },
    {
        day: 5,
        month: 4,
        year: 2022,
        items: [
            {
                notificationId: 6,
                plantId: 1,
                severity: NotificationSeverity.MEDIUM
            }
        ]
    }
]

export const mockPlants: Plant[] = [
    {
        actualInsolation: Insolation.HIGH,
        id: 1,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        species: {
            id: 1,
            name: "kaktus pospolity",
            fertilizationDose: Fertilization.MEDIUM,
            fertilizationRoutine: 1,
            maxAge: 10,
            neededInsolation: Insolation.MEDIUM,
            waterDose: 1,
            waterRoutine: 1
        },
        lastWatering: new Date(),
        lastFertilization: new Date(),
        note: "Cactus Jack Records is a record label founded by American rapper and singer Travis Scott. The label's current acts include Scott, Sheck Wes, Don Toliver, Luxury Tax, SoFaygo, Chase B, and WondaGurl. The label also has their own publishing division, Cactus Jack Publishing. "
    },

    /*
    do not remove
     */
    {
        actualInsolation: Insolation.HIGH,
        id: 0,
        imgUrl: "",
        isFavourite: false,
        name: "",
        species: {
            id: 0,
            name: "",
            fertilizationDose: Fertilization.MEDIUM,
            fertilizationRoutine: 0,
            maxAge: 0,
            neededInsolation: Insolation.MEDIUM,
            waterDose: 0,
            waterRoutine: 0
        },
        lastWatering: new Date(),
        lastFertilization: new Date(),
        note: ""
    }
];

export const emptyPlant: BackPlant = {
    id: -1,
    name: "",
    spiece: {
        id: 1,
        name: "",
        maxAge: 20,
        neededInsolation: "HIGH",
        waterDose: 1,
        waterRoutine: 1,
        fertilizationRoutine: 7,
        fertilizationDose: "LOW",
        creatorId: -1
    },
    note: "",
    actualInsolation: "HIGH",
    plantActivities: [
        {
            id: 0,
            activityType: "FERTILISATION",
            date: "2022-06-22T22:00:00.000+00:00"
        },
        {
            id: 1,
            activityType: "WATERING",
            date: "2022-06-22T22:00:00.000+00:00"
        }
    ],
    // url: "https://netscroll.pl/wp-content/uploads/2021/10/CactusToy1.jpg",
    // favourite: false
}
