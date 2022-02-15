const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/index");

const app = require("../app");
const request = require("supertest");
// import * as matchers from "jest-extended";
// expect.extend(matchers);

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("TOPIC ENDPOINTS", () => {
  describe("Responds with an array of all topic objects, each of with keys of 'slug' and `description`", () => {
    test("STATUS 200: responds with an object with the key 'topics' AND value with array of topic objects", () => {
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
  describe("GET /api/articles/:article_id", () => {
    test("Status 200: Sends back object { article_id: { article data } }", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { articleInfo } = body;
          expect(articleInfo).toContainEntries([
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
    test("Status 400: Bad request - Tests for valid requests but return no data", () => {
      return request(app)
        .get("/api/articles/NOT-AN-ID")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Invalid input");
        });
    });
    test("Status 404: Request not found - Tests ID number generates data", () => {
      return request(app)
        .get("/api/articles/666")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Request not found");
        });
    });
  });
});

describe("GLOBAL ERRORS", () => {
  test("STATUS 404: Tests unrecognised endpoints and responds with status 404 - Endpoint not found", () => {
    return request(app)
      .get(`/UNRECOGNISED-PATH`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Endpoint not found");
      });
  });
});
