# Exercise: Add authentication

_Goal: Add authentication to the "HeapOverrun" React Client._

Starting from the React application and the API Server in Express developed in the previous week, add an authentication layer in the server and apply the needed changes in the React application. Only the _login_ mechanism is required. We will **not** cover the registration phase (i.e., signup).
It is required that only logged-in user can add new answers (they will be the authors). Only the owner of the answer can update and delete its answer. Anybody (logged-in or not) can upvote.

In particular, the server now includes:
- `passport`.
- Configured to use sessions and the username/password strategy for login.
- For hashing the password (to store it in the database), `scrypt` is used as shown during the lecture.
- A login and a logout route (e.g., `POST /api/sessions` for login) have been created.
- Routes have been protected, so that only logged-in and authorized users can call some of the APIs. In particular, only logged-in user can add. Only the owner of the answer can update and delete its answer.

Instead, on the React client:
- Prepare a login form using controlled input components.
- Handle the login form submission to call the login API on the server.
- Welcome the newly logged-in user on the application's homepage (e.g., with an alert saying "Welcome, <name>!")
- Update the other API calls for passing the session cookie via CORS.
- Verify that the entire application is still working as expected.

An updated SQLite database, with a new `users` table, is available on the GitHub repository. The README file in the server folder contains user login info.
