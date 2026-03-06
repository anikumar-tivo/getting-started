require("dotenv").config();

const express = require("express");
const path = require("path");

const app = express();
const PORT = 4100;

const FRAME_ANCESTORS = process.env.CSP_FRAME_ANCESTORS || "";

app.use((req, res, next) => {

    res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors ${FRAME_ANCESTORS}`
    );

    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
    console.log("Getting Started app running on port", PORT);
});
