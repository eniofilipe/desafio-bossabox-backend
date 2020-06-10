import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const mongoConnect = async () => {
  process.env.NODE_ENV !== "test" &&
    (await mongoose.connect(process.env.MONGO_URL || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }));
};

export default mongoConnect;
