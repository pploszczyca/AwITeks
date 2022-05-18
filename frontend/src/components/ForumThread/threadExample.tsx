import {ForumThread, User} from "../../api";

const Users: Array<User> = [
    {
        id: 1,
        username: "JanuszKowalski",
        email: "superjanusz@gmail.com",
        userPlants: [], //not important in this case
        forumPostList: [], //not important in this case
        forumThreadList: [] //not important in this case
    },
    {
        id: 2,
        username: "Janek123",
        email: "jannowak@gmail.com",
        userPlants: [], //not important in this case
        forumPostList: [], //not important in this case
        forumThreadList: [] //not important in this case
    },
    {
        id: 3,
        username: "Tomaszzz",
        email: "tomaszzz@gmail.com",
        userPlants: [], //not important in this case
        forumPostList: [], //not important in this case
        forumThreadList: [] //not important in this case
    },
    {
        id: 4,
        username: "ChuckNorris",
        email: "chucknorris@gmail.com",
        userPlants: [], //not important in this case
        forumPostList: [], //not important in this case
        forumThreadList: [] //not important in this case
    }
]

export const Threads: Array<ForumThread> = [
    {
        id: 1,
        creator: Users[0],
        forumPosts: [
            {
                id: 1,
                content: "Pytanie jak w tytule.",
                author: Users[0],
                date: "2021-10-10"
            },
            {
                id: 2,
                content: "Ja podlewam raz w miesiącu.",
                author: Users[1],
                date: "2021-10-10"
            },
            {
                id: 3,
                content: "A ja podlewam co pół roku. Mój kaktus jest super wytrzymały.",
                author: Users[2],
                date: "2021-10-10"
            },
            {
                id: 4,
                content: "Wow, niesamowite, że twój kaktus wytrzymuje pół roku bez wody. Szalony jakiś.",
                author: Users[1],
                date: "2021-10-10"
            },
            {
                id: 5,
                content: "Dzięki za podpowiedzi, będę podlewał co dwa miesiące.",
                author: Users[0],
                date: "2021-10-10"
            }
        ],
        title: "Jak często podlewać kaktusa?",
        // isFavourite: false,
        // dateCreated: new Date("2019-01-16")
    },
    {
        id: 2,
        creator: Users[2],
        forumPosts: [
            {
                id: 1,
                content: "Kupiłem paprotkę i się zastanawial jakie ma wymagania nasłonecznienia. Pomożecie?",
                author: Users[2],
                date: "2021-10-10"
            },
            {
                id: 2,
                content: "Moja paprotka stoi w oknie, ma tyle słońca ile się tylko da.",
                author: Users[0],
                date: "2021-10-10"
            },
            {
                id: 3,
                content: "A ja trzymam paprotkę w piwnicy, też żyje i ma się dobrze.",
                author: Users[1],
                date: "2021-10-10"
            },
            {
                id: 4,
                content: "Jako ekspert paprotkowy z 10 letnim doświadczeniem radzę ci trzymać paprotkę niedaleko okna ale nie na parapecie.",
                author: Users[3],
                date: "2021-10-10"
            },
            {
                id: 5,
                content: "Dziękuję panie ekspercie, tak zrobię.",
                author: Users[2],
                date: "2021-10-10"
            }
        ],
        title: "Ile słońca potrzebuje paprotka?",
        // isFavourite: false,
        // dateCreated: new Date("2019-01-16")
    }
]

