const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./api/models/db');
const routes = require('./api/routes/routes');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.use('', routes);

(async () => {

    await db.startDB();

    app.listen(port, () => {
        console.log(`Server up on port: ${port}`);
    });

})();
