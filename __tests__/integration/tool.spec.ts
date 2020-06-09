import mongoose, { mongo } from "mongoose";
import User from "../../src/schemas/User";
import Tool from "../../src/schemas/Tool";
import request from "supertest";
import app from "../../src/app";

describe("Tools", () => {
  let login: request.Response;

  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const test = {
      name: "Ênio",
      email: "email@email.com",
      password: "123456",
    };

    await request(app).post("/user").send(test);

    const newSession = {
      email: "email@email.com",
      password: "123456",
    };

    login = await request(app).post("/session").send(newSession);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Tool.deleteMany({});
  });

  it("Register tool", async () => {
    const newTool = {
      title: "notion",
      link: "notion.so",
      description: "very good tool",
      tags: ["notion", "web", "to-do"],
    };

    const response = await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(newTool);

    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("title", "notion");
  });

  it("List tools", async () => {
    const newTool = {
      title: "notion",
      link: "notion.so",
      description: "very good tool",
      tags: ["notion", "web", "to-do"],
    };

    await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(newTool);

    await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(newTool);

    await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(newTool);

    const response = await request(app)
      .get("/tool")
      .set({ authorization: "Bearer " + login.body.token });

    expect(response.body).toEqual([
      expect.objectContaining({
        title: "notion",
        link: "notion.so",
        description: "very good tool",
        tags: ["notion", "web", "to-do"],
      }),
      expect.objectContaining({
        title: "notion",
        link: "notion.so",
        description: "very good tool",
        tags: ["notion", "web", "to-do"],
      }),
      expect.objectContaining({
        title: "notion",
        link: "notion.so",
        description: "very good tool",
        tags: ["notion", "web", "to-do"],
      }),
    ]);
  });

  it("List tools by tag", async () => {
    const toolTestOne = {
      title: "notion one",
      link: "notion.so",
      description: "very good tool",
      tags: ["web", "to-do"],
    };

    const toolTestTwo = {
      title: "notion two",
      link: "notion.so",
      description: "very good tool",
      tags: ["notion", "web"],
    };

    const toolTestThree = {
      title: "notion",
      link: "notion.so",
      description: "very good tool",
      tags: ["notion", "to-do"],
    };

    await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(toolTestOne);

    await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(toolTestTwo);

    await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(toolTestThree);

    const response = await request(app)
      .get("/tool?tag=web")
      .set({ authorization: "Bearer " + login.body.token });

    expect(response.body).toEqual([
      expect.objectContaining({
        title: "notion one",
        link: "notion.so",
        description: "very good tool",
        tags: ["web", "to-do"],
      }),
      expect.objectContaining({
        title: "notion two",
        link: "notion.so",
        description: "very good tool",
        tags: ["notion", "web"],
      }),
    ]);
  });

  it("Delete tool by id", async () => {
    const newTool = {
      title: "notion",
      link: "notion.so",
      description: "very good tool",
      tags: ["notion", "web", "to-do"],
    };

    const responseTool = await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(newTool);

    const response = await request(app)
      .delete(`/tool/${responseTool.body._id}`)
      .set({ authorization: "Bearer " + login.body.token });

    expect(response.status).toBe(204);
  });

  it("Delete tool by id", async () => {
    const newTool = {
      title: "notion",
      link: "notion.so",
      description: "very good tool",
      tags: ["notion", "web", "to-do"],
    };

    await request(app)
      .post("/tool")
      .set({ authorization: "Bearer " + login.body.token })
      .send(newTool);

    const response = await request(app)
      .delete(`/tool/5edfbcc7318e977072ab8e95`)
      .set({ authorization: "Bearer " + login.body.token });

    expect(response.status).toBe(400);
  });
});
