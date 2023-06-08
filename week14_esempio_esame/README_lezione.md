# Exam #1: "CMSmall"
## Student: s111111 MASALA ENRICO

## React Client Application Routes

- Route `/`: pagina principale, mostra la lista completa dei corsi quando si arriva sul sito
- Route `/login`: pagina per fare il login
- Route `*`: per le pagine che non esistono

## API Server

### Autenticazione

- POST `/api/session`
  - request parameters and request body content
  - response body content
- DELETE
- GET `/api/session/current`  ... decidere qui quali informazioni ritornare EVENTUALMENTE oltre alle info dell'utente

### Altre

- GET `/api/courses` : Non autenticata, riorna la lista dei corsi e relativi vincoli
   (devo stabilire un formato JSON appropriato) - anche il n. di iscritti

- GET `/api/study-plan` : Autenticata, ritorna la lista dei corsi nel piano di studi dell'utente autenticato.    Parametri: NESSUNO

- POST `/api/study-plan` : Autenticata, salva il piano di studi corrente (rimpiazza l'eventuale esistente)

- DELETE `/api/study-plan` : Autenticata, cancella il piano di studenti

- GET `/api/courses/num-enrolled` : Non autenticata, ritorna solo il n. di studenti iscritti ai corsi con un max.


## Database Tables

- Table `users` : (id, nome, email, salt, hash, full_time)
- Table `corsi` : (codice, nome, cfu, max_studenti, studenti_iscritti, propedeutico)
- Table `pianostudi` : (id_user, codice_corso)
- Table `incompatibilita` : (codice_corso, codice_incompatibile)

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.png)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

