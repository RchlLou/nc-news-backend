const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/index");

const app = require("../app");
const request = require("supertest");

require("jest-extended");
require("jest-sorted");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("TOPIC ENDPOINTS", () => {
  describe("GET /api/topics", () => {
    test("STATUS 200: Responds as an object, with the property of an array of the topic objects.  Each object has the the keys of topic and slug", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(Array.isArray(topics)).toBe(true);
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
});
describe("ARTICLE ENDPOINTS", () => {
  // describe("GET /api/articles", () => {
  //   test.only("STATUS 200: Sends back array of article objects in DESCENDING DATE ORDER. Each object contains the correct keys. (Endpoint accept QUERY: sort_by: DATE in ASC/DESC order.  Sort_by DATE in DESC order, is the DEFAULT status)", () => {
  //     return request(app)
  //       .get("/api/articles")
  //       .expect(200)
  //       .then(({ body: { articles } }) => {
  //         expect(articles).toBeArray();
  //         expect(articles).toBeSortedBy("created_at", {
  //           descending: true,
  //         });
  //         articles.forEach((article) => {
  //           expect(article).toContainKeys([
  //             "article_id",
  //             "title",
  //             "author",
  //             "topic",
  //             "created_at",
  //             "votes",
  //           ]);
  //         });
  //       });
  //   });
  //   test("FEATURE REQUEST - ADD COMMENT COUNT: STATUS 200: Returns comment count into return object array", () => {
  //     return request(app)
  //       .get("/api/articles")
  //       .expect(200)
  //       .then(({ body: { articles } }) => {
  //         expect(articles).toBeArray();
  //         articles.forEach((article) => {
  //           expect(article).toContainKeys(["comment_count"]);
  //         });
  //       });
  //   });
  //   test("FEATURE REQUEST: STATUS 200: Accepts 'sort_by' query. Queries - ['created_at', 'VOTES', 'article_id', 'author']", () => {
  //     return request(app)
  //       .get("/api/articles?sort_by=votes")
  //       .expect(200)
  //       .then(({ body: { articles } }) => {
  //         expect(articles).toBeSortedBy("votes", {
  //           descending: true,
  //         });
  //         articles.forEach((article) => {
  //           expect(article).toContainKeys([
  //             "article_id",
  //             "title",
  //             "author",
  //             "topic",
  //             "created_at",
  //             "votes",
  //             "comment_count",
  //           ]);
  //         });
  //       });
  //   });
  //   test("FEATURE REQUEST: STATUS 200: Accepts 'sort_by' query. Queries - Regardless of case ['created_at', 'votes', 'article_id', 'AUTHOR']", () => {
  //     return request(app)
  //       .get("/api/articles?sort_by=AUTHOR")
  //       .expect(200)
  //       .then(({ body: { articles } }) => {
  //         expect(articles).toBeSortedBy("author", {
  //           descending: true,
  //         });
  //         articles.forEach((article) => {
  //           expect(article).toContainKeys([
  //             "article_id",
  //             "title",
  //             "author",
  //             "topic",
  //             "created_at",
  //             "votes",
  //             "comment_count",
  //           ]);
  //         });
  //       });
  //   });
  //   test("FEATURE REQUEST: STATUS 200: Accepts 'order' query. Queries - Ascending or decsending. (Decsending by default)", () => {
  //     return request(app)
  //       .get("/api/articles?sort_by=article_id&order=asc")
  //       .expect(200)
  //       .then(({ body: { articles } }) => {
  //         expect(articles).toBeSortedBy("article_id");
  //         articles.forEach((article) => {
  //           expect(article).toContainKeys([
  //             "article_id",
  //             "title",
  //             "author",
  //             "topic",
  //             "created_at",
  //             "votes",
  //             "comment_count",
  //           ]);
  //         });
  //       });
  //   });
  //   test("FEATURE REQUEST: STATUS 200: Accepts 'topic'. Queries - 'mitch', 'paper' & 'cats'", () => {
  //     return request(app)
  //       .get("/api/articles?topic=mitch")
  //       .expect(200)
  //       .then(({ body: { articles } }) => {
  //         articles.forEach((article) => {
  //           expect(article).toContainKeys([
  //             "article_id",
  //             "title",
  //             "author",
  //             "topic",
  //             "created_at",
  //             "votes",
  //             "comment_count",
  //           ]);
  //           expect(article.topic).toBe("mitch");
  //         });
  //       });
  //   });

  // test.only("FEATURE REQUEST: STATUS 400: Unaccepted 'sort_by' query.", () => {
  //   return request(app)
  //     .get("/api/articles?sort_by=UNACCEPTED-SORT-BY-QUERY")
  //     .expect(200)
  //     .then(({ body: { articles } }) => {
  //       expect(articles).toBeSortedBy("votes", {
  //         descending: true,
  //       });
  //       articles.forEach((article) => {
  //         expect(article).toContainKeys([
  //           "article_id",
  //           "title",
  //           "author",
  //           "topic",
  //           "created_at",
  //           "votes",
  //           "comment_count",
  //         ]);
  //       });
  //     });
  // });
  // });
  describe("GET /api/articles/:article_id", () => {
    test("STATUS 200: Sends back object with correct keys and values. { article_id: { article data } }", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article).toContainEntries([
            ["article_id", 1],
            ["title", "Living in the shadow of a great man"],
            ["author", "butter_bridge"],
            ["body", "I find this existence challenging"],
            ["topic", "mitch"],
            ["created_at", expect.any(String)],
            ["votes", 100],
          ]);
        });
    });
    test("FEATURE REQUEST - ADD COMMENT COUNT: STATUS 200: Returns comment count into object article", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body: { article } }) => {
          expect(article).toContainKeys(["comment_count"]);
        });
    });
    test("STATUS 406: Not Acceptable - Tests for invalid ID requests", () => {
      return request(app)
        .get("/api/articles/NOT-AN-ID")
        .expect(406)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
    test("STATUS 404: Not Found - Tests ID number generates data", () => {
      return request(app)
        .get("/api/articles/666")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("ID cannot be found");
        });
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    test("STATUS 200: TESTS POSITIVE INTERGER VOTES. Sends back the updated article with correct key value pairs", () => {
      const articleUpdates = {
        inc_votes: 1,
      };
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(200)
        .then(({ body: { updatedArticle } }) => {
          expect(updatedArticle).toEqual({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: expect.any(String),
            votes: 101,
          });
        });
    });
    test("STATUS 200: TESTS NEGATIVE INTEGER VOTES. Sends back the updated article with correct key value pairs", () => {
      const articleUpdates = {
        inc_votes: -50,
      };
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(200)
        .then(({ body: { updatedArticle } }) => {
          expect(updatedArticle).toEqual({
            author: "butter_bridge",
            title: "Living in the shadow of a great man",
            article_id: 1,
            body: "I find this existence challenging",
            topic: "mitch",
            created_at: expect.any(String),
            votes: 50,
          });
        });
    });
    test("STATUS 406: Not Acceptable - Tests for invalid ID requests", () => {
      const articleUpdates = {
        inc_votes: 1,
      };
      return request(app)
        .patch("/api/articles/NOT-AN-ID")
        .send(articleUpdates)
        .expect(406)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
    test("STATUS 404: Not Found - Tests ID number generates data", () => {
      const articleUpdates = {
        inc_votes: 1,
      };
      return request(app)
        .patch("/api/articles/666")
        .send(articleUpdates)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("ID cannot be found");
        });
    });
    test("STATUS 400: Bad Request - Tests input votes DOES NOT ACCEPT none interger", () => {
      const articleUpdates = {
        inc_votes: "DROP DATABASE",
      };
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(406)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
  });
});

describe("COMMENTS ENDPOINT", () => {
  describe("GET /api/articles/:article_id/comments", () => {
    test("STAUTS 200: Sends { articleComments: [ {comment_object}, {comment_object} ] }", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body: { articleComments } }) => {
          expect(articleComments).toHaveLength(2);
          articleComments.forEach((comment) => {
            expect(comment).toContainKeys([
              "comment_id",
              "votes",
              "created_at",
              "author",
              "body",
            ]);
          });
        });
    });
    test("STATUS 200: VALID ID but contains no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body: { articleComments } }) => {
          expect(articleComments.msg).toBe("This article has no comments");
        });
    });
    test("STATUS 404: Article ID doesn't exist", () => {
      return request(app)
        .get("/api/articles/666/comments")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("ID cannot be found");
        });
    });
    test("STATUS 406: Not Acceptable - Tests for invalid ID requests", () => {
      return request(app)
        .get("/api/articles/NOT-AN-ID/comments")
        .expect(406)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    test("STATUS 201: Posts a new comment and returns the posted comment", () => {
      const posetedComment = {
        username: "rogersop",
        body: "Hello World!",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(posetedComment)
        .expect(201)
        .then(({ body: { postedComment } }) => {
          expect(postedComment).toEqual({
            comment_id: 19,
            body: "Hello World!",
            article_id: 2,
            author: "rogersop",
            votes: 0,
            created_at: expect.any(String),
          });
        });
    });
    test("STATUS 404: Article ID doesn't exist", () => {
      const posetedComment = {
        username: "rogersop",
        body: "Hello World!",
      };
      return request(app)
        .post("/api/articles/666/comments")
        .send(posetedComment)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Article cannot be found");
        });
    });
    test("STATUS 406: Article ID is NOT VALID", () => {
      const posetedComment = {
        username: "rogersop",
        body: "Hello World!",
      };
      return request(app)
        .post("/api/articles/NOT-AN-ID/comments")
        .send(posetedComment)
        .expect(406)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
    test("STATUS 404: Username is not registered", () => {
      const posetedComment = {
        username: "IS-NOT-A-REGISTERED-USER",
        body: "Hello World!",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(posetedComment)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("IS-NOT-A-REGISTERED-USER is not accepted");
        });
    });
    test("STATUS 400: Username is integer", () => {
      const posetedComment = {
        username: 0,
        body: "Hello World!",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(posetedComment)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("0 is not accepted");
        });
    });
    test("STATUS 416: Username is EMPTY", () => {
      const posetedComment = {
        username: "",
        body: "Hello World",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(posetedComment)
        .expect(416)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Input is undefined");
        });
    });
    test("STATUS 411: Username is NULL", () => {
      const posetedComment = {
        username: null,
        body: "Hello World",
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(posetedComment)
        .expect(411)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Input is required");
        });
    });
    test("STATUS 411: Body is UNDEFINED", () => {
      const posetedComment = {
        username: "rogersop",
        body: null,
      };
      return request(app)
        .post("/api/articles/2/comments")
        .send(posetedComment)
        .expect(411)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Input is required");
        });
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    test("Status 204: Deletes comment of comment_id.  Returns message.", () => {
      const commentId = 1;
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("STATUS 204: Deletes comment of comment_id.  Returns message.", () => {
      const commentId = 1;
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("STATUS 404, comment does not exist", () => {
      return request(app)
        .delete("/api/comments/666")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("ID cannot be found");
        });
    });
    test("STATUS 400, comment ID not accepted", () => {
      return request(app)
        .delete("/api/comments/NOT-AN-ID")
        .expect(406)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
  });
});
describe("USER ENDPOINTS", () => {
  describe("GET /api/users", () => {
    test("STATUS 200:  Returns: { users: [ {username: username}, {username: username}...] }", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toBeArray();
          users.forEach((user) => {
            expect(user).toContainKey("username");
          });
        });
    });
  });
});

describe("GLOBAL ERRORS", () => {
  test("STATUS 404: Tests unrecognised endpoints and responds with appropraite message", () => {
    return request(app)
      .get(`/UNRECOGNISED-PATH`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Endpoint not found");
      });
  });
});
