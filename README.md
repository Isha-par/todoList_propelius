## Installation

1. Clone the project repository. and Install all the dependencies using "npm i".
2. Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
3. run the project using "npm run start"

## To access the postman collection: 
https://api.postman.com/collections/13107988-093d2efe-e347-473b-b235-0652ac1f9673?access_key=PMAT-01JFVTFENSJVG12JBBHPRJCJXY

## Routes:

For Authentication

- POST /auth/register: To register a new user
- POST /auth/login: To login a user

For Todo Lists

- GET /todo/: get all the todo (task)
- POST /todo/: create a new todo.
- Patch /todo/:todoId: To update the todo.
- Delete /todo/deleteId: Delete the todo
- GET /todo/:id: To get the todo by Id.
-PATCH /todo/status/todoId: For toggling the status either completed or pending.

