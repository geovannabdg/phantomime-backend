const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const MASTER_PASSWORD = "662607004";


app.post("/admin/login", (req, res) => {

    const { password } = req.body;


    if (password === MASTER_PASSWORD) {

        res.json({
            success: true
        });

    } else {

        res.json({
            success: false
        });

    }

});

const DB_FILE = "db.json";


if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, "{}");
}


function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE));
}


function saveDB(data) {
    fs.writeFileSync(
        DB_FILE,
        JSON.stringify(data, null, 2)
    );
}


app.get("/data", (req, res) => {
    res.json(readDB());
});


app.post("/data", (req, res) => {

    saveDB(req.body);

    res.json({
        ok: true
    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        "Backend rodando na porta " + PORT
    );
});