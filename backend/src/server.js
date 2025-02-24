import express from 'express';
import cors from 'cors';
import nasaRoutes from './routes/nasaRoutes.js';
import dotenv from 'dotenv';

dotenv.config({path:"./env"});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/nasa', nasaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
