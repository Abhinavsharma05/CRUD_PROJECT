const express = require("express"); //use express; somewhat like import
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors")


const app = express();
app.use(cors({
  origin: "http://localhost:5173", // allow React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if using cookies
}));


const port = process.env.PORT || 5000;


app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"))  //middleware
app.use("/api/users", require("./routes/userRoutes.js"))  //middleware
app.use(errorHandler)

connectDb()

app.listen(port, () => {
  console.log(`server running on port ${port} `)
})