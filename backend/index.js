const express = require('express');
const cors = require('cors');
const catRouter = require('./routes/cat.router');
const userRouter = require('./routes/user.router');
const supervisorRouter = require('./routes/supervisor.router');
const groupRouter = require('./routes/group.router');
const courseRouter = require('./routes/course.router');
const teacher_count = require('./routes/transaction.router');
const list_of_users = require('./routes/list_of_users.router');
const func = require('./routes/func.router');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.use('/api', catRouter);
app.use('/api', userRouter);
app.use('/api', supervisorRouter);
app.use('/api', groupRouter);
app.use('/api', courseRouter);
app.use('/api', teacher_count);
app.use('/api', list_of_users);
app.use('/api', func);

// Обработка ошибок для асинхронных функций
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(PORT, () => console.log('Server started on port', PORT));