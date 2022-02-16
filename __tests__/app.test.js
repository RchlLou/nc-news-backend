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
  describe("GET /api/articles", () => {
    test("STATUS 200: Sends back array of article objects in descending date created at order. Each object contains the correct keys", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles).toBeArray();
          expect(articles).toBeSortedBy("created_at", {
            descending: true,
          });
          articles.forEach((article) => {
            expect(article).toContainKeys([
              "article_id",
              "title",
              "author",
              "body",
              "topic",
              "created_at",
              "votes",
            ]);
          });
        });
    });
  });
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
    test("STATUS 400: Bad request - Tests for valid requests but returns no data", () => {
      return request(app)
        .get("/api/articles/NOT-AN-ID")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
    test("STATUS 404: Request not found - Tests ID number generates data", () => {
      return request(app)
        .get("/api/articles/666")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Request not found");
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
    test("STATUS 400: Bad request - Tests for valid requests but return no data, (PSQL error)", () => {
      const articleUpdates = {
        inc_votes: 1,
      };
      return request(app)
        .patch("/api/articles/NOT-AN-ID")
        .send(articleUpdates)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
    test("STATUS 404: Request not found - Tests article ID number generates data", () => {
      const articleUpdates = {
        inc_votes: 1,
      };
      return request(app)
        .patch("/api/articles/666")
        .send(articleUpdates)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Request not found");
        });
    });
    test("STATUS 400: Tests input votes as none numerical interger", () => {
      const articleUpdates = {
        inc_votes: "DROP DATABASE",
      };
      return request(app)
        .patch("/api/articles/1")
        .send(articleUpdates)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
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
