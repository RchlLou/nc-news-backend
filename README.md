# Northcoders News API

- To successfully connect to the two databases locally, create file '.env.development' with contents 'PGDATABASE=PGDATABASE=nc_news' and '.env.test' file, with contents of 'PGDATABASE=PGDATABASE=nc_news_test'.

ENDPOINTS...

1.) GET '/api/topics'
Responds with an array of topic objects, each containing the following properties:
-> slug
-> description

2.) GET '/api/articles/:article_id'
Responds with an ID's article objectcontaining the following properties:
-> author
-> title
-> article_id
-> body
-> topic
-> created_at
-> votes

#.) GET '/api/articles/:article_id/comments'
Responds as an object the value of an array of comments for the given article ID. Each comment has the following properties:

- comment_id
- votes
- created_at
- author
- body
