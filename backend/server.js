import app from "./express.js";
import config from "./config/config.js";
import mongoose from "mongoose";
import data from "./models/db.model.js";
mongoose.connect(
  config.MONGODB_URI,
  { dbName: "sample" },
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database:  ${config.MONGODB_URI}`);
});

app.listen(config.PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on port  ${config.PORT}`);
});
app.get("/", async (req, res) => {
  const Data = await data.find().select("id");
  console.log(Data);
  res.send("Hello World");
});
