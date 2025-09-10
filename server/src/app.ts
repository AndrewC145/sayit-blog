import express, { Request, Response } from 'express';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import cookieParser from 'cookie-parser';
import signUpRoute from './routes/signup.route';
import loginRoute from './routes/login.route';
import refreshRoute from './routes/refresh.route';
import logoutRoute from './routes/logout.route';
import postRouter from './routes/post.route';

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

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

const __dirname = dirname(new URL(import.meta.url).pathname);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/users', signUpRoute);
app.use('/users', loginRoute);
app.use('/users', logoutRoute);
app.use('/api/refresh', refreshRoute);
app.use('/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
