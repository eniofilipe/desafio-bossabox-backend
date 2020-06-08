import mongoose, { mongo } from "mongoose";
import User from "../../src/schemas/User";
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
    await User.deleteMany({});
  });

  it("shold be return token", async () => {
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

    const response = await request(app).post("/session").send(newSession);

    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });
});
