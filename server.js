import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import authRoutes from './src/routes/auth.routes.js';
import assetRoutes from './src/routes/assets.routes.js';
import portfolioRoutes from './src/routes/portfolio.routes.js';
import alertRoutes from './src/routes/alerts.routes.js';
import { notFoundHandler } from './src/middleware/notFound.middleware.js';
import { errorHandler } from './src/middleware/error.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load(path.join(__dirname, 'src', 'openapi.yaml'));

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Investment API is running',
    docs: '/api-docs',
    health: '/health'
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/alerts', alertRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Investment API listening on port ${PORT}`);
});
