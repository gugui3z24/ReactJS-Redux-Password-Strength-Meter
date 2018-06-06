const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.static('build/'));
app.use('*', cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/build/index.html');
});

app.listen(8080, () => {
    console.log(`Listening on port ${8080}`);
});
