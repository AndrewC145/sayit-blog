import express, { Request, Response } from 'express';
import passport from 'passport';
import cors from 'cors';
import signUpRoute from './routes/signupRoute';

const app = express();
const PORT: string | undefined = process.env.PORT;

type CorsTypes = {
  origin: string;
  credentials: boolean;
  optionsSuccessStatus: number;
  methods: string[];
};

const corsOptions: CorsTypes = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'DELETE'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/users', signUpRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
