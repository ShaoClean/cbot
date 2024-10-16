import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
process.env.APP_ROOT = path.join(__dirname);
console.log('process.env', process.env.NODE_ENV);
const run = async () => {
    const { startApp } = await import('./cbotWindow/index.js');
    startApp();
};

run();
