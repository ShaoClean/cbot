import { Tray } from 'electron';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的完整路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createCbotTray = () => {
    const icoPath = path.join(__dirname, '..', 'assets', 'icon.png');

    return new Tray(icoPath);
};
