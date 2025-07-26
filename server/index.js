import express from 'express';
import cors from 'cors';
import clientLogic from './router/clientLogic.js';
import serverLogic from './router/serverLogic.js';
const PORT = 5050;
const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/board', clientLogic);
app.use('/api/server-board', serverLogic);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
