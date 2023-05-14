const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(
    cors({
        origin: "http://localhost:3000", // İzin verilen domain'i belirtin
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log("File received:", req.file);
    console.log("File name:", req.file.originalname);
    res.status(200).send("File uploaded successfully");
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
