import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { initializePyroscope } from './libs/pyroscope';

dotenv.config();

const packageJson = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');

const { name, version } = JSON.parse(packageJson);

initializePyroscope({
  appName: name,
  serverAddress: process.env.PYROSCOPE_SERVER_ADDRESS ?? '',
  basicAuthUser: process.env.PYROSCOPE_BASIC_AUTH_USER ?? '',
  basicAuthPassword: process.env.PYROSCOPE_BASIC_AUTH_PASSWORD ?? '',
  tags: {
    version,
  },
  sourceMapPath: ['./src'],
});

const app = express();

const port = 3000

app.get('/', (req, res) => {
  res.send('Available routes are: /bike, /car, /scooter');
});

const genericSearchHandler = (p: number) => (req: any, res: any) => {
  const time = +new Date() + p * 1000;
  let i = 0;
  while (+new Date() < time) {
    i += Math.random();
  }
  res.send('Vehicle found');
};

app.get('/bike', function bikeSearchHandler(req, res) {
  return genericSearchHandler(0.2)(req, res);
});
app.get('/car', function carSearchHandler(req, res) {
  return genericSearchHandler(1)(req, res);
});
app.get('/scooter', function scooterSearchHandler(req, res) {
  return genericSearchHandler(0.5)(req, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
