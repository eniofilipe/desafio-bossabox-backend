import mongoose, { Document, Schema } from "mongoose";

type Tool = Document & {
  title: string;
  link: string;
  description: string;
  idUser: Schema.Types.ObjectId;
  tags: Object;
};

const ToolSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: String,
      required: false,
    },
  ],
});

export default mongoose.model<Tool>("Tool", ToolSchema);
