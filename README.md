# AwITeks
## Technologie
### Backend
* Java 17
* [Spring Boot 2.6.5](https://spring.io/projects/spring-boot)
* [springdoc-openapi](https://springdoc.org/#Introduction)

### Frontend
* [React](https://pl.reactjs.org/)
* [TypeScirpt](https://www.typescriptlang.org/)
* [react-boostrap](https://react-bootstrap.github.io/getting-started/introduction/?fbclid=IwAR0zgAn7NSgpdaE0KbgcgSyj5MgLjVFOn5wWBtL1LAV-eVJLbSN-kXGnUzY)
* [styled-components](https://styled-components.com/)

## Porty
* Backend - 5000 - http://localhost:5000
* Frontend - 3000 - http://localhost:3000

## Branche
* development - gałąź na której aktualnie pracujemy
* main - stabilna wersja

## Uruchomienie projektu
Należy ściągnąć repozytorium za pomocą jednej z poniższych komend:
```bash
git clone https://github.com/pploszczyca/AwITeks.git
```
lub
```bash
git clone git@github.com:pploszczyca/AwITeks.git
```

### Uruchomienie backendu
Należy zaimportować projekt za pomocą IntelIJ-a. W tym celu wykonujemy opcję `Open` i wybieramy folder `backend`. IDE powinno samo zaimportować potrzebne zależności.
W razie problemu należy w settings -> gradle zmienić wersję javy (nie wystarczy zmienić w project structure).
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

## Dokumetacja API
Do projektu backendowego został podpięty [springdoc](https://springdoc.org/#Introduction). Po uruchomieniu backendu dokumentacja znajduje się pod linkiem: http://localhost:5000/swagger-ui/index.html.

## Definition of done:
- Ma działać (kompilować się, nie rzucać błędami)
- Spełnia kryteria akceptacyjne
- Przeszło przez Code Review (poprawki zostały zaakceptowane)
- Zostało dołączone do gałęzi develop (merge)
