const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//     res.send("Weather App")
// });

app.use(express.static('public'))

app.listen( PORT, () => {
    console.log(`Weather App running at http://localhost:${PORT}`)
});