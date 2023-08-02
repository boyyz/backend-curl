const express = require("express");
const cors = require("cors");
const {exec} = require('child_process');

const app = express();
const port = process.env.PORT || 3300;
const dotenv = require("dotenv");
dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("hallo home");
});

app.get("/curl", (req, res) => {
    let {site} = req.query
    // have secret for paasword on enviroment
    if (req.socket.remoteAddress === "127.0.0.1") {
        return res.status(200).send(`ini pasnya ${process.env.password}`);
    }
    exec(`curl  -I ${site}`, ((error, stdout, stderr) => {
        let output = stdout;
      if (error) {
        // If there are any errors, show that
        output = error; 
      }
      console.log(output)
      return res.status(200).send(output)
    }))
});

app.listen(port, () => console.log(`this server running on port ${port}`));
