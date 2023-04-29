
Some of the presentation state (showForm, objToEdit) will be implicitly managed by the URLs:
- route `/`  correspond to   showForm = false
  * main visualization, it shows the question and the list of answers
  * navigation to either the `/add` page (via the button at the end) or the `/edit/:id` page (button in the list of answers: each button has the corresponding `:id`)
- route `/add`  correspond to   showForm = true
  * navigation back to the `/` page (either adding or canceling the operation)
  * the new answer is added in the page before leaving the page itself
- route `/edit/:id`  correspond to  showForm = true  with the objToEdit represented by the :id value on the URLs  
    (another option would be to internally pass a state to the new route, without showing anything on the URL)
  * navigation back to the `/` page (either editing or canceling the operation)
  * the answer is modified in the page before leaving the page itself
