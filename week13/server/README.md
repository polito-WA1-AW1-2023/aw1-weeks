# `react-qa-server`

The `react-qa-server` is the server-side app companion of ```react-qa```. It presents some APIs to perform CRUD operations on the answers of the HeapOverrun web application example.

The database has some users:
* username: enrico@test.com, password: "pwd"
* username:  luigi@test.com, password: "pwd"
* username:  alice@test.com, password: "pwd"
* username:  harry@test.com, password: "pwd"
* username:  carol@test.com, password: "pwd"

#

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List Questions__

URL: `/api/questions`

Method: GET

Description: Get all the questions.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing a question.
```
[{
    "id": 1,
    "text": "Best way of enumerating an array in JS?",
    "author": "Enrico",
    "authorId": 1,
    "date": "2023-02-28",
},
...
]
```

### __Get a Question (by Id)__

URL: `/api/questions/<id>`

Method: GET

Description: Get the question identified by the id `<id>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: An object, describing a single question.
```
{
    "id": 1,
    "text": "Best way of enumerating an array in JS?",
    "author": "Enrico",
    "authorId": 1,
    "date": "2023-02-28",
}
```



### __Get all Answers to a given Question (By Id)__

URL: `/api/questions/<id>/answers`

Method: GET

Description: Get all the answers associated to a given question identified by the id `<id>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing an answer.
```
[{
    "id": 1,
    "text": "for of",
    "respondent": "Alice",
    "respondentId": 3,
    "score": 3,
    "date": "2023-03-07",
    "questionId": 1
},
{
    "id": 5,
    "text": "for i=0,i<N,i++",
    "respondent": "Harry",
    "respondentId": 4,
    "score": 1,
    "date": "2023-03-04",
    "questionId": 1
},
...
]
```


### __Get an Answer (By Id)__

URL: `/api/answers/<id>`

Method: GET

Description: Get the answer identified by the id `<id>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: An object, describing a single answer.
```
{
    "id": 1,
    "text": "for of",
    "respondent": "Alice",
    "respondentId": 3,
    "score": 3,
    "date": "2023-03-07",
    "questionId": 1
}
```

### __Add a New Answer__

URL: `/api/answers`

Method: POST

Description: Add a new answer to the list of the answers of a given question. A cookie with a VALID SESSION ID must be provided. The user adding the answer is taken from the session.

Request body: An object representing an answer (Content-Type: `application/json`).
```
{
    "text": "for of",
    "score": 3,
    "date": "2023-03-07",
    "questionId": 1
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error, e.g., when trying to insert an already existent answer by the same user). If the request body is not valid, `422 Unprocessable Entity` (validation error). If the questionId does not exist, `404 Not Found`. If the request does not come on an authenticated session, `401 Unauthorized`.

Response body: The id of the newly created answer, as a JSON value (Content-Type: `application/json`).
```
15
```


### __Update an Answer__

URL: `/api/answers/<id>`

Method: PUT

Description: Update entirely an existing answer, identified by its id. A cookie with a VALID SESSION ID must be provided. The user requesting the update the answer must be the same that owns the answer.

Request body: An object representing the entire answer (Content-Type: `application/json`).
```
{
    "id": 1,
    "text": "for of",
    "respondent": "Alice",
    "score": 3,
    "date": "2023-03-07",
    "questionId": 1
}
```

Response: `200 OK` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error). If the request does not come on an authenticated session, `401 Unauthorized`.

Response body: _None_


### __Vote an Answer__

URL: `/api/answers/<id>/vote`

Method: POST

Description: Upvote or downvote an existing answer (i.e., increase or reduce its score by 1), the answer is identified by its id.

Request body: An object representing the action, either upvote or downvote (Content-Type: `application/json`).  
```
{
    "vote": "upvote"
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_



### __Delete an Answer__

URL: `/api/answers/<id>`

Method: DELETE

Description: Delete an existing answer, identified by its id. A cookie with a VALID SESSION ID must be provided. The user requesting the deletion the answer must be the same that owns the answer.

Request body: _None_

Response: `204 No Content` (success) or `503 Service Unavailable` (generic error). If the request does not come on an authenticated session, `401 Unauthorized`.

Response body: _None_




### __Create a new session (login)__

URL: `/api/sessions`

HTTP Method: POST

Description: Create a new session starting from given credentials.

Request body:
```
{
  "username": "harry@test.com",
  "password": "pwd"
}
```

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: _None_


### __Get the current session if existing__

URL: `/api/sessions/current`

HTTP Method: GET

Description: Verify if the given session is still valid and return the info about the logged-in user. A cookie with a VALID SESSION ID must be provided to get the info of the user authenticated in the current session.

Request body: _None_ 

Response: `201 Created` (success) or `401 Unauthorized` (error).

Response body:
```
{
  "username": "harry@test.com",
  "id": 4,
  "name": "Harry"
}
```

### __Destroy the current session (logout)__

URL: `/api/sessions/current`

HTTP Method: DELETE

Description: Delete the current session. A cookie with a VALID SESSION ID must be provided.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body: _None_