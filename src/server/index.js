const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const userRouter = require('./routes/route');


// cors, static files, and middleware for database
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// shows static files react index.html
app.use(express.static(path.join(__dirname, '../public')));

// ============= Routes ===============
app.use('/', userRouter);


// ============= Server Connection ===============
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} 🐵!`);
})