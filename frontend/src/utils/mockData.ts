import { CalendarNotification, NotificationSeverity } from "./CalendarNotification";
import { PlantSummary } from "./Plant";

export const mockPlantSummaries: PlantSummary[] = [
    {
        id: 1,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 2,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 3,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 4,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 5,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: true,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 6,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 7,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 8,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    },
    {
        id: 9,
        imgUrl: "https://sklep.zielonymdogory.net.pl/userdata/public/gfx/9d1e241dfecee8f3141c7453a1eadb99.jpg",
        isFavourite: false,
        name: "Kaktus Janusz",
        scientificName: "kaktus pospolity"
    }
]


export const mockPlantTypes: string[] = ["kaktus", "paprotka", "dynia", "ziemniak", "kaktus2", "ziemniak2", "kaktus", "paprotka", "dynia", "ziemniak", "kaktus2", "ziemniak2", "kaktus", "paprotka", "dynia", "ziemniak", "kaktus2", "ziemniak2"];


export const calendarNotifications: CalendarNotification[] = [
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