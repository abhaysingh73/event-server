const express = require("express");
const app = express();
const PORT = process.env.port || 3000;

app.get("/", (req, res) => {
    res.send({ message: "Hello" });
});

app.listen(PORT, () => console.log(`Server running on POPT:${PORT}`));