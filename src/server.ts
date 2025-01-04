import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv'
import router from './routes/index';

dotenv.config()
const server = express()

server.use(cors({
  origin: [`http://localhost.com:${process.env.POR}`],
  methods: 'GET,PUT,POST,DELETE'
}))

server.use(helmet())
server.use(express.json())
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.use('/', router);

server.listen(process.env.PORT, () => {
  console.log('Servidor rodando...');
})