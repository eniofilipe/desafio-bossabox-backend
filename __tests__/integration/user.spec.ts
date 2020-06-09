import mongoose, { mongo } from "mongoose";
import User from "../../src/schemas/User";
import request from "supertest";
import app from "../../src/app";

import bcrypt from "bcryptjs";

describe("User", () => {
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

  it("shold be able to register", async () => {
    const test = {
      name: "Ênio",
      email: "email@email.com",
      password: "123456",
    };

    const response = await request(app).post("/user").send(test);

    expect(response.body).toHaveProperty("_id");
  });

  it("should encrypt user password when new user created", async () => {
    const test = {
      name: "Ênio",
      email: "email@email.com",
      password: "123456",
    };

    const response = await request(app).post("/user").send(test);

    const compareHash = bcrypt.compareSync(
      test.password,
      response.body.password
    );

    expect(compareHash).toBe(true);
  });

  it("not duplicated email", async () => {
    const test = {
      name: "Ênio",
      email: "email@email.com",
      password: "123456",
    };

    await request(app).post("/user").send(test);
    const response = await request(app).post("/user").send(test);
    expect(response.status).toBe(400);
  });
});
