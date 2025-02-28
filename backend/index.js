import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
// import userRouter from './routes/user.route.js';
// import postRouter from './routes/post.route.js';
// import coommentRouter from './routes/comment.js';
import connectDB from './lib/connectDB.js';




const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3050;

// Correct variable name, should be 'test' not 'text'
// console.log('Text from .env:', process.env.test);  // Logs the value of 'test' from the .env file


// app.get("/test", (req, res) => {

//     res.status(200).send("It works!");
// });

// app.use('/users', userRouter);
// app.use('/posts', postRouter);
// app.use('/comments', coommentRouter);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    app.listen(PORT + 1);
  } else {
    console.error(err);
  }
});
