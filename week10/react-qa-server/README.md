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


....
