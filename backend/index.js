const express = require("express");
const app = express();

const mongoose = require("mongoose");

const port = 3000;

async function main() {
    await mongoose.connect(
        "mongodb+srv://cwu009:kI8uCd5mf9NiPGrh@cluster0.hkqzwo5.mongodb.net/semestra?retryWrites=true&w=majority&appName=Cluster0"
    );

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
}

main()
    .then(() => {
        console.log("Mongodb connect successfully!");
    })
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
