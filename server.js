const express = require('express');
const http = require('http');

const userRouter = require('./src/routers/userRoute');
const siteRouter = require('./src/routers/siteRoute');
const userSitesRouter = require('./src/routers/usersitesRoute');
const newsRouter = require('./src/routers/newsRoute');

require('./src/db/mongoose');
require('./src/services/updateNews');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(siteRouter);
app.use(userSitesRouter);
app.use(newsRouter);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', async (req, res) => {
  try {
    res.json({
      message: 'Hello, user!',
    });
  }
  catch (e)
  {
    res.sendStatus(404);
  }
});