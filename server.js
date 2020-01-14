const express = require('express')
const bodyParser = require('body-parser');

const app = express();

// Parse requests into json format.
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true }));

app.get('/', (req, res) => {
    res.json({message: "Insert homepage message here"});
})

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})