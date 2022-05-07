# AwITeks
## Technologie
### Backend
* Java 17
* [Spring Boot 2.6.5](https://spring.io/projects/spring-boot)
* [springdoc-openapi](https://springdoc.org/#Introduction)
* MySQL
  * [MySQL - docker image](https://hub.docker.com/_/mysql)

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

## Definition of done:
- Ma działać (kompilować się, nie rzucać błędami)
- Spełnia kryteria akceptacyjne
- Przeszło przez Code Review (poprawki zostały zaakceptowane)
- Zostało dołączone do gałęzi develop (merge)

## Wykres spalania:
Zadaniem Scrum Mastera jest, aby wykres był uzupełniany co tydzień według logów z Jiry.<br />
[link](https://docs.google.com/spreadsheets/d/1tHKVENLM-GykhG75kQ3YZRpPJ57ifT13/edit?usp=sharing&ouid=105439589476939159664&rtpof=true&sd=true)
