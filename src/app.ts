import express from 'express';
import { DBMongo } from './services/db-mongo';
const app = express();
const port = 3000;

new DBMongo().install();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(port, () => console.log(`Express is listening at port: ${port}`))