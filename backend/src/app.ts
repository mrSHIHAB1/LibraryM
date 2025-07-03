import express, { Application, Request, Response } from 'express';
import { bookroutes } from './app/controllers/book.controller';
import { borrowroutes } from './app/controllers/borrow.controller';

const cors = require('cors');

const app: Application = express();

// Allow all origins (for dev only)
app.use(cors());

app.use(express.json())

app.use("/api/books", bookroutes)
app.use("/api/borrow", borrowroutes)


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


export default app;

