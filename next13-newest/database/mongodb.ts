import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("database is already connected");
      return;
    }

    const MONGOSE_URL = `${process.env.MONGOSE_URL}${process.env.MONGOSE_DB}`;

    console.log("MONGOSE_URL", MONGOSE_URL);

    await mongoose
      .connect(MONGOSE_URL)
      .then(() => console.log("database is connected"))
      .catch((err) => console.log("error occur white connect", err));
  } catch (err) {
    console.log("error while connect to db", err);
    throw err;
  }
};
