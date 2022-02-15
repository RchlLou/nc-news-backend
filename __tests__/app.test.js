const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/index");

const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("TOPIC ENDPOINTS", () => {
  describe("Responds with an array of all topic objects, each of with keys of 'slug' and `description`", () => {
    it("STATUS 200: responds with an object with the key 'topics' AND value with array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(body).toHaveProperty("topics");
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

describe("ERRORS", () => {
  it("STATUS 404: Tests unrecognised endpoints and responds with status 404 - Endpoint not found", () => {
    return request(app)
      .get(`/UNRECOGNISED-PATH`)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Endpoint not found");
      });
  });
});
