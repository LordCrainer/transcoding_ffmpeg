const mongoose = require("mongoose");
const moment = require("moment-timezone");

const ProfileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    quality: {
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
      ref: "users",
      required: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ProfileSchema.set("toJSON", {
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
      .tz(process.env.TIMEZONE_SERVER)
      .format(process.env.FORMAT_DATES);
    ret.updatedAt = moment(ret.updatedAt)
      .tz(process.env.TIMEZONE_SERVER)
      .format(process.env.FORMAT_DATES);
    delete ret._id;
  },
});

export default {
  ProfileSchema: ProfileSchema,
  ProfileModel: mongoose.model("dashboards", ProfileSchema),
};
