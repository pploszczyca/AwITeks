# Mapowanie typów i endpointów
 
1. Odpalamy serwer
2. Wchodzimy w przeglądarce na `<url-serwera>/v3/api-docs/`
3. Zapisujemy json widoczny na stronie
4. Wchodzimy do katalogu `frontend`
5. Uruchamiamy skrypt (działa na unix'owych, jak ktoś ma windowsa to sugeruje dodanie analogicznego pliku .bat)
```
    ./src/api/generate-api-client.sh <sciezka pliku z kroku 3>
```
6. Aktualne mapowani typów zapisały się w `api/models`, aktualne funkcje do wysyłania zapytań na endpointy zapisały się w `api/apis`, jeśli został dodany nowy kontroler uzupełnij ręcznie plik `api/initializeApi.ts`. Interesujące nas funkcje dostępne są z poziomu klasy `<nazwa kontrolera>ControllerApi` (na samym dole wygenerowanego pliku)