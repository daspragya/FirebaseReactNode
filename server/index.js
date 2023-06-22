const express = require("express");
const cors = require("cors");
const app = express();

const itemRouter = require("./routes/itemRouter");

app.use(express.json());
app.use(cors());

app.use("/api", itemRouter);
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
