import mongoose from "mongoose";

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: True }, // name of the club
    description: { type: String }, // club description
  },
  {
    timestamps: true,
  }
);

const Club = new mongoose.Schema("Club", clubSchema);
export default Club;
