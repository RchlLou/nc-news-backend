# Northcoders News API

Written in JavaScript, this is the backend of a news app that allows users to interact with a series of endpoints, listed below.

In summary, there is a set number of articles that comments can be posted to and articles can be voted on.

> GitHub repo: https://github.com/RchlLou/nc-news-fullstack-project.git
> DEeployed on Heroku: https://nc-news-app-feb2022.herokuapp.com/

PROJECT DEPENDENCIES...

- Developer's versions listed.

> Node js: v17.0.1
> Express: V4.17.2 - Web framework for Node.js, used for the API Server.
> PostgreSQL: V12.9 - Open source, object-relational, database system.
> PG-Format: V1.0.4 - Safely create dynamic SQL queries.
> Node Postgres: V8.7.3 - Collection of Node modules for interfacing with PostgreSQL database.
> Dotenv: V16.0.0 - Loads environment variables from a .env file into process.env.

TESTING - DEVELOPER DEPENDENCIES...

- This code has been tested through intergration testing.
- Tested using the Jest Supertest suite, with Jest-Extended and Jest-sorted installed as extensions.

- Developer's versions listed.

> Jest": V27.5.1.
> Supertest": V6.2.2.
> Jest-extended": V2.0.0.
> Jest-sorted: V1.0.14".

TO USE...

- After cloning from https://github.com/RchlLou/nc-news-fullstack-project, open in code editor.

```
Run 'npm i' to install node packages.
```

- If requiring developer testing dependencies, install
  > npm i jest -D
  > npm i supertest -D
  > npm i jest-extended -D
  > npm i jest-sorted -D

> Testing script - "npm t"

- Create files listed below to create a successful local connection to the two databases:

  > Create file '.env.development', with contents 'PGDATABASE=PGDATABASE=nc_news'.
  > Create file '.env.test', with contents 'PGDATABASE=PGDATABASE=nc_news_test'.

- Create database and seed:
  > Create database - "npm run setup-dbs"
  > To seed database - "npm run seed"

ENDPOINTS...

1.) GET '/api/topics'
Responds with an array of topic objects, each containing the following properties:

> slug
> description

2.) GET '/api/articles'
Articles are sorted by date in descending order.
Responds with an array of article objects, each of with the following properties:

> author
> title
> article_id
> topic
> created_at
> votes
> comment_count

- Endpoint accepts queries (in uppercase or lowercase).
- If either [sort_by, order, topic] or THEIR OPTIONS are entered incorrectly, server returns 200 defaulting to '?sort_by=created_at&order=desc'

> 'sort-by' - ['created_at' (default), 'votes', 'article_id', 'author'].
> 'order' - [ascending OR descending (default)]
> 'topic' - filtering the articles by the topic value specified

3.) GET '/api/articles/:article_id'

- Responds with an ID's article objectcontaining the following properties:

> author
> title
> article_id
> body
> topic
> created_at
> votes
> comment_count

4.) PATCH '/api/articles/:article_id'

- Request body accepts:

> an object - { inc_votes: newVote }
> (newVote indicates the vote number for addition or subtraction.

- Responds with the updated article with the following properties:

> author
> title
> article_id
> body
> topic
> created_at
> votes

5.) GET '/api/users'
Responds with array of objects from all users, each containing the following properties:

> username

6.) GET '/api/articles/:article_id/comments'
Responds as an object with the value of an array of comments for the given article ID. Each comment has the following properties:

> comment_id
> votes
> created_at
> author
> body

7.) POST '/api/articles/:article_id/comments'
Allows user to post a comment on a unique article.

- Request body accepts:

> an object :

{
username: 'username',
body: 'Hello World!'
}

- Responds with Status 201 and sends an object with posted comment.

  8.) DELETE '/api/comments/:comment_id

- Responds with 'Status 204'.
