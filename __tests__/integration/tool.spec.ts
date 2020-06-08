import mongoose, { mongo } from "mongoose";
import User from "../../src/schemas/User";
import Tool from "../../src/schemas/Tool";
import request from "supertest";
import app from "../../src/app";

describe("Session", () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error("MongoDB server not initialized");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Tool.deleteMany({});
    await User.deleteMany({});
  });

  it("Register tool", async () => {
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

    const login = await request(app).post("/session").send(newSession);

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
});
