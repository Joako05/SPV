const express = require('express');
const apiRouter = require("./api/main");

const app = express();
const port = 5000;

app.use(express.json());

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});