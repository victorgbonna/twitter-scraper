require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { scheduleJob} = require("node-schedule");
const consolelog = require("./utils/consolelog");
const routes = require("./routes/api");
const sequelize = require("./configs/db");
const searchTwitterPost = require("./services/searchTwitterPost");


const app = express();
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);

app.use(cors());
app.use(express.urlencoded({ limit: "1000000mb", extended: true }));
app.use(express.json({ limit: "1000000mb", extended: true }));

const PORT = process.env.PORT || 5002;

sequelize
  .sync()
  .then(() => {
        console.log("Database synced")
        app.listen(PORT, (err) => {
            if (err) return console.log(err);
            console.log("Server Running on port " + PORT);
          })
    })
  .catch((err) => console.error("Failed to sync database", err));



//every 2 min
scheduleJob("*/1 * * * *", async () => {
    consolelog('testing search')
    // await 
    await searchTwitterPost()
});



routes(app);