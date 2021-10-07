import moment from "moment-timezone";
import { Process } from "./process.interface";
import mongoose, { Schema } from "mongoose";

type processSlugs =
  | "normalizeVolume"
  | "pad"
  | "xdcamHD"
  | "h264"
  | "dvcpro"
  | "dnxhd"
  | "pad"
  | "ftp"
  | "file"
  | "copy";

type ProcessType = "input" | "output" | "decoder" | "encoder" | "filter";

type Programs = "ffmbc" | "ffmpeg" | "shell" | "bash";

type Tags = "filter" | "encoder" | "decoder" | "output" | "input";

const ProcessSchema: Schema = new Schema<Process>({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  hash: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    require: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId },
  updatedBy: { type: mongoose.Schema.Types.ObjectId },
  lastActivity: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProcessSchema.set("toJSON", {
  virtuals: true,
  transform: (
    doc = {},
    ret: {
      id: any;
      _id?: { toString: () => any };
      createdAt: any;
      updatedAt: any;
    },
    options = {}
  ) => {
    ret.id = ret._id ? ret._id.toString() : "";
    ret.createdAt = moment(ret.createdAt ? ret.createdAt : ret.updatedAt)
      .tz(process.env.TIMEZONE_SERVER || "")
      .format(process.env.FORMAT_DATES);
    ret.updatedAt = moment(ret.updatedAt)
      .tz(process.env.TIMEZONE_SERVER || "")
      .format(process.env.FORMAT_DATES);
    delete ret._id;
  },
});

const ProfileModel = mongoose.model<Process>("process", ProcessSchema);
new ProfileModel({});
export default {
  ProcessSchema: ProcessSchema,
  ProfileModel,
};

/* const ProcessSchema: Schema = new Schema<Process>({
    title: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    metadata: {
      type: String,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: false,
    },
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: Boolean,
      required: false,
      default: true,
    },
    slug: {
      type: String,
      required: true,
    },
    workflowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workflow",
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
      required: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
    //   ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  })
}
 */
