# `react-qa-server`

The `react-qa-server` is the server-side app companion of ```react-qa```. It presents some APIs to perform CRUD operations on the answers of the HeapOverrun web application example.

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
    "date": "2023-02-28",
}
```

### __Get all Answers to a given Question (by Id)__

URL: `/api/questions/<id>/answers`

Method: GET

Description:

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body: An array of objects, each describing an answer.
```
[{
    "id": 1,
    "text": "for of",
    "respondent": "Alice",
    "date": "2023-02-28",
    "score":3,
    "questionId":1
},
...
]
```

### __Add a New Answer__

URL: `/api/answers`

Method: POST

Description: Add a new answer to the list of the answers of a given question.

Request body: An object representing an answer (Content-Type: `application/json`).
```
{
    "text": "for of",
    "respondent": "Alice",
    "score": 3,
    "date": "2023-03-07",
    "questionId": 1
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error, e.g., when trying to insert an already existent answer by the same user). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: An object representing the inserted answer, notably with the newly assigned id by the database (Content-Type: `application/json`).
```
{
    "id": 15,
    "text": "for of",
    "respondent": "Alice",
    "score": 3,
    "date": "2023-03-07",
    "questionId": 1
}
```

