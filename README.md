# Northcoders News API

- To successfully connect to the two databases locally, create file '.env.development' with contents 'PGDATABASE=PGDATABASE=nc_news' and '.env.test' file, with contents of 'PGDATABASE=PGDATABASE=nc_news_test'.

- ENDPOINTS

  1.) '/api/topics'
  Responds with an array of topic objects, each containing the following properties:
  -> slug
  -> description
