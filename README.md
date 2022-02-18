# Northcoders News API

- To successfully connect to the two databases locally, create file '.env.development' with contents 'PGDATABASE=PGDATABASE=nc_news' and '.env.test' file, with contents of 'PGDATABASE=PGDATABASE=nc_news_test'.

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

3.) GET '/api/articles/:article_id'
Responds with an ID's article objectcontaining the following properties:

> author
> title
> article_id
> body
> topic
> created_at
> votes

4.) PATCH '/api/articles/:article_id'
Request body accepts:

> an object - { inc_votes: newVote }
> (newVote indicates the vote number for addition or subtraction.

Responds with the updated article with the following properties:

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

ERRORS

> > 400 - BAD REQUEST - '${input} is not accepted'
> > 404 - NOT FOUND - 'Article cannot be found'
> > 406 - NOT ACCEPTABLE - 'Invalid ID' (Thrown by a PSQL error)
