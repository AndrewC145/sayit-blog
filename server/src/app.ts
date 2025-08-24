import express, { Request, Response } from 'express';
import cors from 'cors';
import passport from 'passport';
import passJwt from 'passport-jwt';

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: 'localhost:5173',
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'DELETE'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
