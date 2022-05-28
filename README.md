# AwITeks
## Spis treści
- [AwITeks](#awiteks)
  - [Spis treści](#spis-treści)
  - [Technologie](#technologie)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Porty](#porty)
  - [Branche](#branche)
  - [Uruchomienie projektu](#uruchomienie-projektu)
    - [Uruchomienie backendu](#uruchomienie-backendu)
      - [Uruchomienie za pomocą dockera-compose](#uruchomienie-za-pomocą-dockera-compose)
      - [Uruchomienie za pomocą IntelliJ](#uruchomienie-za-pomocąintellij)
      - [Samodzielne uruchomienie bazy danych](#samodzielne-uruchomienie-bazy-danych)
      - [Zmienne środowiskowe do wysyłania maili](#zmienne-środowiskowe-do-wysyłania-maili)
    - [Testowanie endpointów poza frontem](#testowanie-endpointów-poza-frontem)
    - [Uruchomienie frontendu](#uruchomienie-frontendu)
  - [Dodawanie prefiksu branch'a do commita](#dodawanie-prefiksu-brancha-do-commita)
    - [Uwaga dla osób korzystających z windows](#uwaga-dla-osób-korzystających-z-windows)
  - [Dokumetacja API](#dokumetacja-api)
  - [Statyczna analiza kodu](#statyczna-analiza-kodu)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Definition of done:](#definition-of-done)
  - [Wykres spalania:](#wykres-spalania)
  - [Retro](#retro)
    - [Sprint 1](#sprint-1)
      - [Co wyszło dobrze](#co-wyszło-dobrze)
      - [Co wyszło źle](#co-wyszło-źle)
      - [Wnioski](#wnioski)
    - [Sprint 2](#sprint-2)
      - [Co wyszło dobrze](#co-wyszło-dobrze-1)
      - [Co wyszło źle](#co-wyszło-źle-1)
      - [Wnioski](#wnioski-1)
## Technologie
### Backend
* Java 17
* [Spring Boot 2.6.5](https://spring.io/projects/spring-boot)
* [springdoc-openapi](https://springdoc.org/#Introduction)
* MySQL
  * [MySQL - docker image](https://hub.docker.com/_/mysql)
* [Checkstyle](https://checkstyle.sourceforge.io/)

### Frontend
* [React](https://pl.reactjs.org/)
* [TypeScirpt](https://www.typescriptlang.org/)
* [react-boostrap](https://react-bootstrap.github.io/getting-started/introduction/?fbclid=IwAR0zgAn7NSgpdaE0KbgcgSyj5MgLjVFOn5wWBtL1LAV-eVJLbSN-kXGnUzY)
* [styled-components](https://styled-components.com/)

## Porty
* Backend - 5000 - http://localhost:5000
* Frontend - 3000 - http://localhost:3000
* Baza danych - 3306

## Branche
* development - gałąź na której aktualnie pracujemy
* main - stabilna wersja

---

## Uruchomienie projektu
Należy ściągnąć repozytorium za pomocą jednej z poniższych komend:
```bash
git clone https://github.com/pploszczyca/AwITeks.git
```
lub
```bash
git clone git@github.com:pploszczyca/AwITeks.git
```

---

### Uruchomienie backendu
#### Uruchomienie za pomocą dockera-compose
W folderze `backend` został dodany plik `docker-compose.yml` pozwalający uruchomić backend wraz z lokalną bazą danych. Żeby to zrobić, to po wejściu do wcześniej wspomnianego folderu, wpisujemy następującą komendę w terminalu:
```
$ docker-compose up
```
Jeżeli chcemy wymusić ponowne zbudowanie projektu, wpisujemy:
```
$ docker-compose up --build
```
#### Uruchomienie za pomocą IntelliJ
Należy zaimportować projekt za pomocą IntelIJ-a. W tym celu wykonujemy opcję `Open` i wybieramy folder `backend`. IDE powinno samo zaimportować potrzebne zależności.
W razie problemu należy w settings -> gradle zmienić wersję javy (nie wystarczy zmienić w project structure).

#### Samodzielne uruchomienie bazy danych
Na ten moment zalecane jest uruchomienie bazy MySQL lokalnie na swoim komputerze za pomocą Dockera
```
$ docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest
```

#### Zmienne środowiskowe do wysyłania maili
Aby działało wysyłanie maili z powiadomieniami, trzeba ustawić odpowiednie zmienne środowiskowe.
Trzeba umieścić je w pliku .env w katalogu /backend. Należy ustawić zmienne:
```
NOTIFICATION_EMAIL="jakisEmail@gmail.com"
NOTIFICATION_PASSWD="hasloDoJakiegosMaila"
```
Dla IntelliJ należy takie same zmienne ustawić w konfiguracji uruchamiania.

### Testowanie endpointów poza frontem
- wysyłamy requesta na `/auth/login` z danymi istniejącego użytkownika
- zapisujemy zwrócony `accessToken`
- do kolejnych zapytań dodajemy nagłówek: `Authorization: Bearer <accessToken>`

Przykład:
```
POST /auth/login

curl -X POST -H "Content-Type: application/json" \
-d '{"email": "test@com.pl", "password": "secret-password"}' \
http://localhost:5000/auth/login

Response:
{
    "accessToken": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiaXNzIjoiYXdJVGVrcyIsImV4cCI6MTY1MTg1NTc4NCwiaWF0IjoxNjUxNzY5Mzg0fQ.hsh5rcUjqGma5lN0El8i6Q1oukQQ0eXizL-yYw92Jy6Acy_jvuLE7Xzoq0IsW-aQ",
    "expiresIn": 1651855784
}
```

W kolejnych zapytaniach danego użytkownika wykorzystujemy zwrócony token, przykładowo:

```
GET /plants/summary

curl -H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiaXNzIjoiYXdJVGVrcyIsImV4cCI6MTY1MTg1NTc4NCwiaWF0IjoxNjUxNzY5Mzg0fQ.hsh5rcUjqGma5lN0El8i6Q1oukQQ0eXizL-yYw92Jy6Acy_jvuLE7Xzoq0IsW-aQ" \
http://localhost:5000/plants/summary

```
--- 

### Uruchomienie frontendu
Wchodzimy do folderu `frontend` i instalujemy potrzebne pakiety:
```bash
npm install
```

A następnie uruchamiamy:

```bash
npm start
```
Żeby uruchomić testy należy wpisać:
```
npm test
```

---

## Dodawanie prefiksu branch'a do commita
W folderze `.githooks` znajduje się skrypt, który umożliwia dodanie prefiksu brancha do nazwy commita. Aby go aktywować należy w terminalu wpisać:
```
$ git config --local core.hooksPath .githooks/
```

### Uwaga dla osób korzystających z windows
Możliwe, że trzeba podmienić pierwszą linijkę pliku `prepare-commit-msg` na 
```sh
#!/bin/sh
```
---

## Dokumetacja API
Do projektu backendowego został podpięty [springdoc](https://springdoc.org/#Introduction). Po uruchomieniu backendu dokumentacja znajduje się pod linkiem: http://localhost:5000/swagger-ui/index.html.

## Statyczna analiza kodu
### Backend
Do backendowego projektu został podpięty `Checkstyle`. Konfiguracja znajduje się w [tym pliku](./backend/config/checkstyle/checkstyle.xml). Można doinstalować odpowiednią wtyczkę do IntelIJ [CheckStyle-IDEA](https://plugins.jetbrains.com/plugin/1065-checkstyle-idea) i załadować do niej odpowiedni plik konfiguracyjny.

### Frontend
Na ten moment działa domyślna konfiguracja [ESLint](https://eslint.org/).

## Definition of done:
- Ma działać (kompilować się, nie rzucać błędami i przechodzić testy)
- Spełnia kryteria akceptacyjne
- Przeszło przez Code Review (poprawki zostały zaakceptowane)
- Zostało dołączone do gałęzi develop (merge)

## Wykres spalania:
Zadaniem Scrum Mastera jest, aby wykres był uzupełniany co tydzień według logów z Jiry.<br />
[link](https://docs.google.com/spreadsheets/d/1tHKVENLM-GykhG75kQ3YZRpPJ57ifT13/edit?usp=sharing&ouid=105439589476939159664&rtpof=true&sd=true)

## Retro
### Sprint 1
#### Co wyszło dobrze
* Fajna organizacja na froncie - sensowny layout powstał szybko,
* Pair-programming,
* Wyciąganie wniosków i code review,
* Organizacja pracy na Gicie i Jirze,
* Kontakt pomiędzy frontem i backendem - rozwiązanie nieścisłości,
* Pomoc członków zespołu.

#### Co wyszło źle
* Brak otwartości w zespole - nie umiem/nie zrobię/nie wiem,
* Baza danych powinna była zostać podłączona na początku,
* Nie cały zespół angażował się w projekt,
* Brak dokumentacji tasków skończonych,
* Komunikacja z niektórymi członkami zespołu,
* Brak słowności i terminowości.

#### Wnioski
* Trzeba lepiej zorganizować podział pracy,
* Wyznaczyć terminy na taski,
* Większa otwartość w proszeniu o pomoc.

### Sprint 2
#### Co wyszło dobrze
* Podzielenie się w pary i pair coding,
* Szybkość komunikacji pomiędzy członkami zespołu,
* Jakościowe Code Review,
* Scrum Master robi robotę,
* Frontend mega robota,
* Apka dobrze działa, zarówno na backedzie i froncie,
* Nauka i zastosowanie nowych narzędzi.

#### Co wyszło źle
* Nie utrzymywanie terminów wykonania tasków, złe ustalenia deadlinów,
* Brak zaagażowania pod koniec sprintu.
  
#### Wnioski
* W porównaniu do poprzedniego sprintu:
  * Praca była bardziej zorganizowana,
  * Członkowie zespołu byli bardziej chętni prosić się wzajemnie o pomoc,
* Trzeba popracować nad bardziej realnymi deklaracjami ukończenia zadania w terminie i strarać się ich trzymać.
