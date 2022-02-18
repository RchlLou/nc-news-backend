// const db = require("../db/connection");
// const seed = require("../db/seeds/seed");
// const data = require("../db/data/index");

// const app = require("../app");
// const request = require("supertest");

// const { testForValidId } = require("../models/utils-model");

// require("jest-extended");
// require("jest-sorted");

// beforeEach(() => seed(data));
// afterAll(() => db.end());

// describe("testForValidID", () => {
//   test("if article is NOT a number, returns status and message", () => {
//     expect.assertions(1);
//     return expect(testForValidId("NOT-A-NUMBER")).rejects.toEqual({
//       status: 400,
//       msg: "Invalid ID",
//     });
//   });
//   test("if article is a number it returns the number", () => {
//     expect.assertions(1);
//     const input = 666;
//     return expect(typeof testForValidId(input)).toBe("number");
//   });
// });

// // test('STATUS 404', () => {
// //     return
// //   })

// // run test 404 error -> pass it empty array and expect to come back
