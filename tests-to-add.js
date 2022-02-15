describe("PATCH /api/articles/:article_id", () => {
  it("Status 200: Sends back object { article_id: { article data } }", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article_id } = body;
        expect(article_id).toContainEntries([
          ["article_id", 1],
          ["title", "Running a Node App"],
          ["author", "jessyjelly"],
          ["body", typeof String],
          ["topic", "coding"],
          ["created_at", 1589418120000],
          ["votes", 0],
        ]);
      });
  });
  it("", () => {});
});
